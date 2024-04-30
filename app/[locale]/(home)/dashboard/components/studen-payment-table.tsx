
"use client"
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { useTranslation } from "react-i18next";
interface User {
  id: number;
  name: string;
  email: string;
  nextPaymentDate: string;
}

interface UserCardProps {
  user: User;
}
const calculateDaysUntilNextPayment = (nextPaymentDate: string): number => {
    const today = new Date();
    const paymentDate = parseISO(nextPaymentDate);
    return differenceInCalendarDays(paymentDate, today);
  };
  const StudentPayment: React.FC<UserCardProps> = ({ user }) => {
    const daysUntilNextPayment = calculateDaysUntilNextPayment(user.nextPaymentDate);
    const {t} =useTranslation()
    return (
      <div
        className={`flex items-center p-4 rounded-lg shadow-md transition hover:bg-gray-100 dark:hover:bg-gray-700 ${
          daysUntilNextPayment < 0 ? "bg-red-100 dark:bg-red-700" : "bg-gray-50 dark:bg-gray-800"
        }`}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none dark:text-gray-100">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
            {t('next_payment_date')}: {format(parseISO(user.nextPaymentDate), "yyyy-MM-dd")}
          </p>
          <p
            className={`text-sm ${
              daysUntilNextPayment > 0 ? "text-green-600 dark:text-green-300" : "text-red-600 dark:text-red-300"
            }`}
          >
            {daysUntilNextPayment > 0
              ? `${daysUntilNextPayment} day${daysUntilNextPayment === 1 ? "" : "s"} left`
              : "Due or overdue"}
          </p>
        </div>
      </div>
    );
  };
  export default StudentPayment