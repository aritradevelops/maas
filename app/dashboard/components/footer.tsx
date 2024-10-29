import HankoLogOutButton from "@/components/hanko-logout-button";
import HankoProfile from "@/components/hanko-profile";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react";

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