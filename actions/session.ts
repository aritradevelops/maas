import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import prisma from "@/lib/db";
export async function getUser() {
  const token = cookies().get('access_token');
  if (!token) return null;
  const data = jwt.verify(token.value, process.env.JWT_SECRET!)
  if (!data) return null;
  // @ts-expect-error
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  return user;
}