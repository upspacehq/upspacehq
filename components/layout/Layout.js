import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styles from '../../styles/Layout.module.css';

export default function Layout({ children, showSidebar = false }) {
  const [theme, setTheme] = useState('light');
  
  // ✅ Load saved theme or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
      localStorage.setItem('theme', initialTheme);
    }
  }, []);
  
  // ✅ Apply theme whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div className={styles.layout}>
      {/* ✅ Global Header */}
      <Header />

      {/* ✅ Theme Toggle Button */}
      <div className={styles.themeToggle}>
        <button onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.contentWrapper}>
            {/* ✅ Main content */}
            <div className={styles.content}>{children}</div>

            {/* ✅ Optional Sidebar */}
            {showSidebar && (
              <aside className={styles.sidebar}>
                <Sidebar />
              </aside>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Global Footer */}
      <Footer />
    </div>
  );
}