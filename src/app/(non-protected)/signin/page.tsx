import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { UserSigninForm } from "./signin-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function SigninPage() {
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2 text-center text-sm absolute right-4 top-4 md:right-8 md:top-8">
        <span>Don&apos;t have an account?{" "}</span>
        <Link href="/signup" className={cn("font-bold underline")}>
          Sign up
        </Link>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign In
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below
            </p>
          </div>

          <UserSigninForm />
        </div>
      </div>
    </>
  )
}