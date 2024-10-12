'use client';

import { ReactNode, useState } from 'react';
import Header from '../components/layouts/Header';
import Background from '../components/layouts/Background';

import './globals.css';

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
        <Background>
          <main>{children}</main>
        </Background>
      </body>
    </html>
  );
};

export default Layout;
