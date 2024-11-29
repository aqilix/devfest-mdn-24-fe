"use client"

import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Loader } from "lucide-react"
import { z } from "zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "@/hooks/use-session"
import { usePostLoginMutation, usePostRegisterMutation } from "@/services/api/modules/auth"
import { SigninFormSchema, SignupFormSchema } from "@/lib/form-definitions"
import { useLazyGetMeQuery } from "@/services/api/modules/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { changeUser } from "@/redux/user"
import { cn } from "@/lib/utils"

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserSignUpForm({ className, ...props }: Readonly<UserAuthFormProps>) {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: {
        password: '',
        confirm: '',
      },
    },
  })

  const dispatch = useDispatch()

  const router = useRouter()

  const { toast } = useToast()

  const { signin: sessionSignin } = useSession();

  const [postRegister, { isLoading: registerIsLoading }] = usePostRegisterMutation()
  const [postLogin, { isLoading: loginIsLoading }] = usePostLoginMutation()
  const [getMe, { isLoading: meIsLoading }] = useLazyGetMeQuery()

  const [openRegisterSuccess, setOpenRegisterSuccess] = React.useState(false);

  const onSubmit = useCallback(async (req: z.infer<typeof SignupFormSchema>) => {
    postRegister({ email: req.email, password: req.password.password })
      .unwrap()
      .then(async (registerRes) => {
        if (registerRes.is_active) {
          setOpenRegisterSuccess(true)
        } else {
          return Promise.reject(new Error('Uh oh! The user is not active.'))
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err?.message || "There was a problem with your request.",
        })
      })
  }, [postRegister, toast])

  const onLogin = useCallback(async (req: z.infer<typeof SigninFormSchema>) => {
    postLogin(req)
      .unwrap()
      .then(async (loginRes) => {
        if (loginRes?.access_token) {
          dispatch(changeUser({
            accessToken: loginRes?.access_token,
            tokenType: loginRes?.token_type
          }))
        } else {
          return Promise.reject(new Error('Something happen. Failed to sign up.'))
        }
        return Promise.resolve(loginRes)
      })
      .then(async () => {
        return getMe(null).unwrap()
          .then((meRes) => {
            if (meRes.is_active) {
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
          <div className="grid gap-2">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
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
                name="password.password"
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
                        placeholder="Don't tell anyone!"
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
                name="password.confirm"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        id="confirm_password"
                        type="password"
                        required
                        autoComplete="off"
                        placeholder="Repeat your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={registerIsLoading}>
              {registerIsLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={openRegisterSuccess} onOpenChange={setOpenRegisterSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Success</AlertDialogTitle>
            <AlertDialogDescription>
              Your account has been created successfully. Click button below to continue to login.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={(loginIsLoading || meIsLoading)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              onLogin({
                username: form.getValues().email,
                password: form.getValues().password.password,
              })
            }}>
              {(loginIsLoading || meIsLoading) && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  )
}
