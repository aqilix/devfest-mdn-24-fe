"use client"

import React, { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { useForm } from 'react-hook-form'
import { Loader } from "lucide-react"
import { z } from "zod"

import { useRouter } from "next/navigation"
import Link from "next/link"

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { SigninFormSchema } from "@/lib/form-definitions"
import { useSession } from "@/hooks/use-session"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLazyGetMeQuery } from "@/services/api/modules/users"
import { usePostLoginMutation } from "@/services/api/modules/auth"
import { changeUser } from "@/redux/user"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserSigninForm({ className, ...props }: Readonly<UserAuthFormProps>) {
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      username: '',
      password: '',
      grant_type: 'password',
      client_secret: process.env.CLIENT_SECRET,
    },
  })

  const dispatch = useDispatch()

  const router = useRouter()

  const { toast } = useToast()

  const { signin: sessionSignin } = useSession();

  const [postLogin, { isLoading: loginIsLoading }] = usePostLoginMutation()
  const [getMe, { isLoading: meIsLoading }] = useLazyGetMeQuery()

  const onSubmit = useCallback(async (req: z.infer<typeof SigninFormSchema>) => {
    postLogin(req)
      .unwrap()
      .then(async (loginRes) => {
        if (loginRes?.access_token) {
          dispatch(changeUser({
            accessToken: loginRes?.access_token,
            tokenType: loginRes?.token_type
          }))
        } else {
          return Promise.reject(new Error('Something happen. Failed to sign in.'))
        }
        return Promise.resolve(loginRes)
      })
      .then(async () => {
        return getMe(null).unwrap()
          .then((meRes) => {
            if (meRes.is_active) {
              dispatch(changeUser({ me: meRes }))
              sessionSignin(meRes.email, {
                optimisticData: {
                  isLoggedIn: true,
                  username: meRes.email,
                },
              });
              router.replace("/playground")
            } else {
              toast({
                variant: "destructive",
                title: "Uh oh! The user is not active.",
                description: "Please call your administrator.",
              })
            }
          })
      })
      .catch((err) => {
        // alert(err?.message || 'Login failed 3')
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err?.message || "There was a problem with your request.",
        })
      })
  }, [dispatch, getMe, postLogin, router, sessionSignin, toast])

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="email"
                        placeholder="name@example.com"
                        required
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        autoComplete="off"
                        placeholder="psst.. keep it secret!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={(loginIsLoading || meIsLoading)}>
              {(loginIsLoading || meIsLoading) && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
            <div className="flex items-center">
              <Link href="#" className="mx-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            {/* <Button onClick={() => {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              })
            }} variant="outline" className="w-full" type="button">
              Login with Google
            </Button> */}
          </div>
        </form>
      </Form>
    </div>
  )
}
