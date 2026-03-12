import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { isClosedLeadStatus } from '@/lib/auth'

interface LeadListFilters {
  q?: string
  type?: string
  status?: string
  assignee?: string
  sync?: string
  from?: string
  to?: string
}

function buildLeadWhere(filters: LeadListFilters): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {}

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: 'insensitive' } },
      { email: { contains: filters.q, mode: 'insensitive' } },
      { company: { contains: filters.q, mode: 'insensitive' } },
      { phone: { contains: filters.q, mode: 'insensitive' } },
    ]
  }

  if (filters.type && filters.type !== 'ALL') {
    where.leadType = filters.type as never
  }

  if (filters.status && filters.status !== 'ALL') {
    where.status = filters.status as never
  }

  if (filters.assignee === 'unassigned') {
    where.currentAssigneeId = null
  } else if (filters.assignee) {
    where.currentAssigneeId = filters.assignee
  }

  if (filters.sync === 'failed') {
    where.lastSyncError = { not: null }
  } else if (filters.sync === 'healthy') {
    where.lastSyncError = null
  }

  if (filters.from || filters.to) {
    where.submittedAt = {}
    if (filters.from) {
      where.submittedAt.gte = new Date(filters.from)
    }
    if (filters.to) {
      const endDate = new Date(filters.to)
      endDate.setHours(23, 59, 59, 999)
      where.submittedAt.lte = endDate
    }
  }

  return where
}

export async function getDashboardData() {
  if (!process.env.DATABASE_URL) {
    return {
      stats: {
        newToday: 0,
        unassigned: 0,
        overdueFollowUps: 0,
        sampleUploadsAwaitingReview: 0,
        closeSyncFailures: 0,
        averageFirstResponseHours: null,
      },
      byDay: [],
      intentBreakdown: [],
      sourceBreakdown: [],
      recentLeads: [],
    }
  }

  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const pastWeek = new Date(now)
  pastWeek.setDate(now.getDate() - 6)
  pastWeek.setHours(0, 0, 0, 0)

  const [
    newToday,
    unassigned,
    overdueFollowUps,
    sampleUploadsAwaitingReview,
    closeSyncFailures,
    recentLeads,
    trendCounts,
    allLeadsForBreakdown,
  ] = await Promise.all([
    prisma.lead.count({ where: { submittedAt: { gte: startOfToday } } }),
    prisma.lead.count({ where: { currentAssigneeId: null } }),
    prisma.lead.count({
      where: {
        nextFollowUpAt: { lt: now },
        NOT: [{ status: 'CLOSED_WON' }, { status: 'CLOSED_LOST' }, { status: 'DISQUALIFIED' }],
      },
    }),
    prisma.lead.count({
      where: {
        leadType: 'SAMPLE_UPLOAD',
        status: 'SAMPLE_REVIEW_IN_PROGRESS',
      },
    }),
    prisma.lead.count({ where: { lastSyncError: { not: null } } }),
    prisma.lead.findMany({
      take: 8,
      orderBy: { submittedAt: 'desc' },
      include: { currentAssignee: true },
    }),
    prisma.lead.groupBy({
      by: ['submittedAt'],
      where: { submittedAt: { gte: pastWeek } },
      _count: true,
      orderBy: { submittedAt: 'asc' },
    }),
    prisma.lead.findMany({
      where: { submittedAt: { gte: pastWeek } },
      select: {
        id: true,
        intent: true,
        source: true,
        submittedAt: true,
        lastContactedAt: true,
      },
    }),
  ])

  const byDay = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(pastWeek)
    date.setDate(pastWeek.getDate() + index)
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const count = trendCounts.filter((entry) => {
      const sameDay = new Date(entry.submittedAt)
      return sameDay.toDateString() === date.toDateString()
    }).reduce((total, entry) => total + entry._count, 0)

    return { label, count }
  })

  const intentBreakdown = allLeadsForBreakdown.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.intent] = (acc[lead.intent] || 0) + 1
    return acc
  }, {})

  const sourceBreakdown = allLeadsForBreakdown.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1
    return acc
  }, {})

  const contactedLeads = allLeadsForBreakdown.filter((lead) => lead.lastContactedAt)
  const averageFirstResponseHours = contactedLeads.length
    ? contactedLeads.reduce((total, lead) => {
        const diff = new Date(lead.lastContactedAt as Date).getTime() - new Date(lead.submittedAt).getTime()
        return total + diff / (1000 * 60 * 60)
      }, 0) / contactedLeads.length
    : null

  return {
    stats: {
      newToday,
      unassigned,
      overdueFollowUps,
      sampleUploadsAwaitingReview,
      closeSyncFailures,
      averageFirstResponseHours,
    },
    byDay,
    intentBreakdown: Object.entries(intentBreakdown),
    sourceBreakdown: Object.entries(sourceBreakdown),
    recentLeads,
  }
}

export async function getLeadList(filters: LeadListFilters) {
  if (!process.env.DATABASE_URL) {
    return []
  }

  return prisma.lead.findMany({
    where: buildLeadWhere(filters),
    include: {
      currentAssignee: true,
      sampleIntakeAsset: true,
      syncEvents: {
        where: {
          provider: {
            in: ['close', 'onpoint'],
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 6,
      },
    },
    orderBy: { submittedAt: 'desc' },
    take: 100,
  })
}

export async function getLeadDetail(id: string) {
  if (!process.env.DATABASE_URL) {
    return null
  }

  return prisma.lead.findUnique({
    where: { id },
    include: {
      currentAssignee: true,
      sampleIntakeAsset: true,
      notes: {
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      },
      syncEvents: {
        orderBy: { createdAt: 'desc' },
      },
      assignmentHistory: {
        include: {
          assignedTo: true,
          assignedBy: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      audits: {
        include: { actor: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  })
}

export async function getUploadsQueue() {
  if (!process.env.DATABASE_URL) {
    return []
  }

  return prisma.lead.findMany({
    where: { leadType: 'SAMPLE_UPLOAD' },
    include: {
      currentAssignee: true,
      sampleIntakeAsset: true,
      syncEvents: {
        where: {
          provider: {
            in: ['close', 'onpoint'],
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 6,
      },
    },
    orderBy: { submittedAt: 'desc' },
    take: 100,
  })
}

export async function getAdminUsers() {
  if (!process.env.DATABASE_URL) {
    return []
  }

  return prisma.adminUser.findMany({
    orderBy: [{ isActive: 'desc' }, { displayName: 'asc' }],
    include: {
      _count: {
        select: {
          currentAssigned: true,
        },
      },
    },
  })
}

export async function getAdminSettingsSnapshot() {
  if (!process.env.DATABASE_URL) {
    return {
      databaseConfigured: false,
      closeConfigured: Boolean(process.env.CLOSE_API_KEY),
      onPointProvisioningConfigured: Boolean(process.env.ONPOINT_SAMPLE_INTAKE_URL),
      leadWebhookConfigured: Boolean(process.env.LEAD_WEBHOOK_URL),
      sampleWebhookConfigured: Boolean(process.env.SAMPLE_INTAKE_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL),
      adminSessionSecretConfigured: Boolean(process.env.ADMIN_SESSION_SECRET),
      lastSuccessfulCloseSyncAt: null,
      lastSuccessfulOnPointSyncAt: null,
    }
  }

  const [lastSuccessfulCloseSync, lastSuccessfulOnPointSync] = await Promise.all([
    prisma.leadSyncEvent.findFirst({
      where: { provider: 'close', status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.leadSyncEvent.findFirst({
      where: { provider: 'onpoint', status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return {
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    closeConfigured: Boolean(process.env.CLOSE_API_KEY),
    onPointProvisioningConfigured: Boolean(process.env.ONPOINT_SAMPLE_INTAKE_URL),
    leadWebhookConfigured: Boolean(process.env.LEAD_WEBHOOK_URL),
    sampleWebhookConfigured: Boolean(process.env.SAMPLE_INTAKE_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL),
    adminSessionSecretConfigured: Boolean(process.env.ADMIN_SESSION_SECRET),
    lastSuccessfulCloseSyncAt: lastSuccessfulCloseSync?.createdAt || null,
    lastSuccessfulOnPointSyncAt: lastSuccessfulOnPointSync?.createdAt || null,
  }
}

export function getLeadHealthLabel(lead: {
  status: string
  nextFollowUpAt: Date | null
  lastSyncError: string | null
  syncEvents?: Array<{ provider: string; status: string }>
}) {
  const latestOnPointSync = lead.syncEvents?.find((event) => event.provider === 'onpoint')
  if (latestOnPointSync && latestOnPointSync.status !== 'SUCCESS') {
    return 'OnPoint issue'
  }
  if (lead.lastSyncError) {
    return 'Sync issue'
  }
  if (lead.nextFollowUpAt && lead.nextFollowUpAt < new Date() && !isClosedLeadStatus(lead.status)) {
    return 'Overdue follow-up'
  }
  return 'Healthy'
}
