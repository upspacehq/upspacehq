import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css';
import PostCard from '../components/blog/PostCard';
import posts from '../data/posts.json'; // example data source

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.brand}>UpSpace</span>
        </h1>
        <p className={styles.subtitle}>
          A modern blog and content platform built with Next.js.
        </p>
      </section>

      {/* Featured Posts */}
      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Featured Posts</h2>
        <div className={styles.grid}>
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </Layout>
  );
}