import { Link, useLocation } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard'
import { anxietyTypeList, anxietyTypes } from '../data/anxietyTypes'
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
  const otherTypes = anxietyTypeList.filter((type) => type.code !== dominantCode)
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
          This featured resource is chosen to give you a practical, focused next step that matches where interview anxiety is affecting you most right now.
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
        <h2 className="text-3xl text-slate-900">Explore More Resources</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {secondaryResources.map((resource, index) => (
            <ResourceCard
              key={resource.title}
              roleLabel={`Secondary Resource ${index + 1}`}
              title={resource.title}
              description={resource.description}
              href={resource.url}
              compact
              ctaLabel="Access Resource"
              mindlinePowered={Boolean(resource.mindlinePowered)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-3xl text-slate-900">Other Anxiety Types</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {otherTypes.map((type) => (
            <article key={type.code} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-600">{type.icon} {type.name}</p>
              <h3 className="mt-2 text-lg text-slate-800">{type.resources.primary.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{type.resources.primary.description}</p>
              {type.resources.primary.mindlinePowered ? (
                <p className="mt-2 text-xs font-medium text-teal-700">Powered by mindline.sg 🇸🇬</p>
              ) : null}
              <a
                href={type.resources.primary.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
              >
                Access Resource
              </a>
            </article>
          ))}
        </div>
      </section>

      <Link
        to="/quiz"
        className="inline-flex rounded-full border border-teal-600 px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
      >
        Retake the Quiz After Your Next Interview →
      </Link>
    </main>
  )
}

export default Resource