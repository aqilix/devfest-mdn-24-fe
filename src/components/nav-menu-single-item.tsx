"use client"

import {
  type LucideIcon,
} from "lucide-react"

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMenuSingleItem({
  item,
}: Readonly<{
  item: {
    title: string
    url: string
    icon?: LucideIcon
  }
}>) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          {item?.icon && <item.icon />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
