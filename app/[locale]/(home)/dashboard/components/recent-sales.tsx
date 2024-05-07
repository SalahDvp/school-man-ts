"use client"
import React from "react";
import StudentPayment from "./studen-payment-table";
import { useData } from "@/context/admin/fetchDataContext";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: number;
  name: string;
  email: string;
  nextPaymentDate: string;
}





export function RecentSales() {
const {students}=useData()
  const t=useTranslations()
  return (
    <ScrollArea className="h-[350px]">
    <div className="space-y-4">
      {students.map((user:any) => (
        <StudentPayment key={user.id} user={user} title={t("next-payment-date")} daysLeft={t('days-left-0')} duo={t('duo-or-overduo')}/>
      ))}
    </div>
 </ScrollArea>
  );
}

export default RecentSales;
