'use client';

import React from 'react';
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
          return <Image src={image} alt="CFB" className="h-48 w-auto" />;
        })}
      </LandingMarquee>

      <LandingProductFeature
        title="Smart Task Prioritization"
        descriptionComponent={
          <>
            <p>
              Our AI-powered task prioritization feature automatically organizes your to-do list based on deadlines, importance, and your work patterns, ensuring you focus on the most critical tasks
              first.
            </p>

            <Button className="mt-8" variant="secondary" asChild>
              <Link href="/generator">Try now for free</Link>
            </Button>

            <p className="">First month is on us.</p>
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
