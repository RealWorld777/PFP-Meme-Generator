'use client';

import React from 'react';
import { LandingPrimaryImageCtaSection } from '../components/landing/LandingPrimaryCta';
import { Button } from '../components/ui/button';
import titleSvg from '../assets/Frame5.svg';
import Link from 'next/link';

function Home() {
  return (
    <>
      <LandingPrimaryImageCtaSection
        title="PFP Generator"
        description="Generate your own PFP with CFB"
        imageSrc={titleSvg}
        imageAlt="CFB"
        imagePerspective="paper"
        imageShadow="hard"
      >
        <Button size="xl">
          <Link href="#">Read more</Link>
        </Button>
        <Button size="xl" asChild variant="outlinePrimary">
          <Link href="/generator">Generate Now</Link>
        </Button>
      </LandingPrimaryImageCtaSection>
    </>
  );
}

export default Home;
