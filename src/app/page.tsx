'use client';

import React, { useEffect, useState } from 'react';
import { LandingPrimaryImageCtaSection } from '../components/landing/LandingPrimaryCta';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import { LandingMarquee } from '../components/landing/LandingMarquee';
import images, { homeImg, homeImg2 } from '../config/images';
import Image from 'next/image';

import { LandingProductHuntAward } from '../components/landing/LandingProductHuntAward';
import { LandingDiscount } from '../components/landing/LandingDiscount';
import { LandingSocialProof } from '../components/landing/LandingSocialProof';
import { LandingProductFeature } from '../components/landing/LandingProductFeature';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getDownloadsCount } from '../config/firestore';

const avatarItems = [
  {
    imageSrc: `https://i.pravatar.cc/${Math.floor(Math.random() * 1000)}`,
    name: 'John Doe',
  },
  {
    imageSrc: `https://i.pravatar.cc/${Math.floor(Math.random() * 1000)}`,
    name: 'Jane Doe',
  },
  {
    imageSrc: `https://i.pravatar.cc/${Math.floor(Math.random() * 1000)}`,
    name: 'Alice Doe',
  },
];

function Home() {
  const downloadCnt = getDownloadsCount();

  return (
    <>
      <LandingPrimaryImageCtaSection
        title=""
        titleComponent={<h1 className="text-6xl">PFP Generator</h1>}
        description=""
        descriptionComponent={<p className="text-4xl">Generate your own PFP with CFB</p>}
        imageSrc={homeImg.src}
        withBackground
        withBackgroundGlow
        imageAlt="CFB"
        imageShadow="hard"
        minHeight={350}
        backgroundGlowVariant="secondary"
        leadingComponent={<LandingProductHuntAward grayscale={false} />}
        className="bricolageSemibold text-xl py-0 lg:py-0 px-16"
      >
        <Button size="xl">
          <Link href="#">Read more</Link>
        </Button>
        <Button size="xl" asChild variant="outlinePrimary">
          <Link href="/generator">Generate Now</Link>
        </Button>

        {/* <LandingDiscount discountValueText="$350 off" discountDescriptionText="for the first 10 customers (2 left)" /> */}

        <LandingSocialProof className="w-full mt-12" showRating numberOfUsers={100000} suffixText="happy users" avatarItems={avatarItems} size="medium" />
      </LandingPrimaryImageCtaSection>
      <LandingMarquee withBackground variant="secondary">
        {Object.values(images).map((image, index) => {
          return <Image key={index} src={image} alt="CFB" className="h-48 w-auto" />;
        })}
      </LandingMarquee>

      <div className="text-lg">Downloaded Images : {downloadCnt}</div>
      <LandingProductFeature
        title="PFP Generator"
        descriptionComponent={
          <>
            <p className="text-xl">Our PFP Meme Generator allows you to create unique and personalized CFB profile images for your Discord, X, or other platforms.</p>

            <Button className="text-lg mt-8" variant="outline" asChild>
              <Link href="/generator">Generate Now</Link>
            </Button>
          </>
        }
        imageSrc={homeImg2.src}
        imageAlt="Craft Unique Solutions with Ease"
        imagePosition="left"
        imagePerspective="none"
        variant="secondary"
      />
    </>
  );
}

export default Home;
