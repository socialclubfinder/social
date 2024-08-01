import Link from 'next/link';
import Banner from '@/components/Banner';

export default function Custom404() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-8">Oops! The social club you're looking for doesn't exist or has moved.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Return to Map
        </Link>
      </div>
    </div>
  );
}