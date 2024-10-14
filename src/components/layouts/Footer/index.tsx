import React from 'react';

function Footer() {
  return (
    <footer className="border-t-2 border-black">
      <div className="p-12 " id="aboutus">
        <h2 className="bricolageSemibold text-6xl ">ABOUT US</h2>
        <p className="workSans text-2xl mt-4 ">PFP Meme Generator is a free tool to generate meme PFP with your favorite CFB style.</p>
        <button className="bricolageSemibold bg-black text-white text-2xl py-2 w-52 mt-4 text-center border-b-2 border-black">LEARN MORE</button>
      </div>

      <div className="p-12 bricolageSemibold  text-2xl border-t-2 border-black">PFP Meme Generator © {new Date().getFullYear()} - ALL RIGHTS ARE RESERVED.</div>
    </footer>
  );
}

export default Footer;
