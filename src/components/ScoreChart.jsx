import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function ScoreChart({ data, dominantTypes }) {
  const chartData = data.map((item) => ({
    ...item,
    fill: dominantTypes.includes(item.code) ? '#f97316' : '#fdba74',
  }))

  return (
    <div className="h-80 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm md:p-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#fed7aa" strokeDasharray="4 4" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} angle={-12} dy={10} />
          <YAxis domain={[1, 5]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            <LabelList position="top" dataKey="score" formatter={(value) => Number(value).toFixed(2)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ScoreChart