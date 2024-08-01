'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-emerald-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          SocialClubFinder.com
        </Link>
        
        {/* Hamburger menu button */}
        <button 
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Desktop menu */}
        <ul className="hidden lg:flex space-x-4">
          <li><Link href="/" className="text-white hover:underline">Home</Link></li>
          <li><Link href="/spain" className="text-white hover:underline">Spain</Link></li>
          <li><Link href="/malta" className="text-white hover:underline">Malta</Link></li>
          <li><Link href="/germany" className="text-white hover:underline">Germany</Link></li>
          <li><Link href="/portugal" className="text-white hover:underline">Portugal</Link></li>
          <li><Link href="/growing" className="text-white hover:underline">Growing</Link></li>
        </ul>
      </div>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="mt-4 space-y-2">
          <li><Link href="/" className="block text-white hover:underline" onClick={toggleMenu}>Home</Link></li>
          <li><Link href="/spain" className="block text-white hover:underline" onClick={toggleMenu}>Spain</Link></li>
          <li><Link href="/malta" className="block text-white hover:underline" onClick={toggleMenu}>Malta</Link></li>
          <li><Link href="/germany" className="block text-white hover:underline" onClick={toggleMenu}>Germany</Link></li>
          <li><Link href="/portugal" className="block text-white hover:underline" onClick={toggleMenu}>Portugal</Link></li>
          <li><Link href="/growing" className="block text-white hover:underline" onClick={toggleMenu}>Growing</Link></li>

         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;