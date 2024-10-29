'use client';

import * as React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuIndicator } from '../../ui/navigation-menu';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <NavigationMenu className="min-w-full px-4 py-2 bg-[#0c2b2fb3] backdrop-blur flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <Image src="/favicon.ico" alt="PFP Generator Logo" width={42} height={42} className="mr-2" />
        <span className="text-2xl bricolageSemibold text-white">PFP GENERATOR</span>
      </Link>

      <NavigationMenuList className="hidden md:flex gap-2 justify-around items-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="text-xl workSans">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/generator" className="text-xl workSans">
              Generator
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/faq" className="text-xl workSans">
              FAQ
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/disclaimer" className="text-xl workSans">
              Disclaimer
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <button className="md:hidden text-2xl text-white" onClick={toggleMobileMenu} aria-label="Toggle Menu">
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-[#0c2b2fb3] backdrop-blur-md rounded-md shadow-lg w-48 flex flex-col">
          <NavigationMenuList className="flex flex-col">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="px-4 py-2 text-xl workSans hover:bg-[#ffffff1a]">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/generator" className="px-4 py-2 text-xl workSans hover:bg-[#ffffff1a]">
                  Generator
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/faq" className="px-4 py-2 text-xl workSans hover:bg-[#ffffff1a]">
                  FAQ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/disclaimer" className="px-4 py-2 text-xl workSans hover:bg-[#ffffff1a]">
                  Disclaimer
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      )}

      <NavigationMenuIndicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
        <div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
      </NavigationMenuIndicator>
    </NavigationMenu>
  );
}

export default Header;
