import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import WalletConnectButton from "./wallet-connect-button";
import { Button } from "@/components/ui/button";
import { Rocket, LogOut, LogIn, Home, Coins, PiggyBank, Gift, LayoutDashboard, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import img from "@/assets/logo.png";

 const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Buy & Stake", path: "/buy", icon: Coins },
  { name: "Rewards", path: "/rewards", icon: Gift },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Add scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 px-4 md:px-0",
      scrolled 
        ? "bg-[#1E293B]/90 backdrop-blur-md border-b border-gray-700/50 shadow-lg" 
        : "bg-[#1E293B] border-b border-gray-700"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center group cursor-pointer"
              onClick={() => setLocation("/")}
            >
              <img 
                src={img}
                alt="Orbitex" 
                className="h-20 w-20 md:h-28 md:w-28 object-contain p-1 hover:scale-105 transition-transform duration-200" 
              />
              <span className="ml-2 md:ml-3 text-xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary font-inter tracking-[0.15em] whitespace-nowrap hover:scale-105 transition-all duration-300 uppercase" style={{ textShadow: '0 2px 8px rgba(79, 70, 229, 0.45)' }}>ORBITEX</span>
            </div>

            <div className="hidden lg:ml-12 lg:flex lg:space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className={cn(
                    "px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium transition-all duration-200 cursor-pointer",
                    location === item.path
                      ? "text-white bg-primary/10 shadow-sm"
                      : "text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                  )}
                  onClick={() => setLocation(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </div>
              ))}
            </div>

            {/* Dropdown for medium screens */}
            <div className="hidden md:block lg:hidden ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="inline-flex items-center text-[#94A3B8] hover:text-white"
                  >
                    Navigation <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1E293B] border border-gray-700 shadow-xl shadow-black/20 rounded-lg min-w-[220px]">
                  {navItems.map((item) => (
                    <DropdownMenuItem 
                      key={item.path} 
                      className={cn(
                        "flex items-center py-2.5 px-3 cursor-pointer",
                        location === item.path
                          ? "text-white bg-primary/10"
                          : "text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                      )}
                      onClick={() => setLocation(item.path)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <WalletConnectButton />
            </div>

            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                onClick={() => setLocation("/auth")}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-l border-gray-700">
                  <div className="mt-6 flex justify-center">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center mt-4 mb-8">
                    <p className="text-xl font-bold text-white">ORBITEX</p>
                    <p className="text-sm text-[#94A3B8]">Crypto Investment Platform</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <div
                        key={item.path}
                        className={cn(
                          "flex items-center text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                          location === item.path
                            ? "text-white bg-primary/10 shadow-sm"
                            : "text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                        )}
                        onClick={() => {
                          setLocation(item.path);
                          setIsOpen(false);
                        }}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </div>
                    ))}

                    {/* Mobile wallet connect and auth buttons */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="mb-4">
                        <WalletConnectButton />
                      </div>
                      {user ? (
                        <button
                          className="w-full flex items-center justify-center text-base font-medium px-4 py-3 rounded-lg text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                          onClick={() => {
                            logoutMutation.mutate();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          Logout
                        </button>
                      ) : (
                        <button
                          className="w-full flex items-center justify-center text-base font-medium px-4 py-3 rounded-lg text-[#94A3B8] hover:text-white hover:bg-gray-800/50"
                          onClick={() => {
                            setLocation('/auth');
                            setIsOpen(false);
                          }}
                        >
                          <LogIn className="h-5 w-5 mr-3" />
                          Login
                        </button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}