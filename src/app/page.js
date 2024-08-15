
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HexColorPicker, HexColorInput } from "react-colorful";
import images from "./config/images";


export default function Home() {

  const captureRef = useRef(null);
  const [color, setColor] = useState("#aabbcc");
  const [tab,setTab] = useState("background")
  const captureImage = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'combined-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const bodiesData = [
    {
      image: images.body1,
      name: "white T-shirt 1"
    },
    {
      image: images.body2,
      name: "white T-shirt 2"
    },
    {
      image: images.body3,
      name: "King 1"
    },
    {
      image: images.body4,
      name: "King 2"
    },
    {
      image: images.body5,
      name: "Logan"
    },
  ]

  const headsData = [
    {
      image: images.head1,
      name: "Rick"
    },
    {
      image: images.head2,
      name: "Normal Head"
    },
    {
      image: images.head3,
      name: "King"
    },
    {
      image: images.head4,
      name: "Logan"
    },

  ]

  return (
    <div className="bg-[#E1E1E1] flex  justify-center ">

      <div className="w-[100%]  flex flex-col    ">


        <nav className="w-[100%] flex justify-between p-4">
          <h2 className="text-2xl bricolageSemibold">
            MEME GENERATOR
          </h2>
          <h2 className="text-xl workSans">
            about
          </h2>
        </nav>


        <div className="flex w-[100%] border-t-2 border-b-2 border-black">
          <div className="w-[50%] border-r-2 border-black">
            <Image src={images.rick} className="w-[100%]" />
          </div>
          <div className="flex flex-col justify-between px-12 py-8 w-1/2 bg-white">
            <div>

              <div className="bricolageSemibold text-7xl">CREATE & DOWNLOAD YOUR PUNKS 12PX PFP!</div>
              <div className="mt-3 text-2xl workSans">Pick and choose between various elements to compose your Punk 12px PFP</div>
            </div>
            <div className="bricolageSemibold text-4xl ">Read <span className=" text-[#FF6B00] underline cursor-pointer">instructions</span>  for more info</div>
          </div>
        </div>



        <div className="flex p-12 justify-between">

          <div className="w-[60%] border-2 border-black bg-white">
            <div className="grid grid-cols-3 bricolageSemibold text-3xl border-b-2 border-black">
              <div className="p-4 text-center border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={()=>{
                setTab("background")
              }}>
                BACKGROUND
              </div>
              <div className="p-4 text-center border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={()=>{
                setTab("head")
              }}>
                HEAD
              </div>
              <div className="p-4 text-center cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={()=>{
                setTab("body")
              }}>
                BODY
              </div>
            </div>

            <div className="p-12">

              {tab === "background" &&
              <>
              <HexColorPicker color={color} onChange={setColor} />
              <HexColorInput color={color} onChange={setColor} />
              </>
              }
              {
                tab === "head" && 
                <>
                <div>
                  head
                </div>
                </>
              }
              {
                tab === "body" && 
                <>
                <div>
                  body
                </div>
                </>
              }
            </div>
          </div>


          <div className=" w-[30%]">
            <div ref={captureRef} style={{ position: 'relative', width: '250px', height: '250px', backgroundColor: color }}>
              
              <Image src={images.body1} style={{ position: 'absolute', top: 0, left: 0 }} />
              <Image src={images.head1} style={{ position: 'absolute', top: 0, left: 0 }} />
            </div>
            <button onClick={captureImage}>Download Image</button>
          </div>


        </div>

        <footer className="border-t-2 border-black">
          <div className="p-12 bg-[#FF6B00]">
            <div className="bricolageSemibold text-6xl">
              ABOUT US
            </div>
            <div className="workSans text-2xl mt-4">
              Punks 12px are a free self-inscribe (Bitcoin) pixel art collection (Anno 2024) - first is first - with a total of 10 000 Punks (12×12px)
            </div>
            <div className=" bricolageSemibold bg-black text-white text-2xl py-2 w-52 mt-4 text-center border-b-2 border-black ">
              LEARN MORE
            </div>
          </div>

          <div className=" bg-white p-12 bricolageSemibold text-2xl border-t-2 border-black">
            IllEGAL MEMES © 2024 - ALL RIGHTS ARE RESERVED.
          </div>
        </footer>
      </div>
    </div>
  );
}
