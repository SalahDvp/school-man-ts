
import React from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import StudentPayment from "./studen-payment-table";
import { useTranslation } from "react-i18next";
interface User {
  id: number;
  name: string;
  email: string;
  nextPaymentDate: string;
}





export async function RecentSales({params}) {
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      nextPaymentDate: "2024-05-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      nextPaymentDate: "2024-04-20",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      nextPaymentDate: "2025-05-01",
    },
  ];
  const { t } = await initTranslations(params, ['dashboard']);
  
  return (

    <div className="space-y-4">
      <h1>{t('dashboard')}</h1>
      {users.map((user) => (
        <StudentPayment key={user.id} user={user} />
      ))}
    </div>
 
  );
}

export default RecentSales;
