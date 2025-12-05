import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Search.module.css';

// ✅ Inline SVG icons (no external dependency)
const SearchIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = ({ className = '' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Search = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // ✅ Reset state when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);
  
  // ✅ Debounced search
  useEffect(() => {
    const searchPosts = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    
    const debounce = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounce);
  }, [query]);
  
  const handleResultClick = (slug) => {
    router.push(`/blog/${slug}`);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* ✅ Close button */}
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close search"
        >
          <CloseIcon />
        </button>

        {/* ✅ Search form */}
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <SearchIcon className={styles.icon} />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            autoFocus
            aria-label="Search articles"
          />
        </form>

        {/* ✅ Loading state */}
        {loading && <div className={styles.loading}>Searching...</div>}

        {/* ✅ Results */}
        {!loading && results.length > 0 && (
          <div className={styles.results}>
            {results.map((post) => (
              <div
                key={post.id}
                className={styles.result}
                onClick={() => handleResultClick(post.slug)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleResultClick(post.slug)}
              >
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className={styles.category}>{post.category}</span>
              </div>
            ))}
          </div>
        )}

        {/* ✅ No results */}
        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;