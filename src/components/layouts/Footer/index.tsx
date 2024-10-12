import React from 'react';

function Footer() {
  return (
    <footer className="border-t-2 border-black">
      <div className="p-12 " id="aboutus">
        <h2 className="bricolageSemibold text-6xl ">ABOUT US</h2>
        <p className="workSans text-2xl mt-4 ">Punks 12px are a free self-inscribe (Bitcoin) pixel art collection (Anno 2024) - first is first - with a total of 10,000 Punks (12×12px)</p>
        <div className="bricolageSemibold bg-black text-white text-2xl py-2 w-52 mt-4 text-center border-b-2 border-black">LEARN MORE</div>
      </div>

      <div className="p-12 bricolageSemibold  text-2xl border-t-2 border-black">IllEGAL MEMES © 2024 - ALL RIGHTS ARE RESERVED.</div>
    </footer>
  );
}

export default Footer;
