
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { format,differenceInCalendarDays } from "date-fns";
interface User {
  id: number;
  student: string;
  parentPhone: string;
  nextPaymentDate: Date;
}

interface UserCardProps {
  user: User;
  title:string;
  daysLeft:string;
  duo:string;
}
const calculateDaysUntilNextPayment = (nextPaymentDate: Date): number => {
  const today = new Date();
  return differenceInCalendarDays(nextPaymentDate, today);
};
  const StudentPayment: React.FC<UserCardProps> = ({ user,title,daysLeft,duo }) => {
    const daysUntilNextPayment = calculateDaysUntilNextPayment(user.nextPaymentDate);

    return (
      <div
        className={`flex items-center p-4 rounded-lg shadow-md transition hover:bg-gray-100 dark:hover:bg-gray-700 ${
          daysUntilNextPayment < 0 ? "bg-red-100 dark:bg-red-700" : "bg-gray-50 dark:bg-gray-800"
        }`}
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>{user.student.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none dark:text-gray-100">{user.student}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.parentPhone}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
            {title}: {format(user.nextPaymentDate, "yyyy-MM-dd")}
          </p>
          <p
            className={`text-sm ${
              daysUntilNextPayment > 0 ? "text-green-600 dark:text-green-300" : "text-red-600 dark:text-red-300"
            }`}
          >
            {daysUntilNextPayment > 0
              ? `${daysUntilNextPayment} ${daysLeft}`
              : duo}
          </p>
        </div>
      </div>
    );
  };
  export default StudentPayment