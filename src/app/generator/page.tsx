'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { storage } from '../../config/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import mainImg from '../../assets/Frame5.svg';
import Loader from 'react-dots-loader';
import 'react-dots-loader/index.css';

export default function Home() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('#aabbcc');
  const [tab, setTab] = useState<'background' | 'body' | 'skin' | 'eyes' | 'top' | 'mouth' | 'glasses' | 'earrings'>('background');

  const imageCategories = {
    body: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    skin: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    eyes: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    top: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    mouth: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    glasses: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    earrings: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
  };

  const [
    [bodyImages, setBodyImages],
    [skinImages, setSkinImages],
    [eyesImages, setEyesImages],
    [topImages, setTopImages],
    [mouthImages, setMouthImages],
    [glassesImages, setGlassesImages],
    [earringsImages, setearringsImages],
  ] = [
    imageCategories.body.state,
    imageCategories.skin.state,
    imageCategories.eyes.state,
    imageCategories.top.state,
    imageCategories.mouth.state,
    imageCategories.glasses.state,
    imageCategories.earrings.state,
  ];

  const [[initialBody], [initialSkin], [initialEyes], [initialTop], [initialMouth], [initialGlasses], [initialearrings]] = [
    imageCategories.body.initial,
    imageCategories.skin.initial,
    imageCategories.eyes.initial,
    imageCategories.top.initial,
    imageCategories.mouth.initial,
    imageCategories.glasses.initial,
    imageCategories.earrings.initial,
  ];

  const [selected, setSelected] = useState({
    body: 'https://firebasestorage.googleapis.com/v0/b/meme-1851b.appspot.com/o/body%2FBODY_Cfb_var0.png?alt=media&token=6111f162-f6dc-4262-bb57-81eb33c543d6',
    skin: '',
    eyes: '',
    top: '',
    mouth: '',
    glasses: '',
    earrings: '',
  });

  const [imagesLoaded, setImagesLoaded] = useState({
    body: false,
    skin: false,
    eyes: false,
    top: false,
    mouth: false,
    glasses: false,
    earrings: false,
  });

  const shuffleColours = ['#fb85ab', '#f8d63f', '#5d71fc', '#b3fbfe'];

  const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const getRandomHexColor = (): string => getRandomElement(shuffleColours);

  const parseVar = (url: string): number => {
    const match = url.match(/var(\d+|ALL)/);
    return match ? (match[1] === 'ALL' ? -1 : parseInt(match[1], 10)) : -1;
  };

  const filterImagesByVar = (images: string[], varIdentifier: string): string[] =>
    varIdentifier === 'ALL' ? initialBody : images.filter((img) => img.includes(`var${varIdentifier}`) || img.includes('varALL'));

  const setBodyType = (url: string): string[] => {
    const varIdentifier = url.match(/var(\d+|ALL)/)?.[1];
    if (!varIdentifier) return [];
    const matchedImages = filterImagesByVar(initialBody, varIdentifier);
    setBodyImages(matchedImages);
    return matchedImages;
  };

  const getRandomImageAndColor = useCallback(() => {
    console.log('image categories: ', imageCategories);
    if (Object.values(imageCategories).some((category) => category.initial[0].length === 0)) {
      console.log("length")
      return;
    }

    const randomColor = getRandomHexColor();
    const newSelected = { ...selected };
    console.log('random color: ', randomColor);
    console.log('new selected: ', newSelected);

    for (const [category, { initial }] of Object.entries(imageCategories)) {
      const randomImage = getRandomElement(initial[0]);
      newSelected[category as keyof typeof selected] = randomImage;
    }

    console.log('Shuffled results', newSelected, randomColor);

    setColor(randomColor);
    setSelected(newSelected);

    // Update body type based on the new body selection
    if (newSelected.body) {
      setBodyType(newSelected.body);
    }

    return { ...newSelected, color: randomColor };
  }, [initialBody]);

  const fetchImages = useCallback(async (category: keyof typeof imageCategories, folder: string) => {
    const listRef = ref(storage, folder);
    const res = await listAll(listRef);
    const urls = await Promise.all(res.items.map(getDownloadURL));
    imageCategories[category].state[1](urls);
    imageCategories[category].initial[1](urls);
    setImagesLoaded((prev) => ({ ...prev, [category]: true }));
    console.log(`${category}`, urls);
  }, []);

  useEffect(() => {
    fetchImages('body', 'LD_ASSETS/body/');
    fetchImages('skin', 'LD_ASSETS/skin/');
    fetchImages('eyes', 'LD_ASSETS/eyes/');
    fetchImages('top', 'LD_ASSETS/top/');
    fetchImages('mouth', 'LD_ASSETS/mouth/');
    fetchImages('glasses', 'LD_ASSETS/glasses/');
    fetchImages('earrings', 'LD_ASSETS/earrings/');
  }, [fetchImages]);

  const resetSelections = () => {
    setBodyImages(initialBody);
    setSelected({
      body: '',
      skin: '',
      eyes: '',
      top: '',
      mouth: '',
      glasses: '',
      earrings: '',
    });
  };

  const renderTabContent = () => {
    switch (tab) {
      case 'background':
        return (
          <div>
            <div className="flex justify-between px-10 pt-3">
              <div className=" text-xl font-semibold">Select Background</div>
              <div className=" text-xl font-bold underline cursor-pointer" onClick={resetSelections}>
                Reset
              </div>
            </div>
            <div className="sm:flex h-[400px] pt-3">
              <div className="mr-10 pl-3 mb-5 sm:mb-0">
                <HexColorPicker color={color} onChange={setColor} />
                <HexColorInput color={color} onChange={setColor} />
              </div>
            </div>
          </div>
        );
      case 'body':
      case 'skin':
      case 'eyes':
      case 'top':
      case 'mouth':
      case 'glasses':
      case 'earrings':
        const categoryMap: Record<string, { images: string[]; loaded: boolean }> = {
          body: { images: bodyImages, loaded: imagesLoaded.body },
          skin: { images: skinImages, loaded: imagesLoaded.skin },
          eyes: { images: eyesImages, loaded: imagesLoaded.eyes },
          top: { images: topImages, loaded: imagesLoaded.top },
          mouth: { images: mouthImages, loaded: imagesLoaded.mouth },
          glasses: { images: glassesImages, loaded: imagesLoaded.glasses },
          earrings: { images: earringsImages, loaded: imagesLoaded.earrings },
        };

        const currentCategory = categoryMap[tab];

        return (
          <div>
            <div className="flex justify-between px-10 pt-3">
              <div className=" text-xl font-semibold">Select {tab.charAt(0).toUpperCase() + tab.slice(1)}</div>
              <div className=" text-xl font-bold underline cursor-pointer" onClick={resetSelections}>
                Reset
              </div>
            </div>
            {currentCategory.loaded ? (
              <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                {currentCategory.images.map((url, index) => (
                  <div
                    key={index}
                    className="border-2 z-20 border-black cursor-pointer max-h-[150px]"
                    onClick={() => {
                      setSelected((prev) => ({ ...prev, [tab]: url }));
                    }}
                  >
                    <Image src={url} alt={`Image ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col">
        <div className="sm:flex w-full border-t-2 border-b-2 border-black">
          <div className="w-full sm:w-1/2 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
            <Image alt="Main Image" src={mainImg} className="w-full" />
          </div>
          <div className="flex flex-col justify-between px-7 py-5 md:px-12 md:py-8 w-full sm:w-1/2">
            <div>
              <h1 className="bricolageSemibold text-3xl md:text-5xl lg:text-7xl ">CREATE & DOWNLOAD YOUR FAVOURITE CFB PFP!</h1>
              <p className="mt-3 text-base md:text-xl lg:text-2xl workSans ">Pick and choose between various elements to compose your CFB PFP</p>
            </div>
            <div className="bricolageSemibold text-xl md:text-2xl lg:text-4xl ">
              Read <span className="text-[#FF6B00] underline cursor-pointer">instructions</span> for more info
            </div>
          </div>
        </div>

        <div className="lg:flex p-6 lg:p-12 justify-between">
          <div className="w-full mb-5 lg:mb-0 lg:w-3/5 border-2 border-black">
            <div className="grid grid-cols-4 bricolageSemibold text-xl md:text-3xl border-b-2 border-black">
              {[
                { label: 'Background', value: 'background' },
                { label: 'Body', value: 'body' },
                { label: 'Skin', value: 'skin' },
                { label: 'Eyes', value: 'eyes' },
                { label: 'Top', value: 'top' },
                { label: 'Mouth', value: 'mouth' },
                { label: 'Glasses', value: 'glasses' },
                { label: 'Earrings', value: 'earrings' },
              ].map((tabItem) => (
                <div
                  key={tabItem.value}
                  className={`p-3 text-center border-b-2 border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200 ${tab === tabItem.value ? 'bg-[#FF6B00]' : ''}`}
                  onClick={() => setTab(tabItem.value as any)}
                >
                  {tabItem.label}
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-between p-4">
              {renderTabContent()}

              <div className="grid grid-cols-2 bricolageSemibold gap-5 mt-5">
                <button className="border-2 border-black  text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={getRandomImageAndColor}>
                  SHUFFLE
                </button>
                <button className="border-2 border-black  text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {}}>
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/3 min-h-[400px]">
            <div ref={captureRef} className="border-2 border-black relative w-80 h-80" style={{ backgroundColor: color }}>
              {selected.body && <Image alt="Body" src={selected.body} className="absolute top-0 left-0 z-0 w-full h-full" fill loading="lazy" />}
              {selected.skin && <Image alt="Skin" src={selected.skin} className="absolute top-0 left-0 z-1 w-full h-full" fill loading="lazy" />}
              {selected.eyes && <Image alt="Eyes" src={selected.eyes} className="absolute top-0 left-0 z-2 w-full h-full" fill loading="lazy" />}
              {selected.top && <Image alt="Top" src={selected.top} className="absolute top-0 left-0 z-3 w-full h-full" fill loading="lazy" />}
              {selected.mouth && <Image alt="Mouth" src={selected.mouth} className="absolute top-0 left-0 z-4 w-full h-full" fill loading="lazy" />}
              {selected.glasses && <Image alt="Glasses" src={selected.glasses} className="absolute top-0 left-0 z-5 w-full h-full" fill loading="lazy" />}
              {selected.earrings && <Image alt="Earrings" src={selected.earrings} className="absolute top-0 left-0 z-6 w-full h-full" fill loading="lazy" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
