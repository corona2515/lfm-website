'use client'

import { trackEvent } from '@/lib/analytics'
import {
  K12Accordion,
  K12AccordionContent,
  K12AccordionItem,
  K12AccordionTrigger,
} from '@/components/ui/k12-accordion'
import { SectionReveal, K12Container } from './SectionReveal'

const faqs = [
  {
    question: 'Will this disrupt classroom HVAC during instruction?',
    answer: 'No. The pilot is a data analysis. We never touch a piece of equipment. Your team exports BAS trend data, we analyze it offline, and we deliver a ranked action list. You decide what gets fixed and when.',
  },
  {
    question: 'What BAS systems do you support?',
    answer: 'Any BAS that can export trend data to CSV. We routinely work with Trane Tracer, Johnson Controls Metasys, Siemens Desigo, Schneider EcoStruxure, Honeywell EBI, Automated Logic, Distech, and Niagara-based systems.',
  },
  {
    question: 'What about cybersecurity? Our district will need to review.',
    answer: 'The diagnostic starts with exported BAS trend files and building context your district chooses to provide. We do not need live BAS credentials or student records for the initial review. If your district has a formal review process, we can document the requested data fields and workflow before you share files.',
  },
  {
    question: 'How does this compare to a commissioning project from our mechanical contractor?',
    answer: "Commissioning is a valuable point-in-time, on-site engagement. OnPoint complements that work by using existing BAS data to surface hidden fault patterns and help districts verify whether fixes hold over time.",
  },
  {
    question: 'Do we need to commit to multiple buildings to start?',
    answer: 'No. The $4,995 pilot covers one building. Most districts add more buildings only after the first pilot proves out. We never require a multi-building commitment to begin.',
  },
  {
    question: 'Will the findings hold up to a board presentation?',
    answer: 'Yes. The executive summary is built for board and superintendent audiences, with plain-language fault descriptions, estimated dollar impact, comfort impact, carbon impact, and a clear "what we recommend" section.',
  },
  {
    question: 'What if the pilot does not identify $50,000 of waste?',
    answer: 'If the qualified pilot does not identify at least $50,000 in estimated annual avoidable HVAC waste in the audited building, we waive the pilot fee. Eligibility, building scope, and pilot terms are confirmed during qualification.',
  },
  {
    question: "What's the procurement path? RFP? Sole source?",
    answer: 'Many districts start with a limited pilot or diagnostic before considering a larger engagement. We can provide procurement support materials that explain the service model, deliverables, and qualified fee-waiver terms.',
  },
] as const

export function K12FAQ() {
  return (
    <SectionReveal className="bg-white">
      <K12Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink md:text-5xl">
            Questions K-12 facilities directors ask before booking the pilot.
          </h2>
        </div>
        <K12Accordion
          type="single"
          collapsible
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-brand-border bg-white px-6"
          onValueChange={(value) => {
            const faq = faqs.find((item) => item.question === value)
            if (faq) {
              trackEvent('k12_faq_open', { question: faq.question })
            }
          }}
        >
          {faqs.map((faq) => (
            <K12AccordionItem key={faq.question} value={faq.question}>
              <K12AccordionTrigger>{faq.question}</K12AccordionTrigger>
              <K12AccordionContent>{faq.answer}</K12AccordionContent>
            </K12AccordionItem>
          ))}
        </K12Accordion>
      </K12Container>
    </SectionReveal>
  )
}
