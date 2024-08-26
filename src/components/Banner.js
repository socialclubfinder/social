// components/BannerAd.js
import Image from 'next/image';

const Banner = () => (
  <div className="flex justify-center">
    <a 
      href="https://freebitco.in/?r=19278965" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <Image
        src="https://static1.freebitco.in/banners/728x90-3.png"
        alt="Free Bitcoin Banner"
        width={728}
        height={90}
      />
    </a>
  </div>
);

export default Banner;
