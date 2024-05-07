"use client"

import { useData } from "@/context/admin/fetchDataContext";
import { useTranslations } from "next-intl";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


type MonthName = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export function Overview() {
const t=useTranslations()
const { analytics } = useData(); // Retrieve analytics data


const data = analytics?.data
  ? Object.keys(analytics.data)
      .map((key) => ({
        month: analytics.data[key].month as MonthName, // Assert the type of month
        income: analytics.data[key].income || 0,
        expenses: analytics.data[key].expenses || 0,
      }))
      .sort((a, b) => {
        const monthsOrder: Record<MonthName, number> = {
          January: 1,
          February: 2,
          March: 3,
          April: 4,
          May: 5,
          June: 6,
          July: 7,
          August: 8,
          September: 9,
          October: 10,
          November: 11,
          December: 12,
        };

        return monthsOrder[a.month] - monthsOrder[b.month];
      })
  : [];


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
      tick={{ dx: 5 }} // Adjust dy value as needed
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
      fill="#DE3163" // Purple color for expenses bars
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
                              <span className="font-bold text-muted-foreground" style={{ color: '#DE3163' }}>
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