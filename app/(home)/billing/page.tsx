"use client";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "../dashboard/components/date-range-picker";
import CardsRevenue from "./components/analytics/CardRevenue";


import StudentsPerYear from "./components/analytics/CardStudentsPerYear";

import { CardsMetric } from "./components/analytics/CardMetric";
import { CircleExpenses } from "./components/analytics/CardExpensesCircle";
import CardTransactions from "./components/analytics/CardTransactions";
import CardIncome from "./components/analytics/CardExpenses";
import Payouts from "./components/otherPayouts/page";
import TeacherSalaryDashBoard from "./components/teachersBilling/page";

export default function DashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="teachers" className="space-y-4">
            <TabsList>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardsRevenue />
               <CardIncome/>
                <StudentsPerYear />
                <CircleExpenses />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <CardsMetric />
                <CardTransactions />
              </div>
            </TabsContent>
            <TabsContent value="payouts" className="space-y-4">
              <Payouts/>
            </TabsContent>
            <TabsContent value="teachers" className="space-y-4">
              <TeacherSalaryDashBoard/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
