

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const data = [
  { name: 'Jan', income: 5000, expenses: 3500 },
  { name: 'Feb', income: 5500, expenses: 3800 },
  { name: 'Mar', income: 6000, expenses: 4000 },
  { name: 'Apr', income: 6200, expenses: 4200 },
  { name: 'May', income: 6500, expenses: 4300 },
  { name: 'Jun', income: 6700, expenses: 4400 },
  { name: 'Jul', income: 6900, expenses: 4600 },
  { name: 'Aug', income: 7100, expenses: 4800 },
  { name: 'Sep', income: 7300, expenses: 4900 },
  { name: 'Oct', income: 7500, expenses: 5000 },
  { name: 'Nov', income: 7700, expenses: 5200 },
  { name: 'Dec', income: 8000, expenses: 5500 },
]

function CardsRevenue() {


  return (
<Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle className="text-sm font-normal">Total Revenue</CardTitle>
</CardHeader>
<CardContent>
<div className="text-2xl font-bold">$15,231.89</div>
<p className="text-xs text-muted-foreground">
      +180.1% from last month
      </p>
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
                              Income
                            </span>
                            <span className="font-bold text-blue-500">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Expenses
                            </span>
                            <span className="font-bold text-muted-foreground">
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
      <Bar
          dataKey="income"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
                    
      <Bar
          dataKey="expenses"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          style={
            {
              stroke: "var(221.2 83.2% 53.3%)",
              opacity: 0.25,
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
export default CardsRevenue
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