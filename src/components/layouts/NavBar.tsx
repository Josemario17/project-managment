import { Bell, MoreHorizontal, Users } from "lucide-react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { NavLink } from "react-router-dom";

const Menubar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4">
        <NavigationMenuItem>
          <NavLink 
            to="/Dashboard" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md transition-colors ${
                isActive 
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
              `px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? "bg-blue-950 text-white" 
                  : "hover:bg-blue-900/50"
              }`
            }
          >
            Projectos
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? "bg-blue-950 text-white" 
                  : "hover:bg-blue-900/50"
              }`
            }
          >
            Minhas Tarefas
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};


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
        <div className="flex items-center space-x-2">
          <div className="bg-blue-950 flex px-3 py-1.5 rounded-md items-center justify-center text-white border-blue-950">
            <Users className="h-4 w-4 mr-2" />
            José Dos Santos
          </div>
          <Button variant="outline" className="bg-blue-950 hover:bg-blue-900/50 text-white border-blue-950 px-2">
            <Bell></Bell>
          </Button>
          <Button variant="outline" className="bg-blue-950 hover:bg-blue-900/50 text-white border-blue-950 px-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>
    </div>
  )
}
