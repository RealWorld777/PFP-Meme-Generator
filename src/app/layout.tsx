'use client';

import { ReactNode, useState } from 'react';
import Header from '../components/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>PFP Generator</title>
      </head>
      <body className="">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
