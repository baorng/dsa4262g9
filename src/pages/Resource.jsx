import { Link, useLocation } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard'
import { anxietyTypes } from '../data/anxietyTypes'
import { getLatestResult } from '../lib/session'

function Resource() {
  const location = useLocation()
  const result = location.state?.result ?? getLatestResult()

  if (!result) {
    return (
      <main className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl text-slate-900">No profile found</h1>
        <p className="mt-2 text-slate-700">Complete the assessment to get a matched resource.</p>
        <Link
          to="/quiz"
          className="mt-6 inline-flex rounded-full bg-orange-400 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
        >
          Start the Assessment
        </Link>
      </main>
    )
  }

  const dominantCodes = result.dominant_types ?? [result.dominant_type]
  const dominantCode = dominantCodes[0]
  const dominantType = anxietyTypes[dominantCode]
  const featuredResource = dominantType?.resources?.primary
  const secondaryResources = dominantType?.resources?.secondary ?? []

  return (
    <main className="space-y-6">
      <header className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
        <h1 className="text-4xl text-slate-900 md:text-5xl">Your Recommended Next Step</h1>
        <p className="mt-3 text-slate-700">
          Based on your profile, your current focus area is <strong>{dominantType.name}</strong> {dominantType.icon}.
        </p>
        <p className="mt-2 text-slate-700">
          Start with one focused resource first, then explore optional extras only if you want more.
        </p>
      </header>

      {featuredResource ? (
        <ResourceCard
          roleLabel="Primary Resource"
          title={featuredResource.title}
          description={featuredResource.description}
          href={featuredResource.url}
          ctaLabel="Access Resource"
          mindlinePowered={Boolean(featuredResource.mindlinePowered)}
        />
      ) : null}

      <section className="space-y-3">
        <h2 className="text-3xl text-slate-900">Optional extras</h2>
        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">
            If you have time, these can reinforce the same focus area.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {secondaryResources.map((resource, index) => (
              <article key={resource.title} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4">
                <p className="text-xs font-semibold text-orange-700">Secondary Resource {index + 1}</p>
                <h3 className="mt-1 text-base text-slate-800 md:text-lg">{resource.title}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-slate-700">{resource.description}</p>
                {resource.mindlinePowered ? (
                  <p className="mt-1 text-xs font-medium text-teal-700">Powered by mindline.sg 🇸🇬</p>
                ) : null}
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-semibold text-teal-700 transition hover:text-teal-800 hover:underline"
                >
                  Open resource
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/resources"
          className="inline-flex rounded-full border border-orange-300 px-6 py-3 font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          Browse All Resources
        </Link>
        <Link
          to="/quiz"
          className="inline-flex rounded-full border border-teal-600 px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
        >
          Retake the Quiz After Your Next Interview →
        </Link>
      </div>
    </main>
  )
}

export default Resource