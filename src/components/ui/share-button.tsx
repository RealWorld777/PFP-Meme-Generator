import clsx from 'clsx';
import { FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon } from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const ShareButton = ({ url, title, className }: ShareButtonsProps) => {
  return (
    <div className={clsx('flex gap-1', className)}>
      <TwitterShareButton url={url} title={title}>
        <XIcon size={36} round />
      </TwitterShareButton>
      {/* <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={36} round />
      </FacebookShareButton> */}
    </div>
  );
};

export default ShareButton;
