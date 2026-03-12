export const dynamic = 'force-dynamic'

import { LoginForm } from '@/components/admin/LoginForm'

export default function AdminLoginPage() {
  return (
    <section className="relative min-h-screen overflow-hidden py-20">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute left-1/2 top-0 h-[380px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="container-narrow relative">
        <LoginForm />
      </div>
    </section>
  )
}
