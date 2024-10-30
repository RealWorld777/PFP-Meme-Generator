'use client';

import React from 'react';
import { LandingMarquee } from '../../../components/landing/LandingMarquee';
import NextImage from 'next/image';
import images from '../../../config/images';
import { getLatestDownloads } from '../../../config/firestore';

async function RecentPFP() {
  const latestDownloads = await getLatestDownloads(10);

  return (
    <LandingMarquee variant="secondary" animationDirection="left" animationDurationInSeconds={25}>
      {latestDownloads.length
        ? latestDownloads.map((download, index) => {
            return <NextImage key={index} src={download.link} alt="CFB" className="h-48 w-auto" />;
          })
        : Object.values(images).map((image, index) => {
            return <NextImage key={index} src={image} alt="CFB" className="h-48 w-auto" />;
          })}
    </LandingMarquee>
  );
}

export default RecentPFP;
