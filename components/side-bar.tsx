"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  const menuItems = [
    { href: '/home', label: 'Home' },
    { href: '/movies', label: 'Movies' },
    { href: '/tv-shows', label: 'TV Shows' },
    { href: '/genres', label: 'Genres' },
    { href: '/country', label: 'Country' },
    { href: '/top-contents', label: 'Top Contents' },
    { href: '/persons', label: 'People' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 border-0">
          <Menu className="h-[2.2rem] w-[2.2rem] dark:text-cyan-900 text-cyan-900 scale-150" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="px-4 mt-4 bg-background">
        <p className="text-2xl font-bold p-4">Menu</p>
        <Separator />
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.href}>
              <p className="text-xl">{item.label}</p> 
            </Link>
          </DropdownMenuItem>
        ))}
        <Separator />
        <div className="my-4">
          <div className="flex w-full justify-center gap-4">
            <ModeToggle />
            <Link href={`/search`}>
              <Button variant="ghost" size='icon' className="border" >
                <Search className="text-cyan-950 scale-120"/>
              </Button>
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sidebar;
