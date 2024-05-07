"use client"

import { useData } from "@/context/admin/fetchDataContext";
import { useTranslations } from "next-intl";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



export function Overview() {
const t=useTranslations()
  const data:any[]=Object.keys(useData().analytics.data).map((key:any) => ({
    month: useData().analytics.data[key].month,
    income: useData().analytics.data[key].income || 0,
    expenses: useData().analytics.data[key].expenses || 0,
  }));
  return (
<ResponsiveContainer width="100%" height={350}>
  <BarChart data={data}>
    <XAxis
      dataKey="month"
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
      tickFormatter={(value) => `DZD${value}`}
    />
    <Bar
      dataKey="income"
      radius={[0, 0, 0, 0]}
      stackId="a"
      fill="currentColor"
      className="fill-primary"
    />
    <Bar
      dataKey="expenses"
      fill="#8884d8" // Purple color for expenses bars
      radius={[4, 4, 0, 0]}
      stackId="a"
    />
           <Tooltip
       cursor={{fill: 'transparent'}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {t('income')} </span>
                            <span className="font-bold text-blue-500">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {t('expenses')} </span>
                              <span className="font-bold text-muted-foreground" style={{ color: '#8884d8' }}>
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
  </BarChart>
</ResponsiveContainer>
  )
}