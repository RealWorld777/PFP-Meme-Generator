import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import burgerBtn from '../../assets/more.png';

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <>
      <nav className="relative h-[64px]">
        <div className="w-[100%] absolute flex justify-between p-4 bg-[#0c2b2fb3]">
          <h2 className="text-2xl bricolageSemibold text-white">MEME GENERATOR</h2>
          <div className="flex gap-2">
            <h2 className="hidden sm:block text-xl workSans">
              <Link href="/">Home</Link>
            </h2>
            <h2 className="hidden sm:block text-xl workSans">
              <Link href="/generator">Generator</Link>
            </h2>
            <h2 className="hidden sm:block text-xl workSans">
              <Link href="/about">About</Link>
            </h2>
            <h2 className="hidden sm:block text-xl workSans">
              <Link href="/faq">FAQ</Link>
            </h2>
          </div>
          <div
            className="w-5 h-5 block sm:hidden cursor-pointer"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <Image alt="burgerBtn" src={burgerBtn} />
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="sm:hidden absolute bg-[#E1E1E1] w-[100vw] top-[66px] p-6 flex flex-col items-center border-b-2 workSans border-black">
          <Link href="/" className="text-black text-xl mb-5">
            Home
          </Link>

          <Link href="/generator" className="text-black text-xl mb-5">
            Generator
          </Link>

          <Link href="/about" className="text-black text-xl mb-5">
            About
          </Link>

          <Link href="/faq" className="text-black text-xl">
            FAQ
          </Link>
        </div>
      )}
    </>
  );
}

export default Header;
