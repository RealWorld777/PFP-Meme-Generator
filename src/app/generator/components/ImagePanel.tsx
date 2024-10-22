import NextImage from 'next/image';
import ShareButton from '../../../components/ui/share-button';

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
  return (
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
  );
};

export default ImagePanel;
