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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLazyGetMeQuery } from "@/services/api/modules/users"
import { AuthPostLoginReq } from "@/services/api/modules/auth/types"
import { useLazyPostLoginQuery } from "@/services/api/modules/auth"
import { changeUser } from "@/redux/user"

const formSchema: z.ZodType<AuthPostLoginReq> = z.object({
  username: z.string().email(),
  password: z.string().min(6).max(50),
})

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserSigninForm({ className, ...props }: Readonly<UserAuthFormProps>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const [postLogin, { isLoading: loginIsLoading }] = useLazyPostLoginQuery()
  const [getMe, { isLoading: meIsLoading }] = useLazyGetMeQuery()

  const onSubmit = useCallback((req: z.infer<typeof formSchema>) => {
    postLogin(req)
      .unwrap()
      .then((res) => {
        if (res.access_token) {
          dispatch(changeUser({
            accessToken: res.access_token,
            tokenType: res.token_type
          }))
          getMe(null).unwrap()
            .then((res) => {
              if (res.is_active) {
                router.replace("/playground")
              } else {
                toast({
                  variant: "destructive",
                  title: "Uh oh! The user is not active.",
                  description: "Please call your administrator.",
                })
              }
            })
            .catch((err) => {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: err?.message || "There was a problem with your request.",
              })
            })
        } else {
          // alert('Login failed 2')
        }
      })
      .catch((err) => {
        // alert(err?.message || 'Login failed 3')
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err?.message || "There was a problem with your request.",
        })
      })
  }, [dispatch, getMe, postLogin, router, toast])

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
                        type="username"
                        placeholder="m@example.com"
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
            <Button onClick={() => {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              })
            }} variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
