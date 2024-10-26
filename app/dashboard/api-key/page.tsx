import { getUser } from "@/actions/session";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import CreateApiKey from "./components/create-api-key";

export default async function Page() {
  const user = await getUser();
  if (!user) redirect('/authenticate')
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Api Key
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Manage your api key</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {!user.keys.length && <div className="w-full h-30">
          <Card className="p-6 text-center">
            <CardHeader>No API keys found</CardHeader>
            <CardContent>Create a new API key to start managing your data.</CardContent>
            <CreateApiKey user={user} />
          </Card>
        </div>}
        {!!user.keys.length && (
          <div className="w-full h-30">
            <Card className="p-6 text-center">
              <CardHeader>Your Api Key</CardHeader>
              <CardContent>
                Api Key: {" "}{user.keys[0]}
              </CardContent>
            </Card>
          </div>)}
      </div>
    </>
  )
}
