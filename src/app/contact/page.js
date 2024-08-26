import Link from 'next/link';
import styles from './LinkTree.module.css';

const LinkTree = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact</h1>
      <h4 className={styles.h4}>SocialClubfinder</h4>
      <div className={styles.linkBox}>
        <Link href="https://t.me/socialclubfinder" target="_blank">
          Telegram
        </Link>
      </div>
     
      <div className={styles.linkBox}>
        <Link href="mailto:420ganjacoin@gmail.com" target="_blank">
          Email
        </Link>
        </div>
       <h4 className={styles.h4}>Ganjacoin</h4>
      <div className={styles.linkBox}>
        <Link href="https://ganjacoin.wtf" target="_blank">
          ganjacoin.wtf
        </Link>
      </div>
      <div className={styles.linkBox}>
        <Link href="https://x.com/ganjacoin420" target="_blank">
          X.com
        </Link>
      </div>
      <h4 className={styles.h4}>Dev Links</h4>
      <div className={styles.linkBox}>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          GitHub
        </Link>
      </div>
      {/* <div className={styles.linkBox}></div> */}
    </div>
  );
};

export default LinkTree;
