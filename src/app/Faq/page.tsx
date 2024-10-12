'use client';
import { useState } from 'react';
import images from '../../config/images';
import Image from 'next/image';
import faqData from '../../data/faq.json';

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaqActive = (index: number): void => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className="p-12 bg-[#FF6B00] border-t-2 border-black" id="aboutus">
        <h2 className="bricolageSemibold text-6xl text-black">FREQUENTLY ASKED QUESTIONS</h2>
        <p className="workSans text-2xl mt-4 text-black">
          Got questions? We’ve got answers! Check out our most frequently asked questions below to help you get started with creating and sharing your memes.
        </p>
      </div>
      <div className="bg-[#E1E1E1]">
        <div className="border-t-2 border-black p-10">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white flex justify-between p-5 border-2 border-black mb-5">
              <div>
                <h3 className="bricolageSemibold text-black text-xl sm:text-4xl">{faq.title}</h3>
                {activeIndex === index && <p className="workSans sm:text-2xl text-black mt-5 faq-content active">{faq.content}</p>}
              </div>
              <div className="w-[50px] h-[50px] sm:w-[25px] sm:h-[25px] cursor-pointer" onClick={() => toggleFaqActive(index)}>
                {activeIndex === index ? <Image src={images.minus} alt="Collapse" /> : <Image src={images.plus} alt="Expand" className="max-w-none" />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-white p-12 bricolageSemibold text-black text-2xl border-t-2 border-black">IllEGAL MEMES © 2024 - ALL RIGHTS ARE RESERVED.</footer>
    </div>
  );
};

export default Faq;
