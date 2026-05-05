import { Metadata } from 'next'
import { Badge, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About',
  description:
    'LeanFM Technologies helps facilities teams find hidden building system issues using existing BAS data.',
}

const TEAM_MEMBERS = [
  {
    name: 'Nick Boris',
    title: 'CEO',
    bio: 'Nick Boris leads LeanFM Technologies with a focus on commercializing practical building system intelligence for facilities, energy, and operations teams.',
    linkedin: 'https://www.linkedin.com/in/nicholasboris/',
    photo: '/media/team/nick-boris.png',
    circularPhoto: true,
  },
  {
    name: 'Xuesong (Pine) Liu, Ph.D.',
    title: 'CTO',
    bio: 'Dr. Liu is a co-founder of LeanFM, former facilities manager, software architect, researcher, and entrepreneur. His work connects building operations, data systems, and applied facilities research.',
    linkedin: 'https://www.linkedin.com/in/xliu1/',
    photo: '/media/team/xuesong-liu.png',
    circularPhoto: false,
  },
  {
    name: 'Burcu Akinci',
    title: 'CIO',
    bio: 'Dr. Akinci is a co-founder of LeanFM and a Carnegie Mellon professor whose research has advanced facilities information technology, building data, and infrastructure management.',
    linkedin: 'https://www.linkedin.com/in/burcu-akinci-a04b00/',
    photo: '/media/team/burcu-akinci.png',
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
            <h1 className="heading-1 text-white mb-6">
              We help facilities teams find the building problems hiding in their system data.
            </h1>
            <div className="space-y-5 body-large">
              <p>
                LeanFM Technologies helps owners, operators, and facilities teams uncover hidden HVAC faults, energy waste, comfort risks, and control issues using data their buildings already generate.
              </p>
              <p>
                Born from Carnegie Mellon research and real-world facilities expertise, LeanFM focuses on making building system intelligence practical: clear findings, prioritized issues, and action your team can understand.
              </p>
            </div>
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
