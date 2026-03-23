function ResourceCard({
  title,
  description,
  href = '#',
  compact = false,
  roleLabel,
  ctaLabel = 'Access Resource',
  mindlinePowered = false,
}) {
  return (
    <article
      className={`rounded-3xl border border-orange-100 bg-white ${compact ? 'p-4' : 'p-6'} shadow-sm`}
    >
      {roleLabel ? (
        <p className="mb-2 inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-800">
          {roleLabel}
        </p>
      ) : null}

      <h3 className={`${compact ? 'text-lg' : 'text-2xl'} text-slate-800`}>{title}</h3>
      <p className="mt-2 text-slate-700">{description}</p>
      {mindlinePowered ? (
        <p className="mt-2 text-xs font-medium text-teal-700">Powered by mindline.sg 🇸🇬</p>
      ) : null}

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center rounded-full bg-orange-400 px-5 py-2 font-semibold text-white transition hover:bg-orange-500"
      >
        {ctaLabel}
      </a>
    </article>
  )
}

export default ResourceCard