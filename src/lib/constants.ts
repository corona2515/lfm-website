export const SITE_CONFIG = {
  name: 'LeanFM',
  title: 'LeanFM OnPoint | HVAC Fault Detection Software for BAS Data',
  description: 'HVAC fault detection software for facilities teams. Analyze BAS trend data, prioritize faults by impact, and plan what to fix first.',
  url: process.env.SITE_URL || 'https://leanfmtech.com',
  appUrl: process.env.APP_URL || '/start',
  contactEmail: process.env.CONTACT_EMAIL || 'info@leanfmtech.com',
}

export const NAV_LINKS = [
  { href: '/company/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export const CTA_LABELS = {
  primary: 'Book a Demo',
  secondary: 'Upload Sample Dataset',
} as const

export const FOOTER_LINKS = {
  product: [],
  industries: [],
  company: [
    { href: '/company/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
  ],
} as const

export const CREDIBILITY_ITEMS = [
  '3M+ BAS data points processed',
  'Founded by CMU PhDs',
  'IFMA Forty Under 40 Award',
  'Serving K-12, museums, and higher education',
  'Pittsburgh, PA',
] as const

export const HOME_PROOF_METRICS = [
  {
    value: 'Up to 35%',
    label: 'Common avoidable HVAC energy waste identified',
  },
  {
    value: '<24 hours',
    label: 'Typical time to first prioritized findings after clean upload',
  },
  {
    value: '0',
    label: 'New sensors or site visits required',
  },
] as const

export const HOME_TRUST_SIGNALS = [
  'No new sensors or site installation required',
  'Built for facilities teams using existing BAS exports',
  'Manual review and guided walkthrough with LeanFM experts',
] as const

export const HOME_CAPABILITIES = [
  {
    title: 'Fault Prioritization',
    description: 'Find hidden faults beyond BAS alarms and rank them by estimated impact.',
  },
  {
    title: 'Technician Guidance',
    description: 'Each issue includes clear next steps so teams can execute faster.',
  },
  {
    title: 'Stakeholder Reporting',
    description: 'Share findings in PDF or CSV with leadership, vendors, and maintenance teams.',
  },
  {
    title: 'Portfolio Expansion',
    description: 'Start with sample data, validate value quickly, then scale with confidence.',
  },
] as const

export const PROBLEM_AGITATION_POINTS = [
  {
    title: 'Your BAS alarms miss expensive faults',
    description: 'Simultaneous heating and cooling, stuck dampers, and sensor drift often never trigger useful alarms. Waste keeps compounding until someone investigates manually.',
  },
  {
    title: 'Utility bills rise without clear root cause',
    description: 'Facility teams are asked to reduce spend, but they rarely get a prioritized list of what to fix first.',
  },
  {
    title: 'Enterprise AFDD demands too much',
    description: 'Most platforms require long deployments, outside consultants, and enterprise budgets before your team gets practical guidance.',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Export BAS Trend Data',
    description: 'Export your existing points into CSV format.',
    stepLabel: 'No new hardware required',
  },
  {
    number: '02',
    title: 'Upload Sample Dataset',
    description: 'Complete account setup and submit your file in minutes.',
    stepLabel: 'Guided upload flow',
  },
  {
    number: '03',
    title: 'Review Results with LeanFM',
    description: 'We manually test your dataset and schedule a call to walk through findings.',
    stepLabel: 'Impact-ranked results',
  },
] as const

export const COMPARISON_ITEMS = {
  headers: ['', 'OnPoint', 'Traditional AFDD'],
  rows: [
    { label: 'Cost', onpoint: 'A fraction of enterprise AFDD pricing', traditional: '$100K+ per year' },
    { label: 'Onboarding model', onpoint: 'Lead form or account + sample upload', traditional: 'Long setup cycles and integrations' },
    { label: 'Installation', onpoint: 'None required', traditional: 'Sensors, integration, consultants' },
    { label: 'Complexity', onpoint: 'Guided onboarding + clear next steps', traditional: 'Months of configuration' },
    { label: 'Commitment', onpoint: 'No long-term contract required to start', traditional: 'Multi-year contracts' },
  ],
} as const

export const PRODUCT_PROMISES = [
  {
    title: 'Save up to 30% on energy costs',
    description: 'Hidden faults waste energy every day. Find them and fix them before they drain your budget.',
    footnote: true,
  },
  {
    title: 'Give your team a clear first move',
    description: 'Each finding is prioritized by impact, so your team knows what to fix first and why it matters.',
    footnote: false,
  },
  {
    title: 'Built for staged rollout while we scale',
    description: 'We are stress testing with guided onboarding so teams can validate value without overcommitting.',
    footnote: false,
  },
  {
    title: 'No sensors. No installation. No consultants.',
    description: 'Just upload your existing BAS data. We handle the rest.',
    footnote: false,
  },
] as const

export const PRICING_TIERS = [
  {
    name: 'Free',
    subtitle: 'Preview',
    description: 'See the value before you pay',
    price: '$0',
    period: '',
    features: [
      'Upload one BAS data file',
      'Map up to 100 data points',
      'Preview top 5 detected faults',
      'Sample recommended actions',
    ],
    limitations: [
      'Results truncated',
      'No export',
      'No historical tracking',
    ],
    cta: 'Start With Sample Data',
    ctaHref: '/contact?intent=demo',
    highlighted: false,
  },
  {
    name: 'Unlock',
    subtitle: 'One-time',
    description: 'Full results for your dataset',
    price: 'Pay per analysis',
    period: '',
    features: [
      'Complete fault detection',
      'All recommended actions',
      'Severity prioritization',
      'Export to PDF/CSV',
      '30-day access to results',
    ],
    limitations: [],
    cta: 'Get Free Fault Scan',
    ctaHref: '/contact?intent=demo',
    highlighted: true,
  },
  {
    name: 'Subscribe',
    subtitle: 'Continuous',
    description: 'Ongoing insights for your portfolio',
    price: 'Monthly',
    period: '',
    features: [
      'Unlimited uploads',
      'Multi-building dashboard',
      'Automated weekly/monthly reports',
      'Historical tracking',
      'Team accounts',
      'Priority support',
    ],
    limitations: [],
    cta: 'Talk to Sales',
    ctaHref: '/contact?intent=demo',
    highlighted: false,
  },
] as const

export const FAQ_ITEMS = [
  {
    question: 'How much can we save?',
    answer: 'Savings up to 35% are common in buildings with undetected HVAC faults. Actual savings vary based on building condition, controls quality, and implementation of recommended actions.',
  },
  {
    question: 'Why not just use BAS alarms?',
    answer: 'BAS alarms often miss costly issues like simultaneous heating and cooling, sensor drift, and sequence faults. OnPoint analyzes trend behavior over time and prioritizes the highest-impact issues first.',
  },
  {
    question: 'What data format is required?',
    answer: 'Upload a CSV export from your BAS that includes timestamps, point names, and values. If needed, you can download our sample template and we will confirm your file before analysis.',
  },
  {
    question: 'How quickly do we get results?',
    answer: 'Most clean uploads are reviewed within 24 hours. After analysis, we schedule a call to walk through findings, impact, and recommended actions.',
  },
  {
    question: 'How secure is our data?',
    answer: 'All uploaded data is encrypted in transit and at rest. We only use your data to perform your analysis and do not share it with third parties.',
  },
  {
    question: 'Do we need a long-term commitment to start?',
    answer: 'No. You can start with a demo or a sample dataset review to validate value first. We discuss broader rollout options only after you review your results.',
  },
] as const

export const ENERGY_DISCLAIMER = '* Energy savings claims are based on typical findings in buildings with undetected HVAC faults. Actual savings vary based on building condition, fault severity, and implementation of recommended actions.'
