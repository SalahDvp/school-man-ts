"use client"
import { Button } from "@/components/ui/button"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import { Overview } from "./components/overview"
import { RecentSales } from "./components/recent-sales"
import { useTranslations } from "next-intl"
import { useData } from "@/context/admin/fetchDataContext";
interface AnalyticsData {
  data: {
    [key: string]: {
      month: string;
      income: number;
      expenses: number;
    };
  };
}

interface AnalyticsResult {
  totalIncome: number;
  profit: number;
  rate: number;
  rateNp: number;
}

const calculateAnalytics = (analyticsData: AnalyticsData): AnalyticsResult => {
  let totalIncome = 0;
  let profit = 0;
  let rate = 0; // Growth rate for total income
  let rateNp = 0; // Growth rate for net profit
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  if (analyticsData && analyticsData.data) {
    // Convert `data` to an array of records
    const records = Object.values(analyticsData.data);

    // Find the record for the current month
    const currentMonthData = records.find(
      (record) => record.month === currentMonth
    );

    // Find the record for the previous month
    const previousMonthIndex = new Date().getMonth() - 1;
    const previousMonth = new Date(new Date().setMonth(previousMonthIndex)).toLocaleString('default', { month: 'long' });
    const previousMonthData = records.find(
      (record) => record.month === previousMonth
    );

    if (currentMonthData) {
      totalIncome = currentMonthData.income;
      const currentProfit = totalIncome - currentMonthData.expenses;
      profit = currentProfit;
      if (previousMonthData) {
        const previousIncome = previousMonthData.income;
        const previousProfit = previousIncome - previousMonthData.expenses;

        // Calculate the growth rate for total income
        if (previousIncome !== 0) {
          rate = ((totalIncome - previousIncome) / previousIncome) * 100;
          rate = parseFloat(rate.toFixed(2)); // Convert to number with 2 decimal places
        } else {
          console.warn("Previous month's income is zero. Cannot calculate growth rate.");
        }

        // Calculate the growth rate for net profit
        if (previousProfit !== 0) {
          rateNp = ((currentProfit - previousProfit) / previousProfit) * 100;
          rateNp = parseFloat(rateNp.toFixed(2)); // Convert to number with 2 decimal places
        } else {
          console.warn("Previous month's net profit is zero. Cannot calculate net profit growth rate.");
        }
      } else {
        console.warn(`Data for the previous month (${previousMonth}) not found.`);
      }
    } else {
      console.warn(`Data for the current month (${currentMonth}) not found.`);
    }
  } else {
    console.error("`analyticsData.data` is undefined. Check data initialization.");
  }

  return { totalIncome, profit, rate, rateNp };
};
function Page() {
const {analytics,students,teachers}=useData();
const number_of_students=students.length
  const number_of_teachers=teachers.length
  const t =useTranslations()
  const { totalIncome, profit, rate, rateNp } = calculateAnalytics(analytics);
 
  

return (
  <div className="flex-1 space-y-4 p-8 pt-6" >
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>{t('download')}</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
              {t('analytics')}
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
              {t('reports')}
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
              {t('notifications')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                  {t('total-revenue')}
                    </CardTitle>
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="h-4 w-4 text-muted-foreground"
>
  <ellipse cx="12" cy="8" rx="10" ry="4" />
  <path d="M2 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8" />
  <path d="M2 12c0 2.2 4.5 4 10 4s10-1.8 10-4" />
</svg>


                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalIncome} DZD</div>
                    <p className="text-xs text-muted-foreground">
                      {t('from-last-month',{rate:rate})}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    {t('Students')} </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{number_of_students}</div>
                    <p className="text-xs text-muted-foreground">
                   {t('number-of-students')} </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('net-profit')}</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{profit} DZD</div>
                    <p className="text-xs text-muted-foreground">
{t('from-last-month',{rate:rateNp})}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t('teachers-0')} </CardTitle>
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="h-4 w-4 text-muted-foreground"
>
  <path d="M22 9l-10-5L2 9l10 5 10-5zm-10 7v4m6-4a6 6 0 01-12 0" />
</svg>

                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{number_of_teachers}</div>
                    <p className="text-xs text-muted-foreground">
                    {t('number-of-teachers')} </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>{t('overview')}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>{t('upcoming-payments')}</CardTitle>
                    <CardDescription>
                    {t('students-with-payments-due',{days:'20'})}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales  />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>


        </div>
    
  )
}
export default Page