import { getUser } from "@/actions/session";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import CreateApiKey from "./components/create-api-key";
import RenderSecret from "@/components/render-secret";
import { ModeToggle } from "@/components/mode-toggle";
import Wrapper from "../components/wrapper";

export default async function Page() {
  const user = await getUser();
  if (!user) redirect('/authenticate')
  return (
    <Wrapper title="Api Key" desc="Manage your api key" className="p-4">
      {!user.keys.length && <div className="w-full h-30">
        <Card className="p-6 text-center">
          <CardHeader>No API keys found</CardHeader>
          <CardContent>Create a new API key to start managing your data.</CardContent>
          <CreateApiKey user={user} />
        </Card>
      </div>}
      {!!user.keys.length && (
        <div className="flex w-full h-30 justify-center items-center flex-col gap-5">
          <RenderSecret secret={user.keys[0]} title="API Key" description="Your secret API key. You will be using this key to interact with our apis." secretName="API key" />
          <RenderSecret secret={user.id} title="Owner Id" description="Owner Id of the meows you will create. This will help you filter meows that you have created." secretName="Owner Id" />
        </div>)}
    </Wrapper>
  )
}
