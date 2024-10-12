'use client';

import React from 'react';
import { LandingPrimaryImageCtaSection } from '../components/landing/LandingPrimaryCta';
import { Button } from '../components/ui/button';
import titleSvg from '../assets/Frame5.svg';
import Link from 'next/link';
import { LandingMarquee } from '../components/landing/LandingMarquee';
import { ChromeIcon, FigmaIcon, GithubIcon, FramerIcon, TwitchIcon, TwitterIcon, GitlabIcon, InstagramIcon, SlackIcon } from 'lucide-react';
import images from '../config/images';
import Image from 'next/image';

import { LandingProductHuntAward } from '../components/landing/LandingProductHuntAward';
import { LandingDiscount } from '../components/landing/LandingDiscount';
import { LandingSocialProof } from '../components/landing/LandingSocialProof';

const avatarItems = [
  {
    imageSrc: 'https://picsum.photos/id/64/100/100',
    name: 'John Doe',
  },
  {
    imageSrc: 'https://picsum.photos/id/65/100/100',
    name: 'Jane Doe',
  },
  {
    imageSrc: 'https://picsum.photos/id/669/100/100',
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
        imageSrc={titleSvg}
        withBackground
        withBackgroundGlow
        imageAlt="CFB"
        imageShadow="hard"
        minHeight={350}
        backgroundGlowVariant="secondary"
        leadingComponent={<LandingProductHuntAward />}
        className="bricolageSemibold text-xl py-0 lg:py-0 px-4 lg:px-4"
      >
        <Button size="xl">
          <Link href="#">Read more</Link>
        </Button>
        <Button size="xl" asChild variant="outlinePrimary">
          <Link href="/generator">Generate Now</Link>
        </Button>

        {/* <LandingDiscount discountValueText="$350 off" discountDescriptionText="for the first 10 customers (2 left)" /> */}

        <LandingSocialProof className="w-full mt-12" showRating numberOfUsers={99} suffixText="happy users" avatarItems={avatarItems} />
      </LandingPrimaryImageCtaSection>
      <LandingMarquee withBackground variant="secondary">
        {Object.values(images).map((image, index) => {
          return <Image src={image} alt="CFB" className="h-48 w-auto" />;
        })}
      </LandingMarquee>
    </>
  );
}

export default Home;
