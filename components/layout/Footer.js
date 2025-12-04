import Link from 'next/link';
import { FiTwitter, FiFacebook, FiLinkedin, FiInstagram } from 'react-icons/fi';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.about}>
            <h3>UpSpaceX</h3>
            <p>Your daily space for everything that matters.</p>
            <div className={styles.social}>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
            </div>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>

          <div className={styles.links}>
            <h4>Categories</h4>
            <Link href="/blog/category/technology">Technology</Link>
            <Link href="/blog/category/business">Business</Link>
            <Link href="/blog/category/innovation">Innovation</Link>
            <Link href="/blog/category/startups">Startups</Link>
          </div>

          <div className={styles.newsletter}>
            <h4>Newsletter</h4>
            <p>Subscribe to get the latest updates</p>
            <form className={styles.form}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} UpSpaceX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;