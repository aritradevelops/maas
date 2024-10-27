'use server';
import prisma from "@/lib/db";
import { unkey, UNKEY_API_ID, UNKEY_API_PREFIX } from "@/lib/unkey";
import { User } from "@prisma/client";
import ms from "ms";


export async function createApiKey(data: Pick<User, 'email'>) {
  let user = await prisma.user.findUnique({
    where: { email: data.email },
  })
  if (!user) throw new Error(`User not found!`);
  const { result, error } = await unkey.keys.create({
    apiId: UNKEY_API_ID,
    prefix: UNKEY_API_PREFIX,
    ownerId: user.id,
    meta: {
      hello: "world"
    },
    roles: ['cat_user']
  })
  if (error) throw new Error('Api key could not be created!')
  await prisma.user.update({
    where: { id: user.id },
    data: {
      keys: [result.key]
    }
  })
}