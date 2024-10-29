'use client';

import { ReactNode, useState } from 'react';
import Header from '../components/layouts/Header';
import Background from '../components/layouts/Background';
import Footer from '../components/layouts/Footer';

import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>CFB Generator</title>
      </head>
      <body className="text-white">
        <nav className="relative w-full">
          <Header />
        </nav>
        <Background>
          <main>{children}</main>
          {/* <Footer /> */}
        </Background>
      </body>
    </html>
  );
};

export default Layout;
