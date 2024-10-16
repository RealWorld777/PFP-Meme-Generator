// Start of Selection
'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import faqData from '../../data/faq.json';

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaqActive = (index: number): void => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className="p-12 bg-[#FF6B00] border-t-2" id="aboutus">
        <h2 className="bricolageSemibold text-6xl">FREQUENTLY ASKED QUESTIONS</h2>
        <p className="workSans text-2xl mt-4 ">Got questions? We've got answers! Check out our most frequently asked questions below to help you get started with creating and sharing your memes.</p>
      </div>
      <div className="">
        <div className="border-t-2 border-black p-10">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white flex justify-between p-5 border-2 border-black mb-5">
              <div>
                <h3 className="bricolageSemibold text-black text-xl sm:text-4xl">{faq.title}</h3>
                {activeIndex === index && <p className="workSans sm:text-2xl text-black mt-5 faq-content active">{faq.content}</p>}
              </div>
              <div className="w-[50px] h-[50px] sm:w-[25px] sm:h-[25px] cursor-pointer flex items-center justify-center" onClick={() => toggleFaqActive(index)}>
                {activeIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
