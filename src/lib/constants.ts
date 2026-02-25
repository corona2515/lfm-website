export const SITE_CONFIG = {
  name: 'LeanFM',
  title: 'LeanFM OnPoint | HVAC Fault Detection Software for BAS Data',
  description: 'HVAC fault detection software for facilities teams. Analyze BAS trend data, prioritize faults by impact, and plan what to fix first.',
  url: process.env.SITE_URL || 'https://leanfmtech.com',
  appUrl: process.env.APP_URL || '/contact?intent=trial',
  contactEmail: process.env.CONTACT_EMAIL || 'info@leanfmtech.com',
}

export const NAV_LINKS = [
  { href: '/company/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
] as const

export const CTA_LABELS = {
  primary: 'Get Free Fault Scan',
  secondary: 'Upload Sample Data',
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
    value: '$245,000+/yr',
    label: 'Energy savings by one customer with a 90k sq ft building',
  },
  {
    value: 'Up to 30%',
    label: 'Typical avoidable HVAC energy waste',
  },
  {
    value: '24h',
    label: 'Quick results sorted by severity and ease of repair',
  },
] as const

export const HOME_TRUST_SIGNALS = [
  'No new sensors or site installation required',
  'Built with patented CMU technology',
  'Designed for most modern commercial buildings',
] as const

export const HOME_CAPABILITIES = [
  {
    title: 'Prioritized Fault Detection',
    description: 'Find hidden faults beyond BAS alarms and rank them by estimated impact.',
  },
  {
    title: 'Actionable Recommendations',
    description: 'Each issue includes clear next steps so teams can execute faster.',
  },
  {
    title: 'Exportable Reports',
    description: 'Share findings in PDF or CSV with leadership, vendors, and maintenance teams.',
  },
  {
    title: 'Guided Rollout',
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
    title: 'Export Your Trend Data.',
    description: 'Pull a CSV from your BAS and get started in minutes.',
    stepLabel: 'No new hardware required',
  },
  {
    number: '02',
    title: 'Upload Your Data.',
    description: 'Drop in your trend file and we handle validation and setup for you.',
    stepLabel: 'Guided upload flow',
  },
  {
    number: '03',
    title: 'Get a Ranked Action Plan',
    description: 'Receive prioritized findings with specific actions so your team can fix highest-impact issues first.',
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
    ctaHref: '/contact?intent=trial',
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
    ctaHref: '/contact?intent=trial',
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
    question: 'How much can I actually save?',
    answer: 'Buildings with undetected HVAC faults typically waste 15-30% on energy costs. The exact savings depend on your building\'s current condition, but most customers identify significant opportunities in their first analysis.',
  },
  {
    question: 'Do I need a long-term contract to start?',
    answer: 'No. You can start with a lead form or sample upload and validate value first. We discuss paid options only after you review findings and decide to move forward.',
  },
  {
    question: 'How is this different from my BAS?',
    answer: 'Your BAS shows you data and basic alarms. OnPoint uses Prescriptiv AI to find the hidden faults your BAS can\'t detect—like simultaneous heating and cooling, sensor drift, and control sequence issues—and tells you exactly what to fix first.',
  },
  {
    question: 'Why is this so much cheaper than traditional AFDD?',
    answer: 'Traditional solutions require sensors, installation, consultants, and months of configuration. OnPoint works with your existing BAS data—no hardware, no on-site visits, no long deployments.',
  },
  {
    question: 'What data do I need?',
    answer: 'Export trend data from your BAS as a CSV. OnPoint works with all major BAS platforms, and we provide a sample CSV template placeholder so your team can verify format before uploading.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. All data is encrypted in transit and at rest. We never share your building data.',
  },
  {
    question: 'What if I\'m not technical?',
    answer: 'OnPoint was designed for building owners and facility managers, not data scientists. Results are presented in plain language with clear recommended actions.',
  },
] as const

export const ENERGY_DISCLAIMER = '* Energy savings claims are based on typical findings in buildings with undetected HVAC faults. Actual savings vary based on building condition, fault severity, and implementation of recommended actions.'
