import { z } from 'zod'

import { AuthPostLoginReq, AuthPostRegisterReq } from '@/services/api/modules/auth/types'

export const SigninFormSchema: z.ZodType<AuthPostLoginReq> = z.object({
  username: z.string().email(),
  password: z.string().min(8, { message: 'Be at least 8 characters long' }),
})

export const SignupFormSchema: z.ZodType<Omit<AuthPostRegisterReq, 'password'> & { password: { password: string; confirm: string } }> = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
  .object({
    password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/\d/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  }),
})
