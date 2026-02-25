import { Metadata } from 'next'
import { Badge, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About',
  description:
    'LeanFM Technologies is an international SaaS company serving operational facility managers in the built environment.',
}

const TEAM_MEMBERS = [
  {
    name: 'Nick Boris',
    title: 'CEO',
    bio: 'Nick Boris leads LeanFM Technologies with a focus on delivering intelligent solutions for commercial HVAC fault detection and diagnosis.',
    linkedin: 'https://www.linkedin.com/in/nicholasboris/',
    photo: 'https://leanfmtech.com/wp-content/uploads/2025/03/nick-profile2.png',
    circularPhoto: true,
  },
  {
    name: 'Xuesong (Pine) Liu, Ph.D.',
    title: 'CTO',
    bio: 'A co-founder of LeanFM, Pine was a former facilities manager, is a brilliant software architect, researcher and entrepreneur. Dr. Liu has advanced the field of facilities and building information for years as Research Assistant Professor at Carnegie Mellon University and now as the CTO with LeanFM Technologies.',
    linkedin: 'https://www.linkedin.com/in/xliu1/',
    photo: 'https://leanfmtech.com/wp-content/uploads/2020/11/10.-LFM-Pine.png',
    circularPhoto: false,
  },
  {
    name: 'Burcu Akinci',
    title: 'CIO',
    bio: 'Dr. Akinci is a leading researcher in facilities information technology and is a co-founder of the company. She has developed numerous innovations as a Professor of Civil and Environmental Engineering at Carnegie Mellon University.',
    linkedin: 'https://www.linkedin.com/in/burcu-akinci-a04b00/',
    photo: 'https://leanfmtech.com/wp-content/uploads/2020/11/11.-LFM-Burcu.png',
    circularPhoto: false,
  },
] as const

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="container-default relative pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-4xl">
            <Badge className="mb-6">Company</Badge>
            <h1 className="heading-1 text-white mb-6">About Lean FM Technologies</h1>
            <p className="body-large">
              LeanFM Technologies is an international SaaS company serving operational facility
              managers in the built environment. We provide the most advanced, groundbreaking
              solutions for AFDD to uncover root causes and insights relating to HVAC faults.
              LeanFM Prescriptiv™ is used in hospitals, universities, hotels, office buildings,
              or anywhere that uses a HVAC system. Clients receive measurable results and
              experience the benefits to their operations and facilities.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-default">
          <div className="text-center mb-12">
            <Badge className="mb-6">Leadership</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.name} className="h-full p-6">
                <div className="mb-4 overflow-hidden rounded-xl border border-slate-700/70 bg-slate-800/50 aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={`h-full w-full object-cover ${
                      member.circularPhoto ? 'rounded-full' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
                <p className="text-body-xs uppercase tracking-wider text-cyan-400 mb-2">
                  {member.title}
                </p>
                <h3 className="heading-4 text-white mb-4">{member.name}</h3>
                <p className="text-body-md text-slate-300 mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  LinkedIn
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
