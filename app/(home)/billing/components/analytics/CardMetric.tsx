
import { Line, LineChart, ResponsiveContainer, Tooltip,XAxis,YAxis } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const data = [
  { name: "Jan", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", income: Math.floor(Math.random() * 5000) + 1000, expenses: Math.floor(Math.random() * 5000) + 1000 },
];


export function CardsMetric() {


  return (

    <Card className="col-span-4">
    <CardHeader>
      <CardTitle>Overview</CardTitle>
    </CardHeader>
    <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Income
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Expenses
                            </span>
                            <span className="font-bold">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="income"
                activeDot={{
                  r: 6,
                  style: { fill: "var(221.2 83.2% 53.3%)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(221.2 83.2% 53.3%)",
                    opacity: 0.25,
                    "--theme-primary": `hsl(221.2 83.2% 53.3%)`,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="expenses"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(221.2 83.2% 53.3%)" },
                }}
                style={
                  {
                    stroke: "var(221.2 83.2% 53.3%)",
                    "--theme-primary": `hsl(221.2 83.2% 53.3%)`,
                  } as React.CSSProperties
                }
              />
                    <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
            </LineChart>
          </ResponsiveContainer>
          </CardContent>
                </Card>

  )
}