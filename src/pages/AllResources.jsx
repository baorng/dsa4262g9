import { Link } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard'
import { anxietyTypeList } from '../data/anxietyTypes'

function AllResources() {
  const totalResources = anxietyTypeList.reduce((sum, type) => {
    const secondaryCount = type.resources?.secondary?.length ?? 0
    return sum + 1 + secondaryCount
  }, 0)

  return (
    <main className="space-y-6">
      <header className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
        <h1 className="text-4xl text-slate-900 md:text-5xl">All Support Resources</h1>
        <p className="mt-3 text-slate-700">
          Browse every curated resource across all anxiety types in one place.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          {totalResources} resources across {anxietyTypeList.length} focus areas.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {anxietyTypeList.map((type) => (
            <a
              key={type.code}
              href={`#${type.code}`}
              className="rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
            >
              {type.icon} {type.name}
            </a>
          ))}
        </div>
      </header>

      {anxietyTypeList.map((type) => (
        <section
          key={type.code}
          id={type.code}
          className="scroll-mt-24 rounded-3xl border border-orange-100 bg-orange-50/40 p-5"
        >
          <div className="mb-4">
            <h2 className="text-3xl text-slate-900">{type.icon} {type.name}</h2>
            <p className="mt-1 text-slate-700">{type.description}</p>
          </div>

          <div className="space-y-3">
            <ResourceCard
              roleLabel="Primary Resource"
              title={type.resources.primary.title}
              description={type.resources.primary.description}
              href={type.resources.primary.url}
              ctaLabel="Open Resource"
              mindlinePowered={Boolean(type.resources.primary.mindlinePowered)}
            />

            <div className="grid gap-3 md:grid-cols-2">
              {type.resources.secondary.map((resource, index) => (
                <ResourceCard
                  key={`${type.code}-${resource.title}`}
                  roleLabel={`Secondary Resource ${index + 1}`}
                  title={resource.title}
                  description={resource.description}
                  href={resource.url}
                  ctaLabel="Open Resource"
                  compact
                  mindlinePowered={Boolean(resource.mindlinePowered)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="flex flex-wrap gap-3">
        <Link
          to="/quiz"
          className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
        >
          Take or Retake Assessment
        </Link>
        <Link
          to="/"
          className="rounded-full border border-teal-600 px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}

export default AllResources