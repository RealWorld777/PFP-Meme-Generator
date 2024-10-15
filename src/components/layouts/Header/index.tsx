'use client';

import * as React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuIndicator } from '../../ui/navigation-menu';
import Image from 'next/image';

function Header() {
  return (
    <NavigationMenu className="min-w-full justify-between px-4 py-2 bg-[#0c2b2fb3] backdrop-blur">
      <Link href="/" className="flex items-center">
        <Image src="/favicon.ico" alt="PFP Generator Logo" width={42} height={42} className="mr-2" />
        <span className="text-2xl bricolageSemibold text-white">PFP GENERATOR</span>
      </Link>

      <NavigationMenuList className="flex justify-between items-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="text-xl workSans px-4">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/generator" className="text-xl workSans px-4">
              Generator
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/faq" className="text-xl workSans px-4">
              FAQ
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuIndicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
        <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
      </NavigationMenuIndicator>
    </NavigationMenu>
  );
}

export default Header;
