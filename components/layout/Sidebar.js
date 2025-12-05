import Link from 'next/link';
import { getCategories } from '../../lib/categories';
import { posts } from '../../data/posts';
import styles from '../../styles/Sidebar.module.css';

const Sidebar = () => {
  const categories = getCategories();

  // ✅ Dynamically get the latest 5 posts
  const recentPosts = posts.slice(0, 5);

  return (
    <aside className={styles.sidebar}>
      {/* ✅ Categories Widget */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          {categories.map(category => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className={styles.link}
              >
                {category.name}
                {category.count !== undefined && (
                  <span className={styles.count}>({category.count})</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Recent Posts Widget */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Recent Posts</h3>
        <ul className={styles.postList}>
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={styles.link}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Newsletter Widget */}
      <div className={`${styles.widget} ${styles.newsletterWidget}`}>
        <h3 className={styles.widgetTitle}>Newsletter</h3>
        <p>Get weekly updates delivered to your inbox.</p>
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Your email"
            aria-label="Email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;