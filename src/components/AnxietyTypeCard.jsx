function AnxietyTypeCard({ title, icon, description, score, highlighted = false }) {
  return (
    <article
      className={`rounded-3xl border p-5 md:p-6 ${
        highlighted
          ? 'border-orange-300 bg-orange-50'
          : 'border-orange-100 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <h3 className="text-2xl text-slate-800">{title}</h3>
      </div>
      {typeof score === 'number' ? (
        <p className="mt-2 text-lg font-semibold text-orange-800">Score: {score.toFixed(2)}</p>
      ) : null}
      <p className="mt-3 leading-relaxed text-slate-700">{description}</p>
    </article>
  )
}

export default AnxietyTypeCard