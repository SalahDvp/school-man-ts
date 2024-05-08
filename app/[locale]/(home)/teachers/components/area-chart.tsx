
import { Bar, BarChart, Line, LineChart, ResponsiveContainer ,Tooltip} from "recharts"



const data = [
    {
      revenue: 10400,
      subscription: 240,
    },
    {
      revenue: 14405,
      subscription: 300,
    },
    {
      revenue: 9400,
      subscription: 200,
    },
    {
      revenue: 8200,
      subscription: 278,
    },
    {
      revenue: 7000,
      subscription: 189,
    },
    {
      revenue: 9600,
      subscription: 239,
    },
    {
      revenue: 11244,
      subscription: 278,
    },
    {
      revenue: 26475,
      subscription: 189,
    },
  ]

const GradientColors = () => {
    return (
<linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#1C64F2" stopOpacity={0.55} />
  <stop offset="100%" stopColor="#1C64F2" stopOpacity={0} />
</linearGradient>
    );
  };
export function Overview() {
  return (
    <div className="h-[80px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
                  <Tooltip />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="revenue"
          activeDot={{
            r: 6,
            style: { fill: "var(221.2 83.2% 53.3%)", opacity: 0.25 },
          }}
          style={
            {
              stroke: "var(221.2 83.2% 53.3%)",
              "--theme-primary": `hsl(221.2 83.2% 53.3%)`,
            } as React.CSSProperties
          }
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
  )
}