"use client";
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import burgerBtn from "./assets/more.png"
import Image from 'next/image';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        {/* Add any global metadata or styles here */}
        <title>My Next.js App</title>
      </head>
      <body className=''>
        <nav className='relative h-[64px] bg-[#E1E1E1]'>
          <div className="w-[100%] absolute flex justify-between p-4 bg-[#E1E1E1]">
            <h2 className="text-2xl bricolageSemibold text-black">
              MEME GENERATOR
            </h2>
            <ul className='flex relative right-[2%] gap-3 '>
              <li className='hidden sm:block workSans text-black'>
                <Link href="/">Home</Link>
              </li>
              <li className='hidden sm:block workSans text-black'>
                <Link href="/about">About</Link>
              </li>
            </ul>
            <h2 className="hidden sm:block text-xl workSans text-black">
              <Link href="/about">About</Link>
            </h2>
            <div className='w-5 h-5 block sm:hidden cursor-pointer' onClick={()=>{
              setMenuOpen(!menuOpen)
            }}>
              <Image alt="burgerBtn" src={burgerBtn} />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        {
          menuOpen &&

          <div className='sm:hidden absolute bg-[#E1E1E1] w-[100vw] top-[66px] p-6 flex flex-col items-center border-b-2 workSans border-black'>
            <Link href="/" className='text-black'>Home</Link>

            <Link href="/about" className='text-black'>About</Link>

          </div>
        }
      </body>
    </html>
  );
};

export default Layout;