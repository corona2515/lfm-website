import { SavingsEstimator } from './SavingsEstimator'
import { SectionReveal, K12Container } from './SectionReveal'

export function TheMath() {
  return (
    <SectionReveal className="bg-white">
      <K12Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink md:text-5xl">
              Your district may be carrying six figures of avoidable HVAC waste.
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-muted">
              In K-12 buildings we&apos;ve analyzed, undetected HVAC faults can represent 15% to 30% of HVAC energy use, often translating to $0.50 to $1.20 per square foot per year. For a district with twelve 80,000-square-foot schools, that can mean $480,000 to $1.15M of avoidable annual spend. Without ongoing data review, many controls issues can return after commissioning work is complete.
            </p>
          </div>
          <SavingsEstimator />
        </div>
      </K12Container>
    </SectionReveal>
  )
}
