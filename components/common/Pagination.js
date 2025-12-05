import styles from '../../styles/Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // ✅ Generate page numbers with ellipsis
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  
  return (
    <nav className={styles.pagination} aria-label="Pagination Navigation">
      {/* Previous Button */}
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className={styles.numbers}>
        {pages.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className={styles.ellipsis}
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.number} ${
                page === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        Next →
      </button>
    </nav>
  );
};

export default Pagination;