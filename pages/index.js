import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css';
import PostCard from '../components/blog/PostCard';
import { getFeaturedPosts } from '../data/posts';

export default function Home({ featuredPosts }) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.brand}>UpSpaceX</span>
        </h1>
        <p className={styles.subtitle}>
          Curated insights in technology, business, and innovation — daily.
        </p>
        <div className={styles.cta}>
          <a href="/blog" className={styles.ctaButton}>Explore Blog</a>
        </div>
      </section>

      {/* Featured Posts */}
      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Featured Posts</h2>
        <div className={styles.grid}>
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Explore Topics</h2>
        <div className={styles.categoryGrid}>
          <a href="/blog/category/technology" className={styles.categoryCard}>Technology</a>
          <a href="/blog/category/business" className={styles.categoryCard}>Business</a>
          <a href="/blog/category/innovation" className={styles.categoryCard}>Innovation</a>
          <a href="/blog/category/startups" className={styles.categoryCard}>Startups</a>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <h2 className={styles.sectionTitle}>Stay Ahead</h2>
        <p className={styles.subtitle}>Subscribe for weekly insights and updates.</p>
        <form className={styles.form}>
          <input type="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </Layout>
  );
}

// ✅ Fetch posts dynamically at build time
export async function getStaticProps() {
  const featuredPosts = await getFeaturedPosts(3);
  
  return {
    props: {
      featuredPosts,
    },
    revalidate: 60, // ✅ ISR: refresh every 60s
  };
}