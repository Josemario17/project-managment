import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <SidebarProvider className="flex justify-around h-screen w-screen gap-20">
        <AppSidebar />
        <main className="w-auto my-20">
          {children}
        </main>
      </SidebarProvider>
  )
}
