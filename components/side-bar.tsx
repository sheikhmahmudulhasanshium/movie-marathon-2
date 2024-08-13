"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { href: '/home', label: 'Home' },
    { href: '/movies', label: 'Movies' },
    { href: '/tv-shows', label: 'TV Shows' },
    { href: '/genres', label: 'Genres' },
    { href: '/country', label: 'Country' },
    { href: '/top-contents', label: 'Top Contents' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-[2.2rem] w-[2.2rem] text-primary dark:text-cyan-900 text-cyan-950" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.href}>
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sidebar;
