import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const colors = ['#0d9488', '#14b8a6', '#22c55e', '#fb923c', '#f97316']

function CustomLegend({ series }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-5 text-sm font-semibold text-slate-700">
      {series.map((item, index) => (
        <span key={item.key} className="inline-flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: colors[index % colors.length] }}
            aria-hidden="true"
          />
          {item.label}
        </span>
      ))}
    </div>
  )
}

function AnalyticsChart({ type, data, xKey, series }) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#fed7aa" strokeDasharray="4 4" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis domain={[1, 5]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend content={<CustomLegend series={series} />} />
          {series.map((item, index) => (
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              name={item.label}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="#fed7aa" strokeDasharray="4 4" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend content={<CustomLegend series={series} />} />
        {series.map((item, index) => (
          <Bar
            key={item.key}
            dataKey={item.key}
            fill={colors[index % colors.length]}
            radius={[6, 6, 0, 0]}
            name={item.label}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AnalyticsChart