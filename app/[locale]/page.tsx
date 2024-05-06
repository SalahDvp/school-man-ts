
"use client"
import Image from "next/image"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { auth } from '@/firebase/firebase-config';
import { signIn } from "@/lib/auth"
import { useRouter } from "@/navigation"
import { useUser } from "@/lib/auth";

import { redirect } from "next/navigation";

function SignIn() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('12345678');
  const router=useRouter()
  const handleSignIn = async () => {
    try {
      await signIn(email, password, true);
      //if role admine
      //if parent parendachos
router.push('/dashboard')
    } catch (error) {
      window.alert(error);
    }
  }
  // const user = useUser();
  // if (user) {
  //   return router.push('/dashboard')
  // }

  // if (user === false) {
  //   return <>Auth loading...</>;
  // }
  return (
    <div className="w-full lg:grid lg:grid-cols-2  min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" onClick={()=>handleSignIn()}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
export default SignIn