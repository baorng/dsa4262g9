function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Question {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-orange-100/80">
        <div
          className="h-full rounded-full bg-teal-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default ProgressBar