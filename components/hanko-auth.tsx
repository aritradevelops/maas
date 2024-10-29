"use client";
import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function HankoAuth() {
  const router = useRouter();
  const { resolvedTheme } = useTheme()
  const [hanko, setHanko] = useState<Hanko>(new Hanko(hankoApi));

  const redirectAfterLogin = useCallback(() => {
    router.replace("/dashboard/api-key");
  }, [router]);

  useEffect(
    () =>
      hanko?.onSessionCreated(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi).catch(console.error);
  }, []);

  return <hanko-auth class={cn("hanko-custom", resolvedTheme === 'dark' ? 'dark' : '')} />;
}
