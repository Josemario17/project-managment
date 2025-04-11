import { Home, GalleryVerticalEnd, Briefcase } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import { UserCard } from "../Common/Card/UserCard"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Projectos",
    url: "#",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Minhas Tarefas",
    url: "#",
    icon: Briefcase,
  },
]

export function AppSidebar() {
  return (
     <Sidebar className="w-[22rem] h-[35rem] m-20 bg-blue-950/15 p-12 rounded-lg border border-white/20 shadow-lg shadow-blue-950/20 ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl my-8 mt-2 mb-12">Gerenciamento <br /> de Projectos - GP</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <UserCard></UserCard>
    </Sidebar>
  )
}
