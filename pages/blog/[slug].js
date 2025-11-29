import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/seo/SEO';
import { getAllPosts, getPostBySlug } from '../../data/posts';
import styles from '../../styles/PostContent.module.css';

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>Loading…</h1>
          <p>We’re preparing this article for you.</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>Post not found</h1>
          <p>The article you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={`${post.title} | UpSpace`}
        description={post.excerpt}
        image={post.coverImage}
        article={true}
      />

      <article className={styles.article}>
        <div className="container">
          <header className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>

            <div className={styles.meta}>
              <div className={styles.authorInfo}>
                <div className={styles.authorAvatar}>
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div className={styles.authorDetails}>
                  <p className={styles.authorName}>{post.author}</p>
                  <p className={styles.date}>
                    {format(new Date(post.date), 'MMMM dd, yyyy')} · {post.readTime} min read
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Cover Image */}
            <img
              src={post.coverImage}
              alt={post.title}
              className={styles.coverImage}
            />
          </header>

          <div className={styles.content}>
            <p>{post.content}</p>
          </div>

          <div className={styles.tags}>
            {post.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts(); // ✅ fetch from CMS or fallback
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: true }; // ✅ dynamic CMS support
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: { post: post || null },
    revalidate: 60, // ✅ ISR: refresh every 60s
  };
}