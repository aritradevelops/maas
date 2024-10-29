"use client";

import { register } from "@teamhanko/hanko-elements";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function HankoProfile() {
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures that rendering only happens on the client
    register(hankoApi).catch(console.error)
  }, []);

  if (!isClient) return null; // Prevents server-client mismatch

  return (
    <div className="w-full h-full border border-secondary rounded-lg">
      <hanko-profile class={resolvedTheme === 'dark' ? 'dark' : ''} />
    </div>
  );
}
