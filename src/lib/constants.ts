export const SITE_CONFIG = {
  name: 'LeanFM',
  title: 'LeanFM Technologies | Find Hidden Building System Problems',
  description: 'LeanFM analyzes existing building system data to uncover hidden problems that waste energy, drive up costs, and create comfort issues.',
  url: process.env.SITE_URL || 'https://leanfmtech.com',
  appUrl: process.env.APP_URL || '/start',
  contactEmail: process.env.CONTACT_EMAIL || 'info@leanfmtech.com',
}

export const NAV_LINKS = [
  { href: '/company/about', label: 'About' },
  { href: '/investors', label: 'Investors' },
  { href: '/contact', label: 'Contact' },
] as const

export const PRODUCT_NAV_LINKS = [
  { href: '/sample-analysis', label: 'Sample Analysis' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/what-we-find', label: 'What We Find' },
  { href: '/results', label: 'Results' },
  { href: '/building-data-to-action', label: 'Building Data to Action' },
] as const

export const INDUSTRY_NAV_LINKS = [
  { href: '/solutions/k-12-schools', label: 'K-12 Schools' },
  { href: '/solutions/museums', label: 'Museums' },
  { href: '/solutions/universities', label: 'Universities' },
  { href: '/solutions/commercial-real-estate', label: 'Commercial Real Estate' },
] as const

export const SOLUTIONS_NAV_GROUPS = [
  { title: 'Product', links: PRODUCT_NAV_LINKS },
  { title: 'Industries', links: INDUSTRY_NAV_LINKS },
] as const

export const CTA_LABELS = {
  primary: 'Request a Sample Analysis',
  secondary: 'Talk to LeanFM',
  upload: 'Upload Sample Dataset',
} as const

export const FOOTER_LINKS = {
  product: PRODUCT_NAV_LINKS,
  industries: INDUSTRY_NAV_LINKS,
  company: [
    { href: '/company/about', label: 'About' },
    { href: '/investors', label: 'Investors' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
} as const

export const CREDIBILITY_ITEMS = [
  'Backed by our money-back ROI guarantee',
  '3M+ BAS data points processed',
  'Developed from research at Carnegie Mellon University',
  'IFMA Forty Under 40 Award',
  'Serving K-12, museums, and higher education',
  'Pittsburgh, PA',
] as const

export const HOME_PROOF_METRICS = [
  {
    value: 'Impact-ranked',
    label: 'Sample findings focused on hidden faults most likely to affect cost, comfort, or equipment wear',
  },
  {
    // TODO(nick): time-promise policy pending — see brand strategy §12
    value: '<24 hours',
    label: 'Typical time to first prioritized findings after clean upload',
  },
  {
    value: '0',
    label: 'New sensors or site visits required',
  },
] as const

export const HOME_BUILT_FOR_VERTICALS = [
  { href: '/solutions/k-12-schools', label: 'K-12 Schools' },
  { href: '/solutions/museums', label: 'Museums' },
  { href: '/solutions/universities', label: 'Universities' },
  { href: '/solutions/commercial-real-estate', label: 'Commercial Real Estate' },
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

export const HOME_IMPACT_ITEMS = [
  {
    title: 'Budget',
    description: 'Find the faults quietly inflating utility spend.',
  },
  {
    title: 'Building',
    description: 'Prioritize fixes that improve comfort, reliability, and equipment performance.',
  },
  {
    title: 'Planet',
    description: 'Reduce avoidable HVAC waste that contributes to building emissions.',
    citation: 'Architecture 2030 reports the built environment is responsible for over 35% of annual global CO2 emissions.',
    citationHref: 'https://www.architecture2030.org/why-the-built-environment/why-buildings/',
  },
] as const

export const FOOTER_SUSTAINABILITY_LINE = 'Helping buildings operate smarter and waste less energy.'

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
    title: 'Large deployments can demand too much upfront',
    description: 'Many tools require long setup cycles, outside consultants, and enterprise budgets before your team gets practical guidance.',
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
    description: 'Complete account setup and submit your BAS data export.',
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
  headers: ['', 'LeanFM', 'Traditional monitoring'],
  rows: [
    { label: 'Cost', onpoint: 'Low-friction sample analysis to start', traditional: 'Large upfront commitment' },
    { label: 'Onboarding model', onpoint: 'Lead form or account + sample upload', traditional: 'Long setup cycles and integrations' },
    { label: 'Installation', onpoint: 'None required', traditional: 'Sensors, integration, consultants' },
    { label: 'Complexity', onpoint: 'Guided onboarding + clear next steps', traditional: 'Months of configuration' },
    { label: 'Commitment', onpoint: 'No long-term contract required to start', traditional: 'Multi-year contracts' },
  ],
} as const

export const PRODUCT_PROMISES = [
  {
    title: 'Find the hidden faults draining your budget',
    description: 'Hidden HVAC faults waste energy every day. Find them and fix what matters first.',
    footnote: true,
  },
  {
    title: 'Give your team a clear first move',
    description: 'Each finding is prioritized by impact, so your team knows what to fix first and why it matters.',
    footnote: false,
  },
  {
    title: 'Backed by our money-back ROI guarantee',
    description: 'Find 3x or more in energy savings worth more than your engagement fee — or we refund it.',
    footnote: false,
  },
  {
    title: 'No sensors. No installation. No consultants.',
    description: 'Just upload your existing BAS data. We handle the rest.',
    footnote: false,
  },
] as const

export const FAQ_ITEMS = [
  {
    question: 'How much can we save?',
    answer: 'LeanFM backs every engagement with a money-back ROI guarantee: if our analysis does not identify HVAC issues with combined estimated first-year operational impact of at least 3x your engagement fee, we refund the fee. Most clients see 3–5x or more once recommended corrective actions are implemented. Full guarantee mechanics live on our Terms page.',
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
    // TODO(nick): time-promise policy pending — see brand strategy §12
    answer: 'Most clean uploads are reviewed within 24 hours. After analysis, we schedule a call to walk through findings, impact, and recommended actions.',
  },
  {
    question: 'Do you really guarantee savings?',
    answer: 'Yes. If LeanFM does not identify HVAC issues worth at least 3x the engagement fee in estimated first-year operational impact, you get your money back. The guarantee is conditional on you implementing the corrective actions in your findings report — we cannot guarantee savings on issues that go unaddressed. Full terms are on our Terms page.',
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
