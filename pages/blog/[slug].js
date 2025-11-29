import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/seo/SEO';
import { getAllPosts, getPostBySlug } from '../../data/posts';
import styles from '../../styles/PostContent.module.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // ✅ Theme

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

            <img
              src={post.coverImage}
              alt={post.title}
              className={styles.coverImage}
            />
          </header>

          {/* ✅ Render Markdown with syntax highlighting */}
          <div className={styles.content}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
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
  const posts = await getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: { post: post || null },
    revalidate: 60,
  };
}