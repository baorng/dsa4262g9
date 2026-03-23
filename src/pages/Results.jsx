import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AnxietyTypeCard from '../components/AnxietyTypeCard'
import ScoreChart from '../components/ScoreChart'
import { anxietyTypes } from '../data/anxietyTypes'
import { getDominantTypes, interpretationLabel } from '../lib/scoring'
import { getLatestResult } from '../lib/session'
import { getPreviousAttempt, hasSupabase } from '../lib/supabaseClient'

function Results() {
  const location = useLocation()
  const [previousAttempt, setPreviousAttempt] = useState(null)

  const result = location.state?.result ?? getLatestResult()

  const scores = useMemo(() => {
    if (!result) {
      return null
    }

    return {
      communication: Number(result.communication_score),
      appearance: Number(result.appearance_score),
      social: Number(result.social_score),
      performance: Number(result.performance_score),
      behavioural: Number(result.behavioural_score),
    }
  }, [result])

  const dominantTypes = useMemo(() => {
    if (!scores) {
      return []
    }

    return getDominantTypes(scores).dominantTypes
  }, [scores])

  useEffect(() => {
    async function loadPreviousAttempt() {
      if (!result || !hasSupabase || result.attempt_number <= 1) {
        return
      }

      try {
        const previous = await getPreviousAttempt(result.session_id, result.attempt_number)
        setPreviousAttempt(previous)
      } catch (error) {
        console.warn('Unable to load previous attempt comparison', error)
      }
    }

    loadPreviousAttempt()
  }, [result])

  if (!result || !scores) {
    return (
      <main className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl text-slate-900">No results yet</h1>
        <p className="mt-2 text-slate-700">Complete the questionnaire to view your anxiety profile.</p>
        <Link
          to="/quiz"
          className="mt-6 inline-flex rounded-full bg-orange-400 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
        >
          Start the Assessment
        </Link>
      </main>
    )
  }

  const chartData = Object.entries(scores).map(([code, score]) => ({
    code,
    label: anxietyTypes[code].name.replace(' Anxiety', ''),
    score,
  }))

  const scoreKeys = Object.keys(scores)

  const comparisonSummary = previousAttempt
    ? (() => {
        const previousAverage =
          scoreKeys.reduce((sum, key) => sum + Number(previousAttempt[`${key}_score`]), 0) / scoreKeys.length
        const currentAverage = scoreKeys.reduce((sum, key) => sum + Number(scores[key]), 0) / scoreKeys.length
        const averageDelta = Number((currentAverage - previousAverage).toFixed(2))
        const improvedCount = scoreKeys.filter(
          (key) => Number(scores[key]) - Number(previousAttempt[`${key}_score`]) < 0,
        ).length

        return {
          previousAverage: Number(previousAverage.toFixed(2)),
          currentAverage: Number(currentAverage.toFixed(2)),
          averageDelta,
          improvedCount,
        }
      })()
    : null

  return (
    <main className="space-y-6">
      <header className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
        <h1 className="text-4xl text-slate-900 md:text-5xl">Your Interview Anxiety Profile</h1>
        <p className="mt-3 text-slate-700">These scores reflect where interview pressure may be affecting you most right now.</p>
      </header>

      <ScoreChart data={chartData} dominantTypes={dominantTypes} />

      <section className={dominantTypes.length > 1 ? 'grid gap-4 md:grid-cols-2' : 'grid gap-4'}>
        {dominantTypes.map((typeCode) => (
          <div key={typeCode} className={dominantTypes.length === 1 ? 'w-full' : ''}>
            <AnxietyTypeCard
              title={anxietyTypes[typeCode].name}
              icon={anxietyTypes[typeCode].icon}
              description={anxietyTypes[typeCode].description}
              score={scores[typeCode]}
              highlighted
            />
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-orange-100 bg-orange-50 p-5 text-sm text-slate-700">
        <p>
          Score guide: <strong>1–2 = Low</strong>, <strong>3 = Moderate</strong>, <strong>4–5 = High</strong>.
          Your current dominant score level is{' '}
          <strong className="text-orange-800">{interpretationLabel(Math.max(...Object.values(scores)))}</strong>.
        </p>
      </section>

      {previousAttempt ? (
        <section className="rounded-3xl border border-orange-200 bg-white p-6">
          <h2 className="text-3xl text-slate-900">Last time vs now</h2>
          <p className="mt-2 text-sm text-slate-600">Lower is better. A negative delta means improvement.</p>
          <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
            {scoreKeys.map((key) => {
              const previousValue = Number(previousAttempt[`${key}_score`])
              const currentValue = Number(scores[key])
              const delta = Number((currentValue - previousValue).toFixed(2))
              const improved = delta < 0
              const unchanged = delta === 0
              const progress = Math.min(100, Math.max(0, (currentValue / 5) * 100))

              return (
                <article key={key} className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-800">{anxietyTypes[key].name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        improved
                          ? 'bg-emerald-100 text-emerald-800'
                          : unchanged
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {improved ? 'Improved' : unchanged ? 'No change' : 'Higher'}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                    <span>{previousValue.toFixed(2)}</span>
                    <span aria-hidden="true">→</span>
                    <span className="font-semibold">{currentValue.toFixed(2)}</span>
                    <span
                      className={`ml-auto text-xs font-semibold ${
                        improved ? 'text-emerald-700' : unchanged ? 'text-slate-600' : 'text-rose-700'
                      }`}
                    >
                      {delta >= 0 ? '+' : ''}
                      {delta.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-orange-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        currentValue >= 4
                          ? 'bg-rose-400'
                          : currentValue >= 3
                            ? 'bg-orange-400'
                            : 'bg-emerald-400'
                      }`}
                      style={{ width: `${progress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </article>
              )
            })}

            {comparisonSummary ? (
              <article className="rounded-2xl border border-orange-200 bg-orange-100/50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-800">Overall average change</h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      comparisonSummary.averageDelta < 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : comparisonSummary.averageDelta > 0
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {comparisonSummary.averageDelta < 0
                      ? 'Improved overall'
                      : comparisonSummary.averageDelta > 0
                        ? 'Higher overall'
                        : 'No overall change'}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                  <span>{comparisonSummary.previousAverage.toFixed(2)}</span>
                  <span aria-hidden="true">→</span>
                  <span className="font-semibold">{comparisonSummary.currentAverage.toFixed(2)}</span>
                  <span className="ml-2 text-xs text-slate-600">
                    Improved types: <strong>{comparisonSummary.improvedCount}</strong>/{scoreKeys.length}
                  </span>
                  <span
                    className={`ml-auto text-xs font-semibold ${
                      comparisonSummary.averageDelta < 0
                        ? 'text-emerald-700'
                        : comparisonSummary.averageDelta > 0
                          ? 'text-rose-700'
                          : 'text-slate-600'
                    }`}
                  >
                    {comparisonSummary.averageDelta >= 0 ? '+' : ''}
                    {comparisonSummary.averageDelta.toFixed(2)}
                  </span>
                </div>

                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-orange-100">
                  <div
                    className="h-full rounded-full bg-teal-400 transition-all"
                    style={{ width: `${Math.round((comparisonSummary.improvedCount / scoreKeys.length) * 100)}%` }}
                    aria-hidden="true"
                  />
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          to="/resource"
          state={{ result }}
          className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
        >
          Get Your Resource
        </Link>
        <Link
          to="/quiz"
          className="rounded-full border border-teal-600 px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
        >
          Retake After Your Interview
        </Link>
      </div>
    </main>
  )
}

export default Results