import React, { useState, useEffect, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import ShareButton from '../../../components/ui/share-button';
import { HashLoader } from 'react-spinners';
import { Button } from '../../../components/ui/button';

interface SelectedImages {
  background?: string;
  body: string;
  skin: string;
  eyes: string;
  top: string;
  mouth: string;
  glasses: string;
  earrings: string;
}

interface ImagePanelProps {
  selected: SelectedImages;
  color: string;
  shareUrl: string;
  captureRef: React.RefObject<HTMLDivElement>;
}

const layers = [
  { key: 'background', zIndex: 0 },
  { key: 'body', zIndex: 1 },
  { key: 'skin', zIndex: 2 },
  { key: 'eyes', zIndex: 3 },
  { key: 'top', zIndex: 4 },
  { key: 'mouth', zIndex: 5 },
  { key: 'glasses', zIndex: 6 },
  { key: 'earrings', zIndex: 7 },
] as const;

const ImagePanel: React.FC<ImagePanelProps> = ({ selected, color, shareUrl, captureRef }) => {
  const initialLoadedState = layers.reduce((acc, layer) => {
    acc[layer.key] = layer.key === 'background' ? Boolean(selected.background) : false;
    return acc;
  }, {} as Record<(typeof layers)[number]['key'], boolean>);

  const [loadedImages, setLoadedImages] = useState<Record<(typeof layers)[number]['key'], boolean>>(initialLoadedState);
  const prevSelectedRef = useRef<SelectedImages>(selected);

  const handleImageLoad = useCallback((layer: (typeof layers)[number]['key']) => {
    console.log(`Image loaded: ${layer}`);
    setLoadedImages((prev) => ({ ...prev, [layer]: true }));
  }, []);

  const handleImageError = useCallback((layer: (typeof layers)[number]['key']) => {
    console.error(`Failed to load image: ${layer}`);
    setLoadedImages((prev) => ({ ...prev, [layer]: true }));
  }, []);

  const allImagesLoaded = Object.values(loadedImages).every(Boolean);

  useEffect(() => {
    const prevSelected = prevSelectedRef.current;
    const updatedLoadedImages: Partial<Record<(typeof layers)[number]['key'], boolean>> = {};

    layers.forEach((layer) => {
      if (selected[layer.key] !== prevSelected[layer.key]) {
        updatedLoadedImages[layer.key] = layer.key === 'background' ? Boolean(selected.background) : false;
      }
    });

    if (Object.keys(updatedLoadedImages).length > 0) {
      setLoadedImages((prev) => ({ ...prev, ...updatedLoadedImages }));
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

      {layers.map((layer) => {
        if (layer.key === 'background') {
          return selected.background ? (
            <NextImage
              key={layer.key}
              alt="Background"
              quality={100}
              priority
              width={400}
              height={400}
              src={selected.background}
              className={`absolute top-0 left-0 z-${layer.zIndex} w-full h-full`}
              onLoad={() => handleImageLoad(layer.key)}
              onError={() => handleImageError(layer.key)}
            />
          ) : (
            <div key={layer.key} style={{ backgroundColor: color }} className={`absolute top-0 left-0 z-${layer.zIndex} w-full h-full`} />
          );
        }

        return selected[layer.key] ? (
          <NextImage
            key={layer.key}
            alt={layer.key.charAt(0).toUpperCase() + layer.key.slice(1)}
            quality={100}
            priority
            width={400}
            height={400}
            src={selected[layer.key]}
            className={`absolute top-0 left-0 z-${layer.zIndex} w-full h-full`}
            loading="eager"
            onLoad={() => handleImageLoad(layer.key)}
            onError={() => handleImageError(layer.key)}
          />
        ) : null;
      })}

      {shareUrl && allImagesLoaded && (
        <ShareButton url={''} title="Check out this awesome $CFB PFP I just created!\n\n#CFBGENERATOR @c_f_b_token" className="absolute bottom-2 right-2 hover:scale-110 transition duration-200" />
      )}
    </div>
  );
};

ImagePanel.displayName = 'ImagePanel';

export default ImagePanel;
