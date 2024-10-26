'use server';
import prisma from "@/lib/db";
import { User } from "@prisma/client";


export async function createApiKey(data: Pick<User, 'email'>) {
  const user = await prisma.user.update({
    where: { email: data.email },
    data: {
      keys: ['key']
    }
  })
  if (!user) throw new Error(`User not found!`);
}