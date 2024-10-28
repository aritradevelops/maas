'use server'

import prisma from "@/lib/db"
import resend from "@/lib/mailer"
import { userAuthSchema, verifyOtpSchema } from "@/schemas/authenticate"
import ms from 'ms'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"
export async function sendOtp({ email }: { email: string }) {
  const validation = userAuthSchema.safeParse({ email })
  if (!validation.success) {
    throw new Error("Invalid email address")
  }
  let user = await prisma.user.findUnique({ where: { email: email } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: email,
        otp: Math.floor(100000 + Math.random() * 900000),
        otp_expiry: new Date(Date.now() + ms('5m'))
      },
    })
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        otp: Math.floor(100000 + Math.random() * 900000),
        otp_expiry: new Date(Date.now() + ms('5m'))
      }
    })
  }
  const { data: resendData, error } = await resend.emails.send({
    from: 'MaaS <admin@swiftgeek.dev>',
    to: [user.email],
    subject: `Here\'s your PIN ${user.otp}`,
    text: `
    Enter this 6 digit code to authenticate yourself with MaaS.
    Code: ${user.otp}.
    The code is only valid for 5 minutes.
    `
  });
  if (error) {
    throw new Error(error.message)
  }
  return {
    resendId: resendData?.id
  }
}

export async function verifyOtp({ email, otp }: { email: string, otp: number }) {
  const validation = verifyOtpSchema.safeParse({ email, otp })
  if (!validation.success) {
    const flatten = validation.error.flatten()
    throw new Error(flatten.fieldErrors.otp?.[0])
  }
  const user = await prisma.user.findUnique({
    where: {
      email: validation.data.email,
      otp: validation.data.otp,
      otp_expiry: { gt: new Date() }
    }
  })
  if (!user) {
    throw new Error("Invalid OTP ")
  }
  const token = jwt.sign({ email: validation.data.email }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  })
  cookies().set('access_token', token, { expires: new Date(Date.now() + ms('1d')) })
  return { success: true }
}
export async function resendOtp({ email }: { email: string }) {
  const user = await prisma.user.update({
    where: { email: email },
    data: {
      otp: Math.floor(100000 + Math.random() * 900000),
      otp_expiry: new Date(Date.now() + ms('5m'))
    }
  })
  if (!user) {
    throw new Error("User not found")
  }
  const { data: resendData, error } = await resend.emails.send({
    from: 'MaaS <admin@swiftgeek.dev>',
    to: [user.email],
    subject: `Here\'s your PIN ${user.otp}`,
    text: `
    Enter this 6 digit code to authenticate yourself with MaaS.
    Code: ${user.otp}.
    The code is only valid for 5 minutes.
    `
  });
  if (error) {
    throw new Error(error.message)
  }
  return {
    resendId: resendData?.id
  }
}