'use client';
import NextImage from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { storage } from '../../config/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import mainImg from '../../assets/Frame5.svg';
import Loader from 'react-dots-loader';
import 'react-dots-loader/index.css';
import { Button } from '../../components/ui/button';
import { addDownload } from '../../config/firestore';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import fortuneCookies from '../../../data/fortune-cookie.json';
import { Cookie } from 'lucide-react';
import FortuneCookieButton from '../../components/ui/fortune-cookie';
import ShareButton from '../../components/ui/share-button';

export default function Generator() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('#aabbcc');
  const [tab, setTab] = useState<'background' | 'body' | 'skin' | 'eyes' | 'top' | 'mouth' | 'glasses' | 'earrings'>('background');
  const [skinType, setSkinType] = useState<string | null>(null);
  const [fortuneCookie, setFortuneCookie] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');

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

  const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const extractFolderAndFileName = (url: string): { folder: string; file: string } => {
    const [, path] = decodeURIComponent(url).split('/o/');
    const [pathWithoutQuery] = path.split('?');
    const parts = pathWithoutQuery.split('%2F');
    const folder = parts.slice(0, -1).join('/');
    const file = parts[parts.length - 1];

    return { folder, file };
  };

  const filterImagesByVar = (images: string[], varIdentifier: string): string[] =>
    images.filter((img) => new RegExp(`(${varIdentifier})(?!\\d)`).test(img) || img.includes('universal'));

  const setBodyType = (url: string): string | null => {
    const varIdentifier = url.match(/(skin\d{1,2}|universal)/)?.[1];

    if (!varIdentifier) return null;
    const matchedImages = filterImagesByVar(initialBody, varIdentifier);
    setBodyImages(matchedImages);
    if (varIdentifier !== 'universal') {
      setSkinType(varIdentifier);
      return varIdentifier;
    } else {
      setSkinType(null);
      return null;
    }
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
    const randomBody = getRandomElement(initialBody);
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

  const resetSelections = () => {
    setColor('#aabbcc');
    setSelected({
      background: '',
      body: '',
      skin: '',
      eyes: '',
      top: '',
      mouth: '',
      glasses: '',
      earrings: '',
    });
    setSkinType(null);
    setBodyImages(initialBody);
  };

  const combineImages = async (): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    const width = 2400;
    const height = 2400;
    canvas.width = width;
    canvas.height = height;

    if (!selected.background) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }

    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });

    try {
      const loadSelectedImage = async (key: keyof typeof selected) => {
        if (selected[key]) {
          const { folder, file } = extractFolderAndFileName(selected[key]);
          const hdFolder = folder.replace('LD_ASSETS', 'HD_ASSETS');
          return loadImage(await fetchSingleImage(hdFolder, file));
        }
        return null;
      };

      const images = await Promise.all(['background', 'body', 'skin', 'eyes', 'top', 'mouth', 'glasses', 'earrings'].map((key) => loadSelectedImage(key as keyof typeof selected)));

      images.forEach((img) => {
        if (img) {
          ctx.drawImage(img, 0, 0, width, height);
        }
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error combining images:', error);
      return '';
    }
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

  const downloadImage = async () => {
    const dataUrl = await combineImages();

    setFortuneCookie(getRandomElement(fortuneCookies));

    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'combined-pfp.png';
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
        createdAt: serverTimestamp(),
      });
    } else {
      alert('Failed to generate image.');
    }
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
            <div className="sm:flex pt-3">
              <div className="mr-10 pl-3 mb-5 sm:mb-0">
                <HexColorPicker
                  color={color}
                  onChange={(newColor) => {
                    setSelected((prev) => ({ ...prev, background: '' }));
                    setColor(newColor);
                  }}
                />
                <HexColorInput
                  color={color}
                  onChange={(newColor) => {
                    setSelected((prev) => ({ ...prev, background: '' }));
                    setColor(newColor);
                  }}
                />
              </div>
              <div className="flex-1 pl-3">
                {imagesLoaded.background ? (
                  <div className="flex flex-wrap gap-3 h-[400px] overflow-y-scroll">
                    {backgroundImages.map((url, index) => (
                      <div
                        key={index}
                        className={`border-2 z-20 border-black cursor-pointer max-h-[150px] ${selected.background === url ? 'border-blue-500' : ''}`}
                        onClick={() => {
                          setSelected((prev) => ({ ...prev, background: url }));
                        }}
                      >
                        <NextImage src={url} alt={`Background ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        );
      case 'body':
        return (
          <div>
            <div className="flex justify-between px-10 pt-3">
              <div className=" text-xl font-semibold">Select Body</div>
              <div className=" text-xl font-bold underline cursor-pointer" onClick={resetSelections}>
                Reset
              </div>
            </div>
            {imagesLoaded.body ? (
              <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                {bodyImages.map((url, index) => (
                  <div
                    key={index}
                    className="border-2 z-20 border-black bg-white cursor-pointer max-h-[150px]"
                    onClick={() => {
                      setSelected((prev) => ({ ...prev, body: url }));
                      setBodyType(url);
                    }}
                  >
                    <NextImage src={url} alt={`body ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        );
      case 'skin':
        return (
          <div>
            <div className="flex justify-between px-10 pt-3">
              <div className=" text-xl font-semibold">Select Skin</div>
              <div className=" text-xl font-bold underline cursor-pointer" onClick={resetSelections}>
                Reset
              </div>
            </div>
            {imagesLoaded.skin ? (
              <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                {skinImages.map((url, index) => (
                  <div
                    key={index}
                    className="border-2 z-20 border-black bg-white cursor-pointer max-h-[150px]"
                    onClick={() => {
                      setSelected((prev) => ({ ...prev, skin: url }));
                      setSkinTypeFromSkin(url);
                    }}
                  >
                    <NextImage src={url} alt={`skin ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            ) : (
              <Loader />
            )}
          </div>
        );
      case 'eyes':
      case 'top':
      case 'mouth':
      case 'glasses':
      case 'earrings':
        const categoryMap: Record<string, { images: string[]; loaded: boolean }> = {
          background: { images: backgroundImages, loaded: imagesLoaded.background },
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
                    className="border-2 z-20 border-black bg-white cursor-pointer max-h-[150px]"
                    onClick={() => {
                      setSelected((prev) => ({ ...prev, [tab]: url }));
                    }}
                  >
                    <NextImage src={url} alt={`${tab} ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
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
            <NextImage alt="Main Image" src={mainImg} className="w-full" />
          </div>
          <div className="flex flex-col justify-between px-7 py-5 md:px-12 md:py-8 w-full sm:w-1/2">
            <div>
              <h1 className="bricolageSemibold text-3xl md:text-5xl lg:text-7xl">CREATE & DOWNLOAD YOUR FAVOURITE CFB PFP!</h1>
              <p className="mt-3 text-base md:text-xl lg:text-2xl workSans">Pick and choose between various elements to compose your CFB PFP</p>
            </div>
            <div className="bricolageSemibold text-xl md:text-2xl lg:text-4xl">
              Read <span className="text-[#FF6B00] underline cursor-pointer">instructions</span> for more info
            </div>
          </div>
        </div>

        <div className="lg:flex p-6 lg:p-12 justify-between gap-4">
          <div className="border-2 border-black">
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
                <Button className="border-2 border-black text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={getRandomImages}>
                  SHUFFLE
                </Button>
                <Button className="border-2 border-black text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={downloadImage}>
                  DOWNLOAD
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-1 md:flex-col text-center">
            <div ref={captureRef} className="border-2 border-black relative w-[400px] h-[400px]">
              {selected.background ? (
                <NextImage alt="Background" src={selected.background} className="absolute top-0 left-0 z-0 w-full h-full" fill loading="eager" />
              ) : (
                <div style={{ backgroundColor: color, width: '100%', height: '100%' }}></div>
              )}
              {selected.body && <NextImage alt="Body" src={selected.body} className="absolute top-0 left-0 z-1 w-full h-full" fill loading="eager" />}
              {selected.skin && <NextImage alt="Skin" src={selected.skin} className="absolute top-0 left-0 z-2 w-full h-full" fill loading="eager" />}
              {selected.eyes && <NextImage alt="Eyes" src={selected.eyes} className="absolute top-0 left-0 z-3 w-full h-full" fill loading="eager" />}
              {selected.top && <NextImage alt="Top" src={selected.top} className="absolute top-0 left-0 z-4 w-full h-full" fill loading="eager" />}
              {selected.mouth && <NextImage alt="Mouth" src={selected.mouth} className="absolute top-0 left-0 z-5 w-full h-full" fill loading="eager" />}
              {selected.glasses && <NextImage alt="Glasses" src={selected.glasses} className="absolute top-0 left-0 z-6 w-full h-full" fill loading="eager" />}
              {selected.earrings && <NextImage alt="Earrings" src={selected.earrings} className="absolute top-0 left-0 z-7 w-full h-full" fill loading="eager" />}

              {shareUrl && <ShareButton url={shareUrl} title="Check out this awesome CFB PFP!" className="absolute bottom-2 right-2 hover:scale-110 transition duration-200" />}
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <>
                {fortuneCookie && (
                  <FortuneCookieButton fortuneCookieText={fortuneCookie} isVisible={true} onClick={() => {}} fortuneCookieTextClassName="bricolageSemibold text-3xl mt-10" width={200} height={150} />
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
