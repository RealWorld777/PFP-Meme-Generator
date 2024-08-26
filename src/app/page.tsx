
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HexColorPicker, HexColorInput } from "react-colorful";
import images from "./config/images";
import { storage } from './config/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import defaultBody from "../app/assets/BODY_Cfb_var1.png";
import defaultHead from "./assets/HEAD_Cfb_var0.png"
import mainImg from "./assets/Frame5.svg"
import Layout from "./layout";
import './globals.css';
export default function Home() {

  const captureRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#aabbcc");
  const [tab, setTab] = useState("background")
  const [headsImages, setHeadsImages] = useState([""]);
  const [bodiesImages, setBodiesImages] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [selectedBody, setselectedBody] = useState("")
  const [selectedHead, setselectedHead] = useState("")
  const [initialBodies, setInitialBodies] = useState([""])
  const [initialHeads, setInitialHeads] = useState([""])


  const captureImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'combined-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const hexColors = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#F1C40F", // Yellow
    "#9B59B6", // Purple
    "#E74C3C", // Red
    "#1ABC9C", // Turquoise
    "#2ECC71", // Green
    "#3498DB", // Light Blue
    "#E67E22", // Orange
    "#2980B9", // Dark Blue
    "#8E44AD", // Dark Purple
    "#C0392B", // Dark Red
    "#D35400", // Dark Orange
    "#16A085", // Dark Turquoise
    "#F39C12"  // Dark Yellow
  ];

  function getRandomElementFromArray<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function getRandomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function extractMetadata(url: string): string | null {
    const regex = /%(.*?\.png)/;
    const match = url.match(regex);

    if (match) {
      const extracted = match[1];
      return extracted.substring(2);
    }

    return null;
  }

  function setBodyType(url: string): string[] {
    const match = url.match(/var(\d+|ALL)/); // Match either a number or "ALL"
    if (!match) {
      return [];
    }

    const varNumber = match[1];

    let matchedImages: string[] = [];

    if (varNumber === "ALL") {
      matchedImages = initialBodies; // Set to all initial bodies if "varALL" is found
    } else {
      matchedImages = initialBodies.filter(imageUrl => {
        return imageUrl.includes(`var${varNumber}`);
      });
    }

    setBodiesImages(matchedImages);

    if (matchedImages.length > 0) {
      const randomUrl = matchedImages[Math.floor(Math.random() * matchedImages.length)];
      setselectedBody(randomUrl);
    }

    return matchedImages;
  }

  function setHeadType(url: string): string[] {
    const match = url.match(/var(\d+|ALL)/); // Match either a number or "ALL"
    if (!match) {
      console.log("not matching");
      return [];
    }

    const varNumber = match[1];

    let matchedImages: string[] = [];

    if (varNumber === "ALL") {
      matchedImages = initialHeads; // Set to all initial heads if "varALL" is found
    } else {
      matchedImages = initialHeads.filter(imageUrl => {
        return imageUrl.includes(`var${varNumber}`);
      });
    }

    setHeadsImages(matchedImages);

    // if (matchedImages.length > 0) {
    //   const randomUrl = matchedImages[Math.floor(Math.random() * matchedImages.length)];
    //   setselectedHead(randomUrl);
    // }

    return matchedImages;
  }



  function getRandomImageAndColor(headsImages: string[], bodiesImages: string[]): { head: string; body: string; color: string } {
    if (!Array.isArray(headsImages) || !Array.isArray(bodiesImages)) {
      throw new Error('Both inputs must be arrays.');
    }

    if (headsImages.length === 0 || bodiesImages.length === 0) {
      throw new Error('Both arrays must have at least one element.');
    }

    // Function to extract the var number from the URL
    const getVarNumber = (url: string): number => {
      const match = url.match(/var(\d+|ALL)/);
      if (match) {
        return match[1] === 'ALL' ? -1 : parseInt(match[1], 10);
      }
      return -1;
    };

    // Get a random body image
    const randomHead = getRandomElementFromArray(headsImages);
    const headVarNumber = getVarNumber(randomHead);

    // Get a random head image that matches the body’s var number
    let randomBody: string;
    if (headVarNumber === -1) { // If body has varALL
      randomBody = getRandomElementFromArray(bodiesImages);
    } else {
      do {
        randomBody = getRandomElementFromArray(bodiesImages);
      } while (getVarNumber(randomBody) !== headVarNumber);
    }

    // Generate a random color
    const randomColor = getRandomHexColor();

    console.log("Shuffled results", headVarNumber, getVarNumber(randomHead), randomColor);
    setColor(randomColor)
    setselectedBody(randomBody)
    setselectedHead(randomHead)
    setBodyType(randomBody)

    return {
      head: randomHead,
      body: randomBody,
      color: randomColor,
    };
  }


  useEffect(() => {
    const fetchHeads = async () => {
      const listRef = ref(storage, 'heads/');
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setHeadsImages(urls);
      setInitialHeads(urls)
      console.log("urls", urls)
    };

    const fetchBody = async () => {
      const listRef = ref(storage, 'bodies/');
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setBodiesImages(urls);
      setInitialBodies(urls)
      console.log("urls", urls)
    };

    fetchHeads();
    fetchBody();

  }, []);

  return (
    <Layout>
      <div className="bg-[#E1E1E1] flex  justify-center ">

        <div className="w-[100%]  flex flex-col    ">

          <div className="sm:flex w-[100%]  border-t-2 border-b-2 border-black">
            <div className="w-[100%] sm:w-[50%] border-b-2 sm:border-b-0  sm:border-r-2 border-black">
              <Image alt="" src={mainImg} className="w-[100%]" />
            </div>
            <div className=" flex flex-col justify-between px-7 py-5 md:px-12 md:py-8 w-[100%] sm:w-1/2 bg-white">
              <div>

                <div className="bricolageSemibold text-3xl md:text-5xl lg:text-7xl text-black">CREATE & DOWNLOAD YOUR PUNKS 12PX PFP!</div>
                <div className="mt-3 text-base md:text-xl lg:text-2xl workSans text-black">Pick and choose between various elements to compose your Punk 12px PFP</div>
              </div>
              <div className="bricolageSemibold text-xl md:text-2xl lg:text-4xl text-black ">Read <span className=" text-[#FF6B00] underline cursor-pointer">instructions</span>  for more info</div>
            </div>
          </div>



          <div className="lg:flex p-6 lg:p-12 justify-between">

            <div className="w-full mb-5 lg:mb-0 lg:w-[60%] border-2 border-black bg-white ">
              <div className="grid grid-cols-4 sm:grid-cols-3 bricolageSemibold text-xl md:text-3xl border-b-2 border-black">
                <div className="col-span-2 sm:col-span-1 p-4 text-black text-center  border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {
                  setTab("background")
                }}>
                  BACKGROUND
                </div>
                <div className="p-4 text-center border-r-2 text-black border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {
                  setTab("head")
                }}>
                  HEAD
                </div>
                <div className="p-4 text-center cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200" onClick={() => {
                  setTab("body")
                }}>
                  BODY
                </div>
              </div>

              <div className="p-12 h-[90%] flex flex-col justify-between">

                {tab === "background" &&
                  <div className="sm:flex ">
                    <div className="mr-10 mb-5 sm:mb-0">

                      <HexColorPicker color={color} onChange={setColor} />
                      <HexColorInput color={color} onChange={setColor} />

                    </div>

                    <div className=" flex flex-wrap gap-2">
                      {hexColors.map(color => (
                        <div
                          key={color}
                          style={{ backgroundColor: color }}
                          className="w-16 h-16 border-2 border-black cursor-pointer"
                          onClick={() => setColor(color)}
                        ></div>
                      ))}
                    </div>

                  </div>
                }
                {
                  tab === "head" &&
                  <div>
                    <div className="flex justify-between">
                      <div className="workSans text-2xl mb-5 text-black">
                        Select Head

                      </div>
                      <div className="text-black text-2xl workSans cursor-pointer" onClick={() => {
                        setBodiesImages(initialBodies)
                        setHeadsImages(initialHeads)
                        setselectedBody("")
                        setselectedHead("")
                      }}>
                        Reset Options
                      </div>
                    </div>


                    <div className="flex flex-wrap gap-3 h-[400px] overflow-y-scroll">
                      {headsImages.map((url, index) => (
                        <div key={index} className="border-2 border-black cursor-pointer max-h-[150px]"
                          onClick={() => {
                            setselectedHead(url)
                            setBodyType(url)
                          }}
                        >
                          <img key={index} src={url} alt={`Image ${index}`} style={{ width: '150px', height: '150px' }} />
                        </div>
                      ))}
                    </div>

                  </div>
                }
                {
                  tab === "body" &&
                  <div>
                    <div className="flex justify-between">
                      <div className="workSans text-2xl mb-5 text-black">
                        Select Body

                      </div>
                      <div className="text-black text-2xl workSans cursor-pointer" onClick={() => {
                         setBodiesImages(initialBodies)
                         setHeadsImages(initialHeads)
                         setselectedBody("")
                         setselectedHead("")
                      }}>
                        Reset Options
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 h-[350px] overflow-y-scroll">
                      {bodiesImages.map((url, index) => (
                        <div key={index} className="border-2 border-black cursor-pointer max-h-[150px]  "
                          onClick={() => {
                            setselectedBody(url)
                            setHeadType(url)
                          }}
                        >
                          <img key={index} src={url} alt={`Image ${index}`} style={{ width: '150px', height: '150px' }} className="relative bottom-[4px]" />
                        </div>
                      ))}
                    </div>
                  </div>
                }

                <div className="mt-5 grid grid-cols-2 bricolageSemibold gap-5 ">
                  <div className="border-2 border-black text-black text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={() => {
                    getRandomImageAndColor(initialHeads, initialBodies);
                  }}>
                    SHUFFLE
                  </div>
                  <div className="border-2 border-black text-black text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={captureImage}>
                    DOWNLOAD
                  </div>
                </div>
              </div>
            </div>


            <div className=" w-[30%] min-h-[400px]">
              <div ref={captureRef} className="border-2 border-black" style={{ position: 'relative', width: '320px', height: '320px', backgroundColor: color }}>
                {selectedBody !== ""
                  &&
                  <Image
                    alt=""
                    src={selectedBody}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                }
                {selectedHead !== ""
                  &&

                  <Image
                    alt=""
                    src={selectedHead}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                }
              </div>

              <div className=" w-[320px]">
                <div className=" bricolageSemibold text-4xl mt-5 text-black">
                  METADATA
                </div>
                <div className="text-xl bg-white border-2 text-black border-dashed workSans border-black py-5 px-2 mt-2">
                  background: {color}
                </div>
                <div className="text-xl bg-white border-2 border-dashed text-black workSans border-black py-5 px-2 mt-2">
                  head: {extractMetadata(selectedHead)}
                </div>
                <div className="text-xl bg-white border-2 border-dashed text-black workSans border-black py-5 px-2 mt-2">
                  body: {extractMetadata(selectedBody)}
                </div>
              </div>
            </div>


          </div>

          <footer className="border-t-2 border-black">
            <div className="p-12 bg-[#FF6B00]" id="aboutus">
              <div className="bricolageSemibold text-6xl text-black">
                ABOUT US
              </div>
              <div className="workSans text-2xl mt-4 text-black">
                Punks 12px are a free self-inscribe (Bitcoin) pixel art collection (Anno 2024) - first is first - with a total of 10 000 Punks (12×12px)
              </div>
              <div className=" bricolageSemibold bg-black text-white text-2xl py-2 w-52 mt-4 text-center border-b-2 border-black ">
                LEARN MORE
              </div>
            </div>

            <div className=" bg-white p-12 bricolageSemibold text-black text-2xl border-t-2 border-black">
              IllEGAL MEMES © 2024 - ALL RIGHTS ARE RESERVED.
            </div>
          </footer>
        </div>
      </div>
    </Layout>
  );
}


