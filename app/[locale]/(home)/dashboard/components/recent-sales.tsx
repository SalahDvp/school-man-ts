
import React from "react";
import StudentPayment from "./studen-payment-table";

interface User {
  id: number;
  name: string;
  email: string;
  nextPaymentDate: string;
}





export async function RecentSales() {
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

  
  return (

    <div className="space-y-4">
      {users.map((user) => (
        <StudentPayment key={user.id} user={user} />
      ))}
    </div>
 
  );
}

export default RecentSales;
