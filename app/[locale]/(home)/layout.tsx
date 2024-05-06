"use client";

import { useUser } from "@/lib/auth";
import Header from "../components/Header";
import { redirect } from "next/navigation";
import { FetchDataProvider } from "@/context/admin/fetchDataContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();

  
  if (user === false) return <>Auth loading...</>;
  if (!user) return redirect("/");
  return (
    
    <FetchDataProvider>
      <div>
        <Header />
        {children}
      </div>
    </FetchDataProvider>
  );
}
