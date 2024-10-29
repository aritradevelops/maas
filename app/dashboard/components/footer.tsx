import HankoLogOutButton from "@/components/hanko-logout-button";
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export default function Footer() {

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <HankoLogOutButton />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}