import { ClapperboardIcon, HomeIcon, TrophyIcon, TvMinimalIcon, User2 } from "lucide-react";
import Sidebar from "./side-bar";  // Ensure Sidebar does not render a button
import { Button } from "./ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Header = () => {
  const navItems = [
    { href: "/", icon: <div className="bg-logo bg-cover scale-150 w-16 h-16" />, label: "Root" },
    { href: "/home", icon: <HomeIcon className="text-cyan-950 dark:text-cyan-800 scale-150" />, label: "Home" },
    { href: "/movies", icon: <ClapperboardIcon className="text-cyan-950 dark:text-cyan-800 scale-150" />, label: "Movies" },
    { href: "/tv-shows", icon: <TvMinimalIcon className="text-cyan-950 dark:text-cyan-800 scale-150" />, label: "TV Shows" },
    { href: "/top-contents", icon: <TrophyIcon className="text-cyan-950 dark:text-cyan-800 scale-150" />, label: "Top Contents" },
    { href: "/persons", icon: <User2 className="text-cyan-950 dark:text-cyan-800 scale-150" />, label: "People" },
  ];

  return (
    <header className="flex py-6 justify-between items-center px-16 shadow-lg gap-4 dark:bg-primary-foreground bg-primary-foreground shadow-muted-foreground">
      <TooltipProvider>
        {navItems.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 scale-100">
                <Link href={item.href}>
                  {item.icon}
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        <div className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 scale-100">
          <Sidebar />  
        </div>
      </TooltipProvider>
    </header>
  );
};

export default Header;
