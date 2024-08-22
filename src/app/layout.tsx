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
      <body className='relative'>
        
        <nav className="w-[100%] absolute flex justify-between p-4 bg-[#E1E1E1]">
          <h2 className="text-2xl bricolageSemibold text-black">
            MEME GENERATOR
          </h2>
          <ul className='flex '>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            
          </ul>
          <h2 className="text-xl workSans text-black">
            about
          </h2>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;