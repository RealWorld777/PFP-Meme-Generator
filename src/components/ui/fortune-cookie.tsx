import { Button } from './button';
import cookieLeft from '../../assets/svg/cookie-left.svg';
import cookieRight from '../../assets/svg/cookie-right.svg';
import cookie1 from '../../assets/svg/cookie1.svg';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface FortuneCookieButtonProps {
  onClick: () => void;
  isVisible: boolean;
  fortuneCookieText: string;
  fortuneCookieTextClassName?: string;
  width?: number;
  height?: number;
}

const FortuneCookieButton: React.FC<FortuneCookieButtonProps> = ({ onClick, fortuneCookieText, isVisible, fortuneCookieTextClassName, width = 260, height = 200 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  const cookieVariants = {
    closed: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const leftHalfVariants = {
    open: { x: '-100%', transition: { duration: 1 } },
    closed: { x: 0, transition: { duration: 1 } },
  };

  const rightHalfVariants = {
    open: { x: '100%', transition: { duration: 1 } },
    closed: { x: 0, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } },
  };

  return isVisible ? (
    <motion.div
      className="cursor-pointer relative w-48 h-48 mx-auto"
      onClick={() => {
        setIsOpen(!isOpen);
        onClick();
      }}
    >
      <AnimatePresence>
        {!isOpen ? (
          <motion.div key="closedCookie" variants={cookieVariants} initial="closed" whileHover="hover">
            <Image src={cookie1.src} alt="Cookie 1" width={width} height={height} />
          </motion.div>
        ) : (
          <>
            <motion.div key="leftHalf" variants={leftHalfVariants} initial="closed" animate="open" className="absolute top-0 left-0 bottom-0">
              <Image src={cookieLeft.src} alt="Cookie Left" width={(width * 3) / 5} height={height} />
            </motion.div>
            <motion.div key="rightHalf" variants={rightHalfVariants} initial="closed" animate="open" className="absolute top-0 right-0 bottom-0">
              <Image src={cookieRight.src} alt="Cookie Right" width={(width * 3) / 5} height={height} />
            </motion.div>
            <AnimatePresence>
              {showText && (
                <motion.div key="fortuneText" variants={textVariants} initial="hidden" animate="visible" exit="hidden" className="absolute flex items-center justify-center text-center">
                  <p className={clsx('text-xl', fortuneCookieTextClassName)}>{fortuneCookieText}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  ) : null;
};

export default FortuneCookieButton;
