'use client';

import React, { useEffect, useState } from 'react';
import { LandingPrimaryCtaContent, LandingPrimaryImageCtaSection } from '../components/landing/LandingPrimaryCta';
import images, { homeImg } from '../config/images';
import { getDownloadsCount } from '../config/firestore';
import { FaDollarSign, FaGlobe, FaDiscord, FaTelegram, FaShoppingBag } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import clsx from 'clsx';

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

const content = (
  <div>
    <div className="text-2xl">
      <span className="font-bold text-yellow-500">$CFB</span> is the first ever meme token to be released on the Qubic tickchain, a blockchain that aims to create true AGI (Artificial General
      Intelligence). At the heart of our meme token there is CFB Generator, a free tool with which users can create unique CFB avatars or irreverent faces to create their own memes, through the use of
      personalized traits that reflect their personality or style.
    </div>
    <div className="text-2xl">Create and share your personal CFB avatar or meme on X, let&apos;s spread the word.</div>
    <div className="text-2xl">
      <div className="flex justify-around py-5">
        <div className="flex items-center">
          <Link href="https://twitter.com/c_f_b_token" target="_blank" rel="noopener noreferrer">
            <FaXTwitter size={40} />
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://safetrade.com/exchange/CFB-USDT?type=basic" target="_blank" rel="noopener noreferrer">
            <img src="https://s2.coinmarketcap.com/static/img/exchanges/128x128/491.png" alt="SafeTrade" width={40} height={40} />
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://coinpaprika.com/coin/cfb-cfb-token/" target="_blank" rel="noopener noreferrer">
            <img src="https://coinpaprika.com/assets/img/cp-logo-small.svg" alt="CoinPaprika" width={40} height={40} />
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://cfbtoken.com" target="_blank" rel="noopener noreferrer">
            <FaGlobe size={40} />
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://discord.gg/cAbXK8Kx35" target="_blank" rel="noopener noreferrer">
            <FaDiscord size={40} />
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="https://t.me/+0NJgRzFxPXMxMjk8" target="_blank" rel="noopener noreferrer">
            <FaTelegram size={40} />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

function Home() {
  return (
    <div className="p-6 flex flex-col lg:flex-row items-center justify-between">
      <div className="flex flex-col gap-4 justify-center bricolageSemibold text-xl py-0 lg:py-0 px-4 lg:px-16 w-full lg:w-2/5">
        <h1 className="text-6xl">CFB Generator</h1>
        {content}
      </div>

      <div className="flex flex-col gap-3 items-center w-full lg:w-3/5">
        <img className={clsx('w-full rounded-md relative z-10')} alt="CFB" src={homeImg.src} />
        <Link
          href="/generator"
          className="w-full bricolageSemibold bg-primary-300/70 text-primary-foreground rounded-md hover:bg-primary-300/90 dark:bg-primary-700 dark:hover:bg-primary-700/90 text-lg sm:text-xl text-center py-3 cursor-pointer transition duration-200"
        >
          GENERATE NOW
        </Link>
      </div>
    </div>
  );
}

export default Home;
