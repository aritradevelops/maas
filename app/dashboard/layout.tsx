"use client"
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail
} from "@/components/ui/sidebar"
import React from "react"
import Content from "./components/content"
import Footer from "./components/footer"
import Header from "./components/header"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <Header />
        <Content />
        <SidebarRail />
        <Footer />
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
