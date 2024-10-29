'use client'
import { intercept } from "@/actions/swagger";
import Wrapper from "@/app/dashboard/components/wrapper";
import { useTheme } from "next-themes";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"
import "/public/swagger-dark.css"
import { cn } from "@/lib/utils";
export default function Documentation() {
  const { resolvedTheme } = useTheme()
  return (
    <Wrapper title="Documentation" desc="Learn how to use the API." className={cn(resolvedTheme === 'dark' ? 'dark' : '')}>
      <SwaggerUI
        url="/swagger.json"
        requestInterceptor={intercept}
      />
    </Wrapper>
  );
}
