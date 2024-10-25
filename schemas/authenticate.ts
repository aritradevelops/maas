import { z } from "zod"

export const userAuthSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})
export const verifyOtpSchema = z.object({
  email: z.string().email("Email address is not available"),
  otp: z.coerce.number() // Force it to be a number
    .int() // Make sure it's an integer
})