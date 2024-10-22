import { TwitterShareButton, XIcon } from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const ShareButton = ({ url, title, className }: ShareButtonsProps) => {
  return (
    <TwitterShareButton url={url} title={title} className={className}>
      <XIcon size={36} round />
    </TwitterShareButton>
  );
};

export default ShareButton;
