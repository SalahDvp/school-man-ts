"use client"
import { useUser } from "@/lib/auth";

import { redirect } from "@/navigation";

function Page() {



  const user = useUser();
  if (user) {
    return redirect('/dashboard')
  }

  if (user === false) {
    return <>Auth loading...</>;
  }
  return redirect("/Auth")
}
export default Page