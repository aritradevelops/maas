import prisma from "@/lib/db";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function getUser() {
  const hanko = cookies().get("hanko")?.value;
  const JWKS = createRemoteJWKSet(
    new URL(`${process.env.NEXT_PUBLIC_HANKO_API_URL}/.well-known/jwks.json`)
  );

  try {
    const { payload } = await jwtVerify<{ email: { address: string } }>(hanko ?? "", JWKS);
    let user = await prisma.user.findUnique({
      where: { email: payload.email.address },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: payload.sub,
          email: payload.email.address
        }
      })
    }
    return user
  } catch (error) {
    console.error(error);
    return null;
  }
}