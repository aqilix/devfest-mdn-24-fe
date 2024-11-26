"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { NavMenuCollapsibleItem } from "./nav-menu-collapsible-item"
import { NavMenuSingleItem } from "./nav-menu-single-item"

export function NavMenu({
  items,
}: Readonly<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          item?.items?.length ? (
            <NavMenuCollapsibleItem key={item.title} item={item} />
          ) : (
            <NavMenuSingleItem key={item.title} item={item} />
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
