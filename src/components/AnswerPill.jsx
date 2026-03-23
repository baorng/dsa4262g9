function AnswerPill({
  option,
  selected,
  onClick,
  disabled = false,
  shouldPulse = false,
  pulseToken = 0,
}) {
  const optionStyles = {
    1: {
      base: 'border-rose-200 bg-rose-50/70 text-rose-800 hover:bg-rose-100',
      active: 'border-rose-300 bg-rose-100 text-rose-900 shadow-[0_0_0_3px_rgba(251,113,133,0.15)]',
      size: 'h-11 w-11 md:h-12 md:w-12',
    },
    2: {
      base: 'border-orange-200 bg-orange-50/70 text-orange-800 hover:bg-orange-100',
      active: 'border-orange-300 bg-orange-100 text-orange-900 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]',
      size: 'h-10 w-10 md:h-11 md:w-11',
    },
    3: {
      base: 'border-amber-200 bg-amber-50/70 text-amber-800 hover:bg-amber-100',
      active: 'border-amber-300 bg-amber-100 text-amber-900 shadow-[0_0_0_3px_rgba(251,191,36,0.15)]',
      size: 'h-9 w-9 md:h-10 md:w-10',
    },
    4: {
      base: 'border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100',
      active: 'border-emerald-300 bg-emerald-100 text-emerald-900 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]',
      size: 'h-10 w-10 md:h-11 md:w-11',
    },
    5: {
      base: 'border-teal-200 bg-teal-50/70 text-teal-800 hover:bg-teal-100',
      active: 'border-teal-300 bg-teal-100 text-teal-900 shadow-[0_0_0_3px_rgba(45,212,191,0.18)]',
      size: 'h-11 w-11 md:h-12 md:w-12',
    },
  }

  const styleSet = optionStyles[option.value] ?? optionStyles[3]

  return (
    <button
      type="button"
      onClick={() => onClick(option.value)}
      disabled={disabled}
      className={`group flex flex-col items-center gap-1 rounded-2xl px-1 py-1 text-center transition ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      }`}
      aria-pressed={selected}
      aria-label={`${option.value} ${option.label}`}
    >
      <span
        key={`${option.value}-${pulseToken}`}
        className={`${styleSet.size} inline-flex items-center justify-center rounded-full border text-sm font-semibold transition ${
          selected ? styleSet.active : styleSet.base
        } ${selected && shouldPulse ? 'answer-select-pulse' : ''}`}
      >
        {option.value}
      </span>
      <span className="text-[11px] font-medium text-slate-600 md:text-xs">{option.label}</span>
    </button>
  )
}

export default AnswerPill