// components/layout/Header.js
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import Search from '../common/Search';
import styles from '../../styles/Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.container}`}>
          {/* ✅ Logo */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo1.png"
              alt="UpSpaceX Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* ✅ Navigation */}
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/blog/category/newsinsights">News & Insights</Link>
            <Link href="/blog/category/education">Education</Link>
            <Link href="/blog/category/careersjobs">Careers & Jobs</Link>
            <Link href="/blog/category/technology">Technology</Link>
            <Link href="/blog/category/business">Business</Link>
            <Link href="/blog/category/sports">Sports</Link>
            <Link href="/blog/category/lifestyle">Lifestyle</Link>
            <Link href="/blog/category/health">Health</Link>
            <Link href="/blog/category/opinion">Opinion</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* ✅ Actions */}
          <div className={styles.actions}>
            <button
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <FiSearch />
            </button>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Search overlay */}
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;