'use client';

import React, { useEffect, useState } from 'react';
import { LandingMarquee } from '../../../components/landing/LandingMarquee';
import NextImage from 'next/image';
import images from '../../../config/images';
import { getLatestDownloads } from '../../../config/firestore';

function RecentPFP() {
  const [latestDownloads, setLatestDownloads] = useState<any[]>([]);

  useEffect(() => {
    getLatestDownloads(6).then((res) => {
      setLatestDownloads(res);
    });
  }, []);

  return (
    <LandingMarquee variant="secondary" animationDirection="left" animationDurationInSeconds={25}>
      {latestDownloads.map((download, index) => {
        if (download.link) return <NextImage key={index} src={download.link} width={200} height={200} alt="CFB" className="h-48 w-auto" />;
        return null;
      })}
    </LandingMarquee>
  );
}

export default RecentPFP;
