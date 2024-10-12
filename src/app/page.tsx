"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HexColorPicker, HexColorInput } from "react-colorful";
import images from "./config/images";
import { storage } from "./config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import defaultBody from "../app/assets/BODY_Cfb_var1.png";
import defaultHead from "./assets/HEAD_Cfb_var0.png";
import mainImg from "./assets/Frame5.svg";
import Layout from "./layout";
import "./globals.css";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";

export default function Home() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState("#aabbcc");
  const [tab, setTab] = useState("background");

  const [headsImages, setHeadsImages] = useState([""]);
  const [bodiesImages, setBodiesImages] = useState([""]);
  const [glassesImages, setGlassesImages] = useState([""]);
  const [eyesImages, setEyesImages] = useState([""]);
  const [topImages, setTopImages] = useState([""]);
  const [earImages, setEarImages] = useState([""]);
  const [mouthImages, setMouthImages] = useState([""]);

  const [loading, setLoading] = useState(true);

  const [selectedBody, setselectedBody] = useState(
    "https://firebasestorage.googleapis.com/v0/b/meme-1851b.appspot.com/o/bodies%2FBODY_Cfb_var0.png?alt=media&token=6111f162-f6dc-4262-bb57-81eb33c543d6"
  );
  const [selectedHead, setselectedHead] = useState(
    "https://firebasestorage.googleapis.com/v0/b/meme-1851b.appspot.com/o/heads%2FHEAD_Cfb_var0.png?alt=media&token=e1ff5ea0-f6cf-4678-a91c-146ba907359f"
  );
  const [selectedEyes, setselectedEyes] = useState("");
  const [selectedGlasses, setselectedGlasses] = useState("");
  const [selectedTop, setselectedTop] = useState("");
  const [selectedEar, setselectedEar] = useState("");
  const [selectedMouth, setselectedMouth] = useState("");

  const [initialBodies, setInitialBodies] = useState([""]);
  const [initialHeads, setInitialHeads] = useState([""]);
  const [initialEyes, setInitialEyes] = useState([""]);
  const [initialGlasses, setInitialGlasses] = useState([""]);
  const [initialTop, setInitialTop] = useState([""]);
  const [initialEar, setInitialEar] = useState([""]);
  const [initialMouth, setInitialMouth] = useState([""]);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesLoadedEyes, setImagesEyesLoaded] = useState(false);
  const [imagesLoadedGlasses, setImagesGlassesLoaded] = useState(false);
  const [imagesLoadedTop, setImagesTopLoaded] = useState(false);
  const [imagesLoadedEar, setImagesEarLoaded] = useState(false);
  const [imagesLoadedMouth, setImagesMouthLoaded] = useState(false);
  // ring.register()

  const captureImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "combined-image.png";
        link.href = canvas.toDataURL("image/png");
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
    "#F39C12", // Dark Yellow
    "#D3D3D3", // Light Gray
    "#C8A2C8", // Lilac Gray
    "#32CD32", // Lime Green
    "#DA70D6", // Orchid Purple
    "#FFFFFF", // Pure White
    "#4169E1", // Royal Blue
    "#FA8072", // Salmon Pink
    "#87CEEB", // Sky Blue
    "#00FF7F", // Spring Green
    "#40E0D0", // Turquoise
    "#FFBF00", // Amber
    "#FFE135", // Banana Yellow
    "#CB4154", // Brick Red
    "#DE3163", // Cherry Red
    "#7DF9FF", // Electric Blue
    "#FF10F0", // Electric Pink
    "#B0FFB0", // Electric Purple (approximate based on name)
    "#FC8EAC", // Flamingo Pink
    "#AFEEEE", // Ice Blue
    "#E6E6FA"  // Lavender
  ];

  const shuffleColours = ["#fb85ab", "#f8d63f", "#5d71fc", "#b3fbfe"];

  function getRandomElementFromArray<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function getRandomHexColor(): string {
    const randomIndex = Math.floor(Math.random() * shuffleColours.length);

    return shuffleColours[randomIndex];
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

    const varIdentifier = match[1];

    let matchedImages: string[] = [];

    if (varIdentifier === "ALL") {
      matchedImages = initialBodies; // Set to all initial bodies if "varALL" is found
    } else {
      matchedImages = initialBodies.filter((imageUrl) => {
        return (
          imageUrl.includes(`var${varIdentifier}`) ||
          imageUrl.includes("varALL")
        );
      });
    }

    setBodiesImages(matchedImages);

    // if (matchedImages.length > 0) {
    //   const randomUrl = matchedImages[Math.floor(Math.random() * matchedImages.length)];
    //   setselectedBody(randomUrl);
    // }

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
      matchedImages = initialHeads.filter((imageUrl) => {
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

  const getVarNumber = (url: string): number => {
    const match = url.match(/var(\d+|ALL)/);
    if (match) {
      return match[1] === "ALL" ? -1 : parseInt(match[1], 10);
    }
    return -1;
  };

  function getRandomImageAndColor(
    headsImages: string[],
    bodiesImages: string[]
  ): { head: string; body: string; color: string } {
    if (!Array.isArray(headsImages) || !Array.isArray(bodiesImages)) {
      throw new Error("Both inputs must be arrays.");
    }

    if (headsImages.length === 0 || bodiesImages.length === 0) {
      throw new Error("Both arrays must have at least one element.");
    }

    // Function to extract the var number from the URL
    const randomHead = getRandomElementFromArray(headsImages);
    const headVarNumber = getVarNumber(randomHead);

    let randomBody: string;
    if (headVarNumber === -1) {
      randomBody = getRandomElementFromArray(bodiesImages);
    } else {
      do {
        randomBody = getRandomElementFromArray(bodiesImages);
      } while (
        getVarNumber(randomBody) !== headVarNumber &&
        getVarNumber(randomBody) !== -1
      );
    }

    // Generate a random color
    const randomColor = getRandomHexColor();

    console.log(
      "Shuffled results",
      headVarNumber,
      getVarNumber(randomHead),
      randomColor
    );
    setColor(randomColor);
    setselectedBody(randomBody);
    setselectedHead(randomHead);
    setBodyType(randomHead);
    setHeadType(randomHead);

    return {
      head: randomHead,
      body: randomBody,
      color: randomColor,
    };
  }

  useEffect(() => {
    const fetchHeads = async () => {
      const listRef = ref(storage, "faceskin/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setHeadsImages(urls);
      setInitialHeads(urls);
      // console.log("urls", urls);
    };

    const fetchEyes = async () => {
      const listRef = ref(storage, "eyes/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setEyesImages(urls);
      setInitialEyes(urls);
      setImagesEyesLoaded(true);
      // console.log("eyes", urls);
    };

    const fetchGlasses = async () => {
      const listRef = ref(storage, "glasses/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setGlassesImages(urls);
      setInitialGlasses(urls);
      setImagesGlassesLoaded(true);
      console.log("glasses", urls);
    };

    const fetchTop = async () => {
      const listRef = ref(storage, "hair/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setTopImages(urls);
      setInitialTop(urls);
      setImagesTopLoaded(true);
      console.log("top", urls);
    };

    const fetchEar = async () => {
      const listRef = ref(storage, "earrings/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setEarImages(urls);
      setInitialEar(urls);
      setImagesEarLoaded(true);
      console.log("ear", urls);
    };

    const fetchBody = async () => {
      const listRef = ref(storage, "bodies/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setBodiesImages(urls);
      setInitialBodies(urls);
      // console.log("urls", urls);
      setImagesLoaded(true);
    };

    const fetchMouth = async () => {
      const listRef = ref(storage, "mouth/");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setMouthImages(urls);
      setInitialMouth(urls);
      console.log("mouth", urls);
      setImagesMouthLoaded(true);
    };

    fetchMouth();
    fetchEar();
    fetchTop();
    fetchGlasses();
    fetchHeads();
    fetchBody();
    fetchEyes();
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
                <div className="bricolageSemibold text-3xl md:text-5xl lg:text-7xl text-black">
                  CREATE & DOWNLOAD YOUR PUNKS 12PX PFP!
                </div>
                <div className="mt-3 text-base md:text-xl lg:text-2xl workSans text-black">
                  Pick and choose between various elements to compose your Punk
                  12px PFP
                </div>
              </div>
              <div className="bricolageSemibold text-xl md:text-2xl lg:text-4xl text-black ">
                Read{" "}
                <span className=" text-[#FF6B00] underline cursor-pointer">
                  instructions
                </span>{" "}
                for more info
              </div>
            </div>
          </div>

          <div className="lg:flex p-6 lg:p-12 justify-between">
            <div className="w-full mb-5 lg:mb-0 lg:w-[60%] border-2 border-black bg-white ">
              <div className="grid grid-cols-4  bricolageSemibold text-xl md:text-3xl border-b-2 border-black">
                <div
                  className="col-span-2 sm:col-span-1 p-3 text-black text-center border-b-2  border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("background");
                  }}
                >
                  Background
                </div>
                <div
                  className="p-3 text-center border-b-2  border-r-2 text-black border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("head");
                  }}
                >
                  Head
                </div>
                <div
                  className="p-3 border-b-2  border-r-2 border-black text-center cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("top");
                  }}
                >
                  Top
                </div>

                <div
                  className="p-3 border-b-2  border-black text-center cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("eyes");
                  }}
                >
                  Eyes
                </div>

                <div
                  className="p-3 text-center border-r-2 border-black cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("glasses");
                  }}
                >
                  Glasses
                </div>

                <div
                  className="p-3 text-center border-r-2 border-black cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("mouth");
                  }}
                >
                  Mouth
                </div>

                <div
                  className="p-3 text-center border-r-2 border-black cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("earring");
                  }}
                >
                  Earring
                </div>

                <div
                  className="p-3 text-center cursor-pointer text-black hover:bg-[#FF6B00] transition duration-200"
                  onClick={() => {
                    setTab("body");
                  }}
                >
                  Body
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="bg-red-300">
                  {tab === "background" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Eyes
                        </div>
                        <div
                          className="text-black text-xl font-bold underline cursor-pointer"
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                          }}
                        >
                          Reset
                        </div>
                      </div>
                      <div className="sm:flex h-[400px] pt-3">
                        <div className="mr-10 pl-3 mb-5 sm:mb-0">
                          <HexColorPicker color={color} onChange={setColor} />
                          <HexColorInput color={color} onChange={setColor} />
                        </div>

                        <div className=" grid grid-cols-6 gap-10 pr-2 overflow-y-scroll">
                          {hexColors.map((color) => (
                            <div
                              key={color}
                              style={{ backgroundColor: color }}
                              className="w-16 h-16 border-2 border-black cursor-pointer"
                              onClick={() => setColor(color)}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {tab === "eyes" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Eyes
                        </div>
                        <div
                          className="text-black text-xl font-bold underline cursor-pointer"
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                        >
                          Reset
                        </div>
                      </div>
                      {imagesLoadedEyes ? (
                        <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                          {eyesImages.map((url, index) => (
                            <div
                              key={index}
                              className="border-2 z-20 border-black cursor-pointer max-h-[150px]"
                              onClick={() => {
                                setselectedEyes(url);
                              }}
                            >
                              <img
                                key={index}
                                src={url}
                                alt={`Image ${index}`}
                                style={{ width: "150px", height: "150px" }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Loader />
                      )}
                    </div>
                  )}
                  {tab === "glasses" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Glasses
                        </div>
                        <div
                          className="text-black text-xl font-bold underline cursor-pointer"
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                        >
                          Reset
                        </div>
                      </div>
                      <div>
                        {imagesLoadedGlasses ? (
                          <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                            {glassesImages.map((url, index) => (
                              <div
                                key={index}
                                className="border-2 z-20 border-black cursor-pointer max-h-[150px]"
                                onClick={() => {
                                  setselectedGlasses(url);
                                }}
                              >
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Image ${index}`}
                                  style={{ width: "150px", height: "150px" }}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  )}
                  {tab === "top" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Top
                        </div>
                        <div
                          className="text-black text-xl font-bold underline cursor-pointer"
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                        >
                          Reset
                        </div>
                      </div>
                      <div>
                        {imagesLoadedTop ? (
                          <div className="flex flex-wrap gap-3 h-[400px] pl-3 overflow-y-scroll pt-3">
                            {topImages.map((url, index) => (
                              <div
                                key={index}
                                className="border-2 z-20 border-black cursor-pointer max-h-[150px]"
                                onClick={() => {
                                  setselectedTop(url);
                                }}
                              >
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Image ${index}`}
                                  style={{ width: "150px", height: "150px" }}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  )}
                  {tab === "earring" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Earrings
                        </div>
                        <div
                          className="text-black text-xl font-bold underline cursor-pointer"
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                        >
                          Reset
                        </div>
                      </div>
                      <div>
                        {imagesLoadedEar ? (
                          <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                            {earImages.map((url, index) => (
                              <div
                                key={index}
                                className="border-2 z-20 border-black cursor-pointer max-h-[150px]"
                                onClick={() => {
                                  setselectedEar(url);
                                }}
                              >
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Image ${index}`}
                                  style={{ width: "150px", height: "150px" }}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  )}
                  {tab === "mouth" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Mouth
                        </div>
                        <div
                          className="text-black text-xl font-bold underline cursor-pointer"
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                        >
                          Reset
                        </div>
                      </div>
                      <div>
                        {imagesLoadedMouth ? (
                          <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
                            {mouthImages.map((url, index) => (
                              <div
                                key={index}
                                className="border-2 z-20 border-black cursor-pointer max-h-[150px]"
                                onClick={() => {
                                  setselectedMouth(url);
                                }}
                              >
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Image ${index}`}
                                  style={{ width: "150px", height: "150px" }}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  )}
                  {tab === "head" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Eyes
                        </div>
                        <div
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                          className="text-black text-xl font-bold underline cursor-pointer"
                        >
                          Reset
                        </div>
                      </div>

                      {imagesLoaded ? (
                        <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll z-0">
                          {headsImages.map((url, index) => (
                            <div
                              key={index}
                              className="border-2 border-black cursor-pointer max-h-[150px]"
                              onClick={() => {
                                setselectedHead(url);
                                setBodyType(url);
                              }}
                            >
                              <img
                                key={index}
                                src={url}
                                alt={`Image ${index}`}
                                style={{ width: "150px", height: "150px" }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Loader />
                      )}
                    </div>
                  )}
                  {tab === "body" && (
                    <div>
                      <div className="flex justify-between px-10 pt-3">
                        <div className="text-black text-xl font-semibold">
                          Select Eyes
                        </div>
                        <div
                          onClick={() => {
                            setBodiesImages(initialBodies);
                            setHeadsImages(initialHeads);
                            setselectedBody("");
                            setselectedHead("");
                            setselectedEar("");
                            setselectedEyes("");
                            setselectedGlasses("");
                            setselectedMouth("");
                            setselectedTop("");
                          }}
                          className="text-black text-xl font-bold underline cursor-pointer"
                        >
                          Reset
                        </div>
                      </div>
                      <div>
                        {imagesLoaded ? (
                          <div className="flex flex-wrap gap-3 h-[400px] pt-3 overflow-y-scroll pl-3">
                            {bodiesImages.map((url, index) => (
                              <div
                                key={index}
                                className="border-2 border-black cursor-pointer max-h-[150px]  "
                                onClick={() => {
                                  setselectedBody(url);
                                  setHeadType(url);
                                }}
                              >
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Image ${index}`}
                                  style={{ width: "150px", height: "150px" }}
                                  className="relative bottom-[4px]"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className=" grid grid-cols-2 bricolageSemibold gap-5 ">
                  <div
                    className="border-2 border-black text-black text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200"
                    onClick={() => {
                      getRandomImageAndColor(initialHeads, initialBodies);
                    }}
                  >
                    SHUFFLE
                  </div>
                  <div
                    className="border-2 border-black text-black text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200"
                    onClick={captureImage}
                  >
                    DOWNLOAD
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-[30%] min-h-[400px]">
              <div
                ref={captureRef}
                className="border-2 border-black"
                style={{
                  position: "relative",
                  width: "320px",
                  height: "320px",
                  backgroundColor: color,
                }}
              >
                {selectedBody !== "" && (
                  <Image
                    alt=""
                    src={selectedBody}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
                {selectedEyes !== "" && (
                  <Image
                    alt=""
                    src={selectedEyes}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
                {selectedGlasses !== "" && (
                  <Image
                    alt=""
                    src={selectedGlasses}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
                {selectedTop !== "" && (
                  <Image
                    alt=""
                    src={selectedTop}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
                {selectedMouth !== "" && (
                  <Image
                    alt=""
                    src={selectedMouth}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
                {selectedEar !== "" && (
                  <Image
                    alt=""
                    src={selectedEar}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
                {selectedHead !== "" && (
                  <Image
                    alt=""
                    src={selectedHead}
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    width={350} // Add width here
                    height={350} // Add height here
                  />
                )}
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
                Punks 12px are a free self-inscribe (Bitcoin) pixel art
                collection (Anno 2024) - first is first - with a total of 10 000
                Punks (12×12px)
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