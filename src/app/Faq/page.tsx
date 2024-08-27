"use client";
import Layout from "../layout";
import "../globals.css"
import { useState } from "react";
import images from "../config/images";
import Image from "next/image";




const Faq: React.FC = () => {


  const [faqData, setFaqData] = useState([
    {
      title: "What is Meme Generator?",
      content: "Meme Generator is an online tool that allows users to create custom memes by adding text to popular images or uploading their own images.",
      active: false
    },
    {
      title: "How do I create a meme?",
      content: "To create a meme, choose a popular image template or upload your own image, add text in the provided fields, and click the 'Generate' button to create your meme.",
      active: false
    },
    {
      title: "Can I upload my own images?",
      content: "Yes, you can upload your own images to create personalized memes. Simply click the 'Upload Image' button and select your desired image file.",
      active: false
    },
    {
      title: "Is Meme Generator free to use?",
      content: "Yes, Meme Generator is free to use. However, we offer premium features for those who want access to additional tools and options.",
      active: false
    },
    {
      title: "How do I download or share my meme?",
      content: "After creating your meme, you can download it directly to your device or share it on social media platforms using the provided sharing options.",
      active: false
    }
  ]);

  const toggleFaqActive = (index: number): void => {
    setFaqData(prevFaqData =>
      prevFaqData.map((faq, i) => ({
        ...faq,
        active: i === index ? !faq.active : false
      }))
    );
  };

  return (
    <Layout >

      <div>
        <div className="p-12 bg-[#FF6B00] border-t-2 border-black" id="aboutus" >
          <div className="bricolageSemibold text-6xl text-black ">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <div className="workSans text-2xl mt-4 text-black">
            Got questions? We’ve got answers! Check out our most frequently asked questions below to help you get started with creating and sharing your memes.
          </div>

        </div>
        <div className="bg-[#E1E1E1]">

          <div className="border-t-2 border-black p-10">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white flex justify-between p-5 border-2 border-black mb-5">
                <div>
                  <div className="bricolageSemibold text-black text-xl sm:text-4xl">
                    {faq.title}
                  </div>
                  <div className={`workSans sm:text-2xl text-black mt-5 faq-content ${faq.active ? 'active' : ''}`}>
                    {faq.content}
                  </div>
                </div>
                <div
                  className="w-[25px] h-[25px] cursor-pointer"
                  onClick={() => {
                    toggleFaqActive(index)
                  }}>
                  {faq.active ?
                    <Image src={images.minus} alt="" />
                    :
                    <Image src={images.plus} alt="" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" bg-white p-12 bricolageSemibold text-black text-2xl border-t-2 border-black">
          IllEGAL MEMES © 2024 - ALL RIGHTS ARE RESERVED.
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
