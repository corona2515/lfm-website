import { Metadata } from 'next'
import { Badge, Card } from '@/components/ui'
import { PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'

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
      <section className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/3 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="container-default relative pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Badge className="mb-6">Company</Badge>
            <h1 className="heading-1 text-slate-950 mb-6">
              We help facilities teams find the building problems hiding in their system data.
            </h1>
            <div className="space-y-5 body-large text-slate-700">
              <p>
                LeanFM Technologies helps owners, operators, and facilities teams uncover hidden HVAC faults, energy waste, comfort risks, and control issues using data their buildings already generate.
              </p>
              <p>
                LeanFM was founded by Carnegie Mellon University researchers who spent years studying how buildings actually operate. Today, we deliver building-system intelligence through <strong>OnPoint</strong> — our software platform — powered by the <em>Prescriptiv</em> analytics engine. Co-founder Burcu Akinci continues as a CMU professor; co-founder Pine Liu was recognized by IFMA as a Forty Under 40 honoree for innovation in facility management.
              </p>
            </div>
          </div>
          <PhotoPlaceholder
            label="Facilities team reviewing BAS data and prioritized building findings"
            alt="Facilities team reviewing BAS data and prioritized building findings"
            src="/media/leanfm-images/bas-control-room.jpg"
            aspect="video"
            overlay={false}
            className="border-white shadow-2xl"
          />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-default">
          <div className="text-center mb-12">
            <Badge className="mb-6">Leadership</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <Card
                key={member.name}
                className="h-full border-sky-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-sky-100 bg-sky-50 aspect-square">
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
                <p className="text-body-xs uppercase tracking-wider text-emerald-700 mb-2">
                  {member.title}
                </p>
                <h3 className="heading-4 text-slate-950 mb-4">{member.name}</h3>
                <p className="text-body-md text-slate-600 mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm font-semibold text-sky-700 transition-colors hover:text-emerald-700"
                >
                  LinkedIn
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-large border-t border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
        <div className="container-default">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-2 mb-5 text-slate-950">Our promise</h2>
            <p className="body-large text-slate-700">
              Every LeanFM engagement is backed by a money-back ROI guarantee. If our analysis does not identify HVAC issues with combined estimated annual operational impact of at least 3x your fee, you get your money back. The terms of the guarantee live on our Terms page.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
