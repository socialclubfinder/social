import { useEffect } from 'react';
import styles from './AdBanner468.module.css'; // Import your CSS module if you need custom styling

const AdBanner468 = () => {
  useEffect(() => {
    // Set up the ad options
    window.atOptions = {
      key: '90db7064a68eb00d4b674af482b56ba3',
      format: 'iframe',
      height: 50,
      width: 320,
      params: {}
    };

    // Create and append the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.topcreativeformat.com/89ba1e3c7be5c45c1636ffc549edf993/invoke.js';

    const adContainer = document.getElementById('ad-container');
    if (adContainer) {
      adContainer.appendChild(script);
    }

    // Clean up script on component unmount
    return () => {
      if (adContainer && script.parentNode) {
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

export default AdBanner468;
