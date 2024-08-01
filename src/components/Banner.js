import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full" style={{ width:'720', height: '90px' }}> {/* Adjust height as needed */}
      <Image
        src="/images/socialclubfinder_banner.png"
        alt="Social Club Finder Banner"
        layout="fill"
        objectFit="contain"
        priority
      />
    </div>
  );
}