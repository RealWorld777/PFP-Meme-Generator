
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import back from "../app/assets/BACK_Cfb.png"
import head from "../app/assets/HEAD_Rick_var1.png"
import body from "../app/assets/BODY_Cfb_var0.png"
import rick from "../app/assets/rick.png"
import html2canvas from "html2canvas";
import { AlphaPicker, SketchPicker } from "react-color";
export default function Home() {

  const captureRef = useRef(null);

  const captureImage = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'combined-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };


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
            <Image src={rick} className="w-[100%]" />
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
              <div className="p-4 text-center border-r-2 border-black">
                BACKGROUND
              </div>
              <div className="p-4 text-center border-r-2 border-black">
                HEAD
              </div>
              <div className="p-4 text-center">
                BODY
              </div>
            </div>

            <SketchPicker />
          </div>


          <div className=" w-[30%]">
<div ref={captureRef} style={{ position: 'relative', width: '250px', height: '250px' }}>
        <Image src={back} style={{ position: 'absolute', top: 0, left: 0 }} />
        <Image src={body} style={{ position: 'absolute', top: 0, left: 0 }} />
        <Image src={head} style={{ position: 'absolute', top: 0, left: 0 }} />
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
