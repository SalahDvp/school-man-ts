

import { Bar, BarChart, Line, LineChart, ResponsiveContainer,Tooltip,XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const data = [
    { students: 100, year: 'Year 5' },

    { students: 50, year: 'Kindergarten' },
    { students: 90, year: 'Year 4' },
    { students: 70, year: 'Year 2' },
    { students: 60, year: 'Year 1' },
    
    { students: 80, year: 'Year 3' },

 

  ];

function StudentsPerYear() {


  return (
<Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle className="text-sm font-normal">Total Students</CardTitle>
</CardHeader>
<CardContent>
  <div className="text-2xl font-bold">400 Students</div>

  <div className="mt-4 h-[80px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
      <Tooltip
cursor={{fill: 'transparent'}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              students
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />
      <Bar
          dataKey="students"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
           <XAxis
      dataKey="year"
      stroke="#888888"
      fontSize={12}
      tickLine={false}
      axisLine={false}
      interval={0} // Display all labels
    // Rotate labels if needed
    />
      </BarChart>
    </ResponsiveContainer>
  </div>
</CardContent>
</Card>


  )
}
export default StudentsPerYear
{/* <Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle className="text-sm font-normal">Subscriptions</CardTitle>
</CardHeader>
<CardContent>
  <div className="text-2xl font-bold">+2350</div>
  <p className="text-xs text-muted-foreground">
    +180.1% from last month
  </p>
  <div className="mt-4 h-[80px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar
          dataKey="subscription"
          style={
            {
              fill: "var(--theme-primary)",
              opacity: 1,
              "--theme-primary": `hsl(221.2 83.2% 53.3%)`,
            } as React.CSSProperties
          }
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</CardContent>
</Card> */}