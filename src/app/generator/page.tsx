'use client';
import NextImage from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { storage } from '../../config/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import 'react-dots-loader/index.css';
import { addDownload } from '../../config/firestore';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import fortuneCookies from '../../../data/fortune-cookie.json';
import FortuneCookieButton from '../../components/ui/fortune-cookie';
import ImagePanel from './components/ImagePanel';
import SelectPanel from './components/SelectPanel';
import images, { genratorImg } from '../../config/images';
import { LandingMarquee } from '../../components/landing/LandingMarquee';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

const skinTypes = ['skin1', 'skin2', 'skin3', 'skin4', 'skin5', 'skin6', 'skin7', 'skin8', 'skin9', 'skin10', 'universal'];

export default function Generator() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('#aabbcc');
  const [tab, setTab] = useState<'background' | 'body' | 'skin' | 'eyes' | 'top' | 'mouth' | 'glasses' | 'earrings'>('background');
  const [skinType, setSkinType] = useState<string | null>('skin1');
  const [fortuneCookie, setFortuneCookie] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [latestImgs, setLatestImgs] = useState<string[]>([]);

  const clearState = () => {
    setFortuneCookie(null);
    setShareUrl('');
  };

  const imageCategories = {
    background: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    body: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    skin: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    eyes: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    top: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    mouth: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    glasses: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
    earrings: { state: useState<string[]>(['']), initial: useState<string[]>(['']) },
  };

  const [
    [backgroundImages, setBackgroundImages],
    [bodyImages, setBodyImages],
    [skinImages, setSkinImages],
    [eyesImages, setEyesImages],
    [topImages, setTopImages],
    [mouthImages, setMouthImages],
    [glassesImages, setGlassesImages],
    [earringsImages, setEarringsImages],
  ] = [
    imageCategories.background.state,
    imageCategories.body.state,
    imageCategories.skin.state,
    imageCategories.eyes.state,
    imageCategories.top.state,
    imageCategories.mouth.state,
    imageCategories.glasses.state,
    imageCategories.earrings.state,
  ];

  const [[initialBackground], [initialBody], [initialSkin], [initialEyes], [initialTop], [initialMouth], [initialGlasses], [initialEarrings]] = [
    imageCategories.background.initial,
    imageCategories.body.initial,
    imageCategories.skin.initial,
    imageCategories.eyes.initial,
    imageCategories.top.initial,
    imageCategories.mouth.initial,
    imageCategories.glasses.initial,
    imageCategories.earrings.initial,
  ];

  const [selected, setSelected] = useState({
    background: '',
    body: '',
    skin: '',
    eyes: '',
    top: '',
    mouth: '',
    glasses: '',
    earrings: '',
  });

  const [imagesLoaded, setImagesLoaded] = useState({
    background: false,
    body: false,
    skin: false,
    eyes: false,
    top: false,
    mouth: false,
    glasses: false,
    earrings: false,
  });

  // Fetching Latest Images
  useEffect(() => {});

  const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const extractFolderAndFileName = (url: string): { folder: string; file: string } => {
    try {
      const parsedUrl = new URL(url);
      const pathname = decodeURIComponent(parsedUrl.pathname);
      const oIndex = pathname.indexOf('/o/');
      if (oIndex === -1) {
        throw new Error("Invalid URL format: '/o/' not found");
      }
      const path = pathname.substring(oIndex + 3);
      const parts = path.split('/');
      const file = parts.pop() || '';
      const folder = parts.join('/');
      return { folder, file };
    } catch (error) {
      console.error('Error extracting folder and file name:', error);
      return { folder: '', file: '' };
    }
  };

  const filterImagesByVar = (images: string[], varIdentifier: string): string[] => images.filter((img) => new RegExp(`(${varIdentifier})(?!\\d)`).test(img) || img.includes('universal'));

  const setBodyType = (url: string): string | null => {
    const varIdentifier = url.match(/(skin\d{1,2}|universal)/)?.[1];

    if (!varIdentifier) return null;
    if (varIdentifier === 'universal') {
      setSkinType(null);
      return null;
    }
    const matchedImages = filterImagesByVar(initialBody, varIdentifier);
    setBodyImages(matchedImages);
    setSkinType(varIdentifier);
    return varIdentifier;
  };

  const setSkinTypeFromSkin = (url: string): string | null => {
    const varIdentifier = url.match(/(skin\d{1,2})/)?.[1];

    if (!varIdentifier) return null;

    setSkinType(varIdentifier);
    const matchedBodyImages = filterImagesByVar(initialBody, varIdentifier);
    setBodyImages(matchedBodyImages);

    if (varIdentifier && selected.body) {
      let tmp = selected.body;
      const { folder, file } = extractFolderAndFileName(tmp);

      const newBodyUrl = matchedBodyImages.find((img) => img.includes(file.replaceAll('/', '%2F').replace(/skin\d{1,2}/, varIdentifier)))!;

      if (matchedBodyImages.includes(newBodyUrl)) {
        setSelected((prev) => ({ ...prev, body: newBodyUrl }));
      } else {
        const randomMatchedBody = getRandomElement(matchedBodyImages);
        setSelected((prev) => ({ ...prev, body: randomMatchedBody }));
      }
    }

    return varIdentifier;
  };

  const getRandomImages = useCallback(() => {
    clearState();

    if (Object.values(imageCategories).some((category) => category.initial[0].length === 0)) return;

    const newSelected = { ...selected };

    for (const [category, { initial }] of Object.entries(imageCategories)) {
      const randomImage = getRandomElement(initial[0]);
      newSelected[category as keyof typeof selected] = randomImage;
    }

    // Body and Skin type matching
    const randomSkinType = getRandomElement(skinTypes);
    const randomBody = getRandomElement(filterImagesByVar(initialBody, randomSkinType));
    newSelected.body = randomBody;
    const skinType = setBodyType(randomBody);

    let matchingSkins: any;
    if (skinType !== null) matchingSkins = skinImages.filter((url) => new RegExp(`(${skinType})(?!\\d)`).test(url));
    else matchingSkins = skinImages;
    newSelected.skin = getRandomElement(matchingSkins);

    setSelected(newSelected);

    return newSelected;
  }, [initialBackground, initialBody, imageCategories, selected, setBodyType, skinImages, skinType]);

  const fetchImages = useCallback(
    async (category: keyof typeof imageCategories, folder: string) => {
      const listRef = ref(storage, folder);
      const res = await listAll(listRef);
      const urls = await Promise.all(res.items.map(getDownloadURL));
      imageCategories[category].state[1](urls);
      imageCategories[category].initial[1](urls);
      setImagesLoaded((prev) => ({ ...prev, [category]: true }));
      console.log(`${category}`, urls);
    },
    [imageCategories]
  );

  const fetchSingleImage = async (folder: string, imageName: string) => {
    const listRef = ref(storage, `${folder}/${imageName}`);
    const url = await getDownloadURL(listRef);
    return url;
  };

  useEffect(() => {
    fetchImages('background', 'LD_ASSETS/background/');
    fetchImages('body', 'LD_ASSETS/body/');
    fetchImages('skin', 'LD_ASSETS/skin/');
    fetchImages('eyes', 'LD_ASSETS/eyes/');
    fetchImages('top', 'LD_ASSETS/top/');
    fetchImages('mouth', 'LD_ASSETS/mouth/');
    fetchImages('glasses', 'LD_ASSETS/glasses/');
    fetchImages('earrings', 'LD_ASSETS/earrings/');
  }, []);

  // Define default trait filenames
  const DEFAULT_TRAITS = {
    background: 'iceblue.png',
    body: 'tshirtwhite_skin1.png',
    skin: 'skin1_rosy.png',
    eyes: 'blue.png',
    top: 'originalbrown.png',
    mouth: 'trollgrin.png',
    glasses: 'cfbglasses.png',
    earrings: 'noearrings.png',
  };

  // Function to set selected traits to default
  const setDefaultSelected = useCallback(() => {
    const newSelected: typeof selected = { ...selected };
    for (const [category, filename] of Object.entries(DEFAULT_TRAITS)) {
      const imagesArray = imageCategories[category as keyof typeof imageCategories].state[0];
      const matchedImage = imagesArray.find((url) => url.includes(filename));
      if (matchedImage) {
        newSelected[category as keyof typeof selected] = matchedImage;
      } else {
        newSelected[category as keyof typeof selected] = '';
      }
    }
    setSelected(newSelected);
    setColor('#aabbcc');
    setBodyType(newSelected.body);
  }, [imageCategories]);

  // Set default selected traits once all images are loaded
  useEffect(() => {
    const allLoaded = Object.values(imagesLoaded).every((loaded) => loaded);
    if (allLoaded) {
      setDefaultSelected();
    }
  }, [imagesLoaded]);

  const resetSelections = () => {
    setDefaultSelected();
    clearState();
  };

  const loadImage = async (src: string): Promise<HTMLImageElement | null> => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
      return img;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const combineImages = async (width: number, height: number, isHD: boolean): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    canvas.width = width;
    canvas.height = height;

    if (!selected.background) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }

    const getImageSrc = async (key: keyof typeof selected, isHD: boolean): Promise<string | null> => {
      if (!selected[key]) return null;
      if (isHD) {
        const { folder, file } = extractFolderAndFileName(selected[key]);
        const hdFolder = folder.replace('LD_ASSETS', 'HD_ASSETS');
        return fetchSingleImage(hdFolder, file);
      }
      return selected[key];
    };

    try {
      const keys: (keyof typeof selected)[] = ['background', 'body', 'skin', 'eyes', 'top', 'mouth', 'glasses', 'earrings'];
      const imagePromises = keys.map((key) => getImageSrc(key, isHD));
      const imageSrcs = await Promise.all(imagePromises);
      const images = await Promise.all(imageSrcs.map((src) => (src ? loadImage(src) : Promise.resolve(null))));

      images.forEach((img) => {
        if (img) {
          ctx.drawImage(img, 0, 0, width, height);
        }
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error(`Error combining ${isHD ? 'HD' : 'LD'} images:`, error);
      return '';
    }
  };

  const combineImagesHD = async (): Promise<string> => {
    return combineImages(6400, 6400, true);
  };

  const combineImagesLD = async (): Promise<string> => {
    return combineImages(400, 400, false);
  };

  const uploadImage = async (dataUrl: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append('image', dataUrl.split(',')[1]); // Remove the data URL prefix

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return result.data.url;
    } else {
      throw new Error('Image upload failed');
    }
  };

  const downloadHDImage = async () => {
    const dataUrl = await combineImagesHD();

    setFortuneCookie(getRandomElement(fortuneCookies));

    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'combined-pfp-HD.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      try {
        const uploadedImageUrl = await uploadImage(await combineImagesLD());
        console.log('uploadedImageUrl', uploadedImageUrl);
        setShareUrl(uploadedImageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Image upload failed. Please try again.');
      }

      addDownload({
        selected,
        link: shareUrl,
        createdAt: serverTimestamp(),
      });
    } else {
      alert('Failed to generate HD image.');
    }
  };

  const downloadLDImage = async () => {
    const dataUrl = await combineImagesLD();

    setFortuneCookie(getRandomElement(fortuneCookies));

    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'combined-pfp-LD.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      try {
        const uploadedImageUrl = await uploadImage(dataUrl);
        console.log('uploadedImageUrl', uploadedImageUrl);
        setShareUrl(uploadedImageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Image upload failed. Please try again.');
      }

      addDownload({
        selected,
        link: shareUrl,
        createdAt: serverTimestamp(),
      });
    } else {
      alert('Failed to generate LD image.');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col">
        <div className="sm:flex w-full border-t-2 border-b-2 border-black">
          <div className="w-full sm:w-1/2 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
            <NextImage alt="Main Image" src={genratorImg} className="h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between px-7 py-5 md:px-12 md:py-8 w-full sm:w-1/2">
            <div>
              <h1 className="bricolageSemibold text-3xl md:text-4xl lg:text-6xl">Create, Download and Share your unique CFB</h1>
              <p className="mt-3 text-base md:text-md lg:text-xl workSans">
                Choose from the different assets available and create your personalized CFB: be it a firehead, an android, a mythological character, an alien, a tech-ronin with diamond teeth, a cypher 
                punk with a bright red mohawk, the possibilities are endless .
              </p>
            </div>
            <div className="bricolageSemibold text-xl md:text-2xl lg:text-4xl">
              For more details on how to use CFB Generator read the
              <Link href="/faq" className="text-[#FF6B00] cursor-pointer">
                FAQ
              </Link>
            </div>
            <div className="p-2">
              <LandingMarquee variant="secondary" animationDirection="left" animationDurationInSeconds={25}>
                {Object.values(images).map((image, index) => {
                  return <NextImage key={index} src={image} alt="CFB" className="h-48 w-auto" />;
                })}
              </LandingMarquee>
            </div>
          </div>
        </div>

        <div className="lg:flex p-6 lg:p-12 justify-between gap-4">
          <SelectPanel
            tab={tab}
            setTab={setTab}
            selected={selected}
            setSelected={setSelected}
            imageCategories={imageCategories}
            imagesLoaded={imagesLoaded}
            resetSelections={resetSelections}
            getRandomImages={getRandomImages}
            setBodyType={setBodyType}
            setSkinTypeFromSkin={setSkinTypeFromSkin}
            color={color}
            setColor={setColor}
          />

          <div className="flex flex-col md:flex-row lg:flex-col text-center justify-around">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <ImagePanel selected={selected} color={color} shareUrl={shareUrl} captureRef={captureRef} />
              </div>
              <div className="flex gap-1 px-1 py-1">
                <Button className="flex-1 text-lg sm:text-xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={downloadHDImage}>
                  DOWNLOAD HD
                </Button>
                <Button className="flex-1 text-lg sm:text-xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={downloadLDImage}>
                  DOWNLOAD PFP
                </Button>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center">
              {fortuneCookie && (
                <FortuneCookieButton fortuneCookieText={fortuneCookie} isVisible={true} onClick={() => {}} fortuneCookieTextClassName="bricolageSemibold text-3xl mt-10" width={200} height={150} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
