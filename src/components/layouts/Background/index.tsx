import Image from 'next/image';
import React from 'react';
import TopRightSvg from '../../../assets/svg/top-right';
import BottomLeftSvg from '../../../assets/svg/bottom-left';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <>
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <TopRightSvg />
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <BottomLeftSvg />
      </div>
      {children}
    </>
  );
};

export default Background;
