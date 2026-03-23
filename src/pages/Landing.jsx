import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { anxietyTypeList } from '../data/anxietyTypes'
import { ensureSessionId } from '../lib/session'

function Landing() {
  useEffect(() => {
    ensureSessionId()
  }, [])

  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Interview Anxiety Assessment Tool</p>
        <h1 className="mt-3 text-4xl text-slate-900 md:text-6xl">Find out what&apos;s holding you back in interviews.</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-700">
          Complete a short, supportive questionnaire to understand your interview anxiety profile.
          You&apos;ll get a clear score breakdown, a matched practical resource, and a simple way to
          track improvement after your next interview.
        </p>
        <p className="mt-4 font-medium text-orange-700">30 questions · 5 minutes · No sign-up needed</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/quiz"
            className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
          >
            Start the Assessment
          </Link>
          <Link
            to="/analytics"
            className="rounded-full border border-teal-600 px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            View Analytics Dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {anxietyTypeList.map((type, index) => (
          <article
            key={type.code}
            className={`rounded-3xl border border-orange-100 bg-white p-5 shadow-sm md:col-span-1 lg:col-span-2 ${
              anxietyTypeList.length === 5 && index >= 3 ? 'lg:col-span-3' : ''
            }`}
          >
            <p className="text-2xl" aria-hidden="true">{type.icon}</p>
            <h2 className="mt-2 text-2xl text-slate-800">{type.name}</h2>
            <p className="mt-2 text-slate-700">{type.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Landing