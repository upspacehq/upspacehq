import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import styles from '../../styles/PostCard.module.css';

const PostCard = ({ post }) => {
  return (
    <article className={styles.card}>
      {/* ✅ Cover image + category badge */}
      <Link href={`/blog/${post.slug}`} className={styles.imageWrapper}>
        <Image
          src={post.coverImage || '/images/placeholder.jpg'}
          alt={post.title}
          width={600}
          height={400}
          className={styles.image}
          priority={false}
        />
        {post.category && (
          <span className={`${styles.badge} ${post.category.toLowerCase()}`}>
            {post.category}
          </span>
        )}
      </Link>

      {/* ✅ Content */}
      <div className={styles.content}>
        {/* Meta info */}
        <div className={styles.meta}>
          {post.author && (
            <span className={styles.author}>By {post.author}</span>
          )}
          {post.date && (
            <span className={styles.date}>
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </span>
          )}
          {post.readTime && (
            <span className={styles.readTime}>{post.readTime} min read</span>
          )}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className={styles.title}>
          {post.title}
        </Link>

        {/* Excerpt */}
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

        {/* Read more link */}
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;