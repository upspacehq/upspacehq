import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/seo/SEO';
import { posts } from '../../data/posts';
import styles from '../../styles/PostContent.module.css';

export default function Post({ post }) {
  const router = useRouter();

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
              <div className={styles.author}>
                <div className={styles.authorImage}>
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className={styles.authorName}>{post.author}</p>
                  <p className={styles.date}>
                    {format(new Date(post.date), 'MMMM dd, yyyy')} · {post.readTime} min read
                  </p>
                </div>
              </div>
            </div>
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
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  return { props: { post: post || null } };
}