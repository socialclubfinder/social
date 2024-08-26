"use client"

import { useEffect } from 'react';
import styles from './AdBanner.module.css';

const AdBanner = () => {
  useEffect(() => {
    // Define the ad options
    window.atOptions = {
      key: '918178f4dfea0bb06c8e8d535990f857',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {}
    };

    // Create a script element and set its attributes
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.topcreativeformat.com/918178f4dfea0bb06c8e8d535990f857/invoke.js';

    // Append the script to the ad container
    const adContainer = document.getElementById('ad-container');
    adContainer.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      if (adContainer) {
        adContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="ad-container" className={styles.adContainer}>
      {/* Ad will load here */}
    </div>
  );
};

export default AdBanner;
