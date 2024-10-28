import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="rounded-sm hover:bg-sidebar-accent text-sidebar-accent-foreground p-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="ml-2 font-bold text-xl flex items-center text-center gap-x-2"
          >
            <Image
              src="/logo.png"
              height={40}
              width={40}
              alt="logo"
            />
            MaaS
          </a>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}