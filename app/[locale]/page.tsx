
"use client"
import { useRouter } from "@/navigation"
import { useUser } from "@/lib/auth";

import { redirect } from "@/navigation";

function Page() {

  const router=useRouter()

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