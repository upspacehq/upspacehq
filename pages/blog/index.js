import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/seo/SEO';
import PostCard from '../../components/blog/PostCard';
import Pagination from '../../components/common/Pagination';
import { posts } from '../../data/posts';
import styles from '../../styles/Blog.module.css';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const router = useRouter();
  const { search, page = '1' } = router.query;
  
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  
  // ✅ Ensure currentPage updates when query changes
  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page]);
  
  // ✅ Filter posts by search query
  const filteredPosts = search ?
    posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    ) :
    posts;
  
  // ✅ Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push({
      pathname: '/blog',
      query: { ...router.query, page: newPage }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Layout showSidebar={true}>
      <SEO
        title="Blog - UpSpaceX | Latest Insights"
        description="Explore articles on technology, business, education, careers, sports, lifestyle, health, and opinion."
      />

      <div className={styles.blog}>
        <div className="container">
          <header className={styles.header}>
            <h1>Latest Articles</h1>
            <p>Discover insights across all categories</p>
            {search && (
              <p className={styles.searchInfo}>
                Showing results for: <strong>"{search}"</strong>
              </p>
            )}
          </header>

          {currentPosts.length > 0 ? (
            <>
              <div className={styles.grid}>
                {currentPosts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              <p>No articles found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}