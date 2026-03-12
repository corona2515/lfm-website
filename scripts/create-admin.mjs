import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const displayName = process.env.ADMIN_DISPLAY_NAME || 'LeanFM Admin'
  const role = process.env.ADMIN_ROLE === 'OPERATOR' ? 'OPERATOR' : 'ADMIN'

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running npm run admin:create')
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: {
      displayName,
      role,
      passwordHash,
      isActive: true,
    },
    create: {
      email: email.toLowerCase(),
      displayName,
      role,
      passwordHash,
    },
  })

  console.log(`Admin user ready: ${user.email} (${user.role})`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
