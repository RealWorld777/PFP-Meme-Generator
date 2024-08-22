import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
              <li className='hidden sm:block workSans'>
                <Link href="/">Home</Link>
              </li>
              <li className='hidden sm:block workSans'>
                <Link href="/about">About</Link>
              </li>
            </ul>
            <h2 className="hidden sm:block text-xl workSans text-black">
              <Link href="/about">About</Link>
            </h2>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;