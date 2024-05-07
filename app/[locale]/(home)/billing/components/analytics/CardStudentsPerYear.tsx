

import { Bar, BarChart, Line, LineChart, ResponsiveContainer,Tooltip,XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from "next-intl";
import { number } from "zod";
import { useData } from "@/context/admin/fetchDataContext";



function StudentsPerYear() {
const t=useTranslations()
const {levels}=useData()
  return (
<Card>
<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle className="text-sm font-normal">{t('total-students')}</CardTitle>
</CardHeader>
<CardContent>
  <div className="text-2xl font-bold">{t('number-students',{number:400})}</div>

  <div className="mt-4 h-[80px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={levels}>
      <Tooltip
cursor={{fill: 'transparent'}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {t("students")}
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
          dataKey="studentsNumber"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
           <XAxis
      dataKey="level"
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