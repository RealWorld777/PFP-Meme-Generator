import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import ShareButton from '../../../components/ui/share-button';
import { HashLoader } from 'react-spinners';

interface ImagePanelProps {
  selected: {
    background: string;
    body: string;
    skin: string;
    eyes: string;
    top: string;
    mouth: string;
    glasses: string;
    earrings: string;
  };
  color: string;
  shareUrl: string;
  captureRef: React.RefObject<HTMLDivElement>;
}

const ImagePanel: React.FC<ImagePanelProps> = ({ selected, color, shareUrl, captureRef }) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({
    body: false,
    skin: false,
    eyes: false,
    top: false,
    mouth: false,
    glasses: false,
    earrings: false,
  });
  const prevSelectedRef = useRef<ImagePanelProps['selected']>(selected);

  const handleImageLoad = (layer: keyof typeof loadedImages) => {
    console.log(`Image loaded: ${layer}`);
    setLoadedImages((prev) => ({ ...prev, [layer]: true }));
  };

  const handleImageError = (layer: keyof typeof loadedImages) => {
    console.error(`Failed to load image: ${layer}`);
    setLoadedImages((prev) => ({ ...prev, [layer]: true }));
  };

  const allImagesLoaded = Object.values(loadedImages).every((isLoaded) => isLoaded === true);

  useEffect(() => {
    const prevSelected = prevSelectedRef.current;
    const newLoadedImages: Partial<Record<keyof ImagePanelProps['selected'], boolean>> = {};

    (Object.keys(selected) as Array<keyof ImagePanelProps['selected']>).forEach((key) => {
      if (selected[key] !== prevSelected[key]) {
        newLoadedImages[key] = false;
      }
    });

    if (Object.keys(newLoadedImages).length > 0) {
      setLoadedImages((prev) => ({ ...prev, ...newLoadedImages }));
    }

    prevSelectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    setLoadedImages((prev) => ({ ...prev, background: true }));
  }, [color]);

  return (
    <div ref={captureRef} className="relative border-2 border-black w-full md:w-[400px] md:h-[400px] aspect-square">
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <HashLoader color="white" size={100} />
        </div>
      )}

      {selected.background ? (
        <NextImage
          alt="Background"
          src={selected.background}
          className="absolute top-0 left-0 z-0 w-full h-full"
          fill
          onLoad={() => handleImageLoad('background' as keyof typeof loadedImages)}
          onError={() => handleImageError('background' as keyof typeof loadedImages)}
        />
      ) : (
        <div style={{ backgroundColor: color }} className="absolute top-0 left-0 z-0 w-full h-full"></div>
      )}

      <NextImage
        alt="Body"
        src={selected.body}
        className="absolute top-0 left-0 z-1 w-full h-full"
        fill
        loading="eager"
        onLoad={() => handleImageLoad('body')}
        onError={() => handleImageError('body')}
      />
      <NextImage
        alt="Skin"
        src={selected.skin}
        className="absolute top-0 left-0 z-2 w-full h-full"
        fill
        loading="eager"
        onLoad={() => handleImageLoad('skin')}
        onError={() => handleImageError('skin')}
      />
      <NextImage
        alt="Eyes"
        src={selected.eyes}
        className="absolute top-0 left-0 z-3 w-full h-full"
        fill
        loading="eager"
        onLoad={() => handleImageLoad('eyes')}
        onError={() => handleImageError('eyes')}
      />
      <NextImage alt="Top" src={selected.top} className="absolute top-0 left-0 z-4 w-full h-full" fill loading="eager" onLoad={() => handleImageLoad('top')} onError={() => handleImageError('top')} />
      <NextImage
        alt="Mouth"
        src={selected.mouth}
        className="absolute top-0 left-0 z-5 w-full h-full"
        fill
        loading="eager"
        onLoad={() => handleImageLoad('mouth')}
        onError={() => handleImageError('mouth')}
      />
      <NextImage
        alt="Glasses"
        src={selected.glasses}
        className="absolute top-0 left-0 z-6 w-full h-full"
        fill
        loading="eager"
        onLoad={() => handleImageLoad('glasses')}
        onError={() => handleImageError('glasses')}
      />
      <NextImage
        alt="Earrings"
        src={selected.earrings}
        className="absolute top-0 left-0 z-7 w-full h-full"
        fill
        loading="eager"
        onLoad={() => handleImageLoad('earrings')}
        onError={() => handleImageError('earrings')}
      />
      {shareUrl && allImagesLoaded && <ShareButton url={shareUrl} title="Check out this awesome CFB PFP!" className="absolute bottom-2 right-2 hover:scale-110 transition duration-200" />}
    </div>
  );
};

export default ImagePanel;
