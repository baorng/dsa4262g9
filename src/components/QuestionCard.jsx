import AnswerPill from './AnswerPill'

function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect,
  disabled = false,
  pulseValue = null,
  pulseToken = 0,
}) {
  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-2xl leading-tight text-slate-800 md:text-3xl">{question.text}</h2>

      <div className="mt-6 grid grid-cols-5 items-start gap-1.5 md:gap-3">
        {options.map((option) => (
          <AnswerPill
            key={option.value}
            option={option}
            selected={selectedValue === option.value}
            onClick={onSelect}
            disabled={disabled}
            shouldPulse={pulseValue === option.value}
            pulseToken={pulseToken}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500">
        <span>Never</span>
        <span>Always</span>
      </div>
    </section>
  )
}

export default QuestionCard