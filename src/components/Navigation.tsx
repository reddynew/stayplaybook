
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, User, Home, Hotel, Palmtree } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar Navigation */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-r transform transition-transform duration-200 ease-in-out z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col space-y-2 w-full px-4">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-5 w-5" />
                  <span>StayPlay</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/hotels")}
                >
                  <Hotel className="h-5 w-5" />
                  <span>Hotels</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/parks")}
                >
                  <Palmtree className="h-5 w-5" />
                  <span>Amusement Parks</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="mt-auto p-4 border-t">
            {!isLoggedIn ? (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setShowAuthModal(true)}
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>Profile</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};
