"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  Settings2,
} from "lucide-react"
import Image from "next/image"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import DevFestLogo from "@/../public/dev-fest-logo.png"

import { NavMenu } from "./nav-menu"

// This is sample data.
const data = {
  user: {
    name: "Dolly Aswin",
    email: "info@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/107206?v=4",
  },
  teams: [
    {
      name: "DevFest Medan 2024",
      logo: <Image src={DevFestLogo} alt="DevFest 2024" width={50} height={50} />,
      plan: "Google for Developers",
    },
  ],
  menu: [
    {
      title: "Playground",
      url: "#",
      icon: Frame,
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
