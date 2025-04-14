import { Bell, MoreHorizontal, Users } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useUserStore } from "../../store/UserStore";
import Cookies from "js-cookie";
import NotificationPanel from "../Common/NotificationPanel";

const Menubar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4">
        <NavigationMenuItem>
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive
                ? "bg-blue-950 text-white"
                : " hover:bg-blue-900/50"
              }`
            }
          >
            Dashboard
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-colors ${isActive
                ? "bg-blue-950 text-white"
                : "hover:bg-blue-900/50"
              }`
            }
          >
            Projectos
          </NavLink>
        </NavigationMenuItem>
     </NavigationMenuList>
    </NavigationMenu>
  );
};

const UserMenu = () => {
  const navigate = useNavigate()
  const { name } = useUserStore().userData || { name: "" };
  function deletePersistedData() {
    Cookies.remove("user_data")
  }

  function handleLogout() {
    deletePersistedData();
    navigate("/SignIn")
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-blue-950 flex px-3 py-1.5 rounded-md items-center justify-center text-white border-blue-950">
        <Users className="h-4 w-4 mr-2" />
        {name}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-blue-950 hover:bg-blue-900/50 text-white border-blue-950 p-2.5 rounded-md">
          <Bell className="h-4 w-4"></Bell>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 mb-0 shadow-none">
          <NotificationPanel></NotificationPanel>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-blue-950 hover:bg-blue-900/50 text-white border-blue-950 p-2.5 rounded-md">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-gray-300">
          <DropdownMenuItem onClick={handleLogout} className="focus:bg-white focus:text-blue-950">Terminar Sessão</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


export default function NavBar() {
  return (
    <div>
      <header className="bg-white px-24 py-6 flex items-center justify-around border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="font-bold text-xl">Gestão de Projectos</span>
          </div>
        </div>
        <Menubar />
        <UserMenu />

      </header>
    </div>
  )
}
