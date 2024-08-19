
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HexColorPicker, HexColorInput } from "react-colorful";
import images from "./config/images";
import { storage } from './config/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export default function Home() {

  const captureRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#aabbcc");
  const [tab, setTab] = useState("background")
  const [headsImages, setHeadsImages] = useState([""]);
  const [bodiesImages, setBodiesImages] = useState([""]);
  const [loading, setLoading] = useState(true);
  // const [images, setImages] = useState([]);

  // const fetchImagesFromFolder = async (folder) => {
  //   try {
  //     const response = await axios.get(`/config/fetchImages?folder=${folder}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching images:', error);
  //     return [];
  //   }
  // };


  const captureImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'combined-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  useEffect(() => {
    const fetchHeads = async () => {
      const listRef = ref(storage, 'heads/');
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setHeadsImages(urls);
      console.log("urls",urls)
    };

    const fetchBody = async () => {
      const listRef = ref(storage, 'heads/');
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setHeadsImages(urls);
      console.log("urls",urls)
    };

    fetchHeads();
  }, []);
 
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
            <Image alt="" src={images.rick} className="w-[100%]" />
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
              <div className="p-4 text-center border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {
                setTab("background")
              }}>
                BACKGROUND
              </div>
              <div className="p-4 text-center border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {
                setTab("head")
              }}>
                HEAD
              </div>
              <div className="p-4 text-center cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {
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

                  {/* <div>
                    {headsImages.map((image) => (
                      <img key={image.public_id} src={image.secure_url} alt={image.public_id} />
                    ))}
                  </div> */}

                </>
              }
              {
                tab === "body" &&
                <>
                  <div>
                    body
                  </div>

                  {/* <div>
                    {bodiesImages.map((image) => (
                      <img key={image.public_id} src={image.secure_url} alt={image.public_id} />
                    ))}
                  </div> */}
                </>
              }
            </div>
          </div>


          <div className=" w-[30%]">
            <div ref={captureRef} style={{ position: 'relative', width: '250px', height: '250px', backgroundColor: color }}>

              <Image alt="" src={images.body1} style={{ position: 'absolute', top: 0, left: 0 }} />
              <Image alt="" src={images.head1} style={{ position: 'absolute', top: 0, left: 0 }} />
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


