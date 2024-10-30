'use client';

import React, { useEffect, useState } from 'react';
import { LandingMarquee } from '../../../components/landing/LandingMarquee';
import NextImage from 'next/image';
import images from '../../../config/images';
import { getLatestDownloads } from '../../../config/firestore';

function RecentPFP() {
  const [latestDownloads, setLatestDownloads] = useState<any[]>([]);

  useEffect(() => {
    getLatestDownloads(10).then(setLatestDownloads);
  }, []);

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
