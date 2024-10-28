import { useState, useCallback } from 'react';
import NextImage from 'next/image';
import { Button } from '../../../components/ui/button';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { GridLoader } from 'react-spinners';

interface SelectPanelProps {
  tab: string;
  setTab: (tab: any) => void;
  selected: any;
  setSelected: (selected: any) => void;
  imageCategories: any;
  imagesLoaded: any;
  resetSelections: () => void;
  getRandomImages: () => void;
  setBodyType?: (body: string) => void;
  setSkinTypeFromSkin?: (skin: string) => void;
  color: string;
  setColor: (color: string) => void;
}

const SelectPanel: React.FC<SelectPanelProps> = ({
  tab,
  setTab,
  selected,
  setSelected,
  imageCategories,
  imagesLoaded,
  resetSelections,
  getRandomImages,
  setBodyType,
  setSkinTypeFromSkin,
  color,
  setColor,
}) => {
  const renderTabContent = useCallback(() => {
    if (tab === 'background') {
      return (
        <div className="flex-1 w-full">
          <div className="flex justify-between px-10 pt-3">
            <div className=" text-xl font-semibold">Select Background</div>
            <div className=" text-xl font-bold underline cursor-pointer" onClick={resetSelections}>
              Reset
            </div>
          </div>
          <div className="sm:flex pt-3">
            <div className="mr-10 pl-3 mb-5 sm:mb-0">
              <HexColorPicker
                color={color}
                onChange={(newColor) => {
                  setSelected((prev: any) => ({ ...prev, background: '' }));
                  setColor(newColor);
                }}
              />
              <HexColorInput
                color={color}
                onChange={(newColor) => {
                  setSelected((prev: any) => ({ ...prev, background: '' }));
                  setColor(newColor);
                }}
              />
            </div>
            <div className="flex-1 pl-3 min-h-96">
              {imagesLoaded.background ? (
                <div className="flex flex-wrap gap-3 h-[400px] overflow-y-scroll">
                  {imageCategories.background.state[0].map((url: string, index: number) => (
                    <div
                      key={index}
                      className={`border-2 z-20 border-black cursor-pointer max-h-[150px] ${selected.background === url ? 'border-blue-500' : ''}`}
                      onClick={() => {
                        setSelected((prev: any) => ({ ...prev, background: url }));
                      }}
                    >
                      <NextImage src={url} alt={`Background ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <GridLoader color="white" />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    const categoryMap: Record<string, { images: string[]; loaded: boolean }> = {
      background: { images: imageCategories.background.state[0], loaded: imagesLoaded.background },
      body: { images: imageCategories.body.state[0], loaded: imagesLoaded.body },
      skin: { images: imageCategories.skin.state[0], loaded: imagesLoaded.skin },
      eyes: { images: imageCategories.eyes.state[0], loaded: imagesLoaded.eyes },
      top: { images: imageCategories.top.state[0], loaded: imagesLoaded.top },
      mouth: { images: imageCategories.mouth.state[0], loaded: imagesLoaded.mouth },
      glasses: { images: imageCategories.glasses.state[0], loaded: imagesLoaded.glasses },
      earrings: { images: imageCategories.earrings.state[0], loaded: imagesLoaded.earrings },
    };

    const currentCategory = categoryMap[tab];

    return (
      <div className="flex-1 w-full min-h-96">
        <div className="flex justify-between px-10 pt-3">
          <div className=" text-xl font-semibold">Select {tab.charAt(0).toUpperCase() + tab.slice(1)}</div>
          <div className=" text-xl font-bold underline cursor-pointer" onClick={resetSelections}>
            Reset
          </div>
        </div>
        {currentCategory.loaded ? (
          <div className="flex flex-wrap gap-3 h-[400px] pt-3 pl-3 overflow-y-scroll">
            {currentCategory.images.map((url: string, index: number) => (
              <div
                key={index}
                className="border-2 z-20 border-black bg-white cursor-pointer max-h-[150px]"
                onClick={() => {
                  setSelected((prev: any) => ({ ...prev, [tab]: url }));
                  if (tab === 'body' && setBodyType) {
                    setBodyType(url);
                  }
                  if (tab === 'skin' && setSkinTypeFromSkin) {
                    setSkinTypeFromSkin(url);
                  }
                }}
              >
                <NextImage src={url} alt={`${tab} ${index}`} width={144} height={144} className="w-36 h-36 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <GridLoader color="white" />
          </div>
        )}
      </div>
    );
  }, [tab, imageCategories, imagesLoaded, resetSelections, setSelected, color, setColor, setBodyType, setSkinTypeFromSkin]);

  return (
    <div className="border-2 border-black flex-1">
      <div className="grid grid-cols-4 bricolageSemibold text-xl md:text-3xl border-b-2 border-black">
        {[
          { label: 'Background', value: 'background' },
          { label: 'Body', value: 'body' },
          { label: 'Skin', value: 'skin' },
          { label: 'Eyes', value: 'eyes' },
          { label: 'Top', value: 'top' },
          { label: 'Mouth', value: 'mouth' },
          { label: 'Glasses', value: 'glasses' },
          { label: 'Earrings', value: 'earrings' },
        ].map((tabItem) => (
          <div
            key={tabItem.value}
            className={`p-3 text-center border-b-2 border-r-2 border-black cursor-pointer hover:bg-[#FF6B00] transition duration-200 ${tab === tabItem.value ? 'bg-[#FF6B00]' : ''}`}
            onClick={() => setTab(tabItem.value)}
          >
            {tabItem.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between p-4">
        {renderTabContent()}

        <div className="w-full flex justify-around bricolageSemibold gap-5 mt-5">
          <Button className="w-full text-xl sm:text-3xl text-center py-3 cursor-pointer hover:bg-[#FF6B00] transition duration-200" onClick={getRandomImages}>
            SHUFFLE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPanel;
