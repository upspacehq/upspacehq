// Local mock data (useful for dev or fallback)
export const localPosts = [
  {
    id: 1,
    slug: "future-of-artificial-intelligence",
    title: "The Future of Artificial Intelligence in 2025",
    excerpt: "Exploring how AI is transforming industries and what to expect in the coming years...",
    content: "Artificial Intelligence has come a long way in recent years...",
    category: "Technology",
    author: "John Doe",
    authorImage: "/images/authors/john-doe.jpg",
    coverImage: "/images/posts/ai-future.jpg",
    date: "2025-01-15",
    readTime: 5,
    tags: ["AI", "Technology", "Future"]
  },
  {
    id: 2,
    slug: "startup-funding-guide-2025",
    title: "Complete Guide to Startup Funding in 2025",
    excerpt: "Everything you need to know about raising capital for your startup...",
    content: "Raising funding for a startup in 2025 requires a strategic approach...",
    category: "Business",
    author: "Jane Smith",
    authorImage: "/images/authors/jane-smith.jpg",
    coverImage: "/images/posts/startup-funding.jpg",
    date: "2025-01-10",
    readTime: 8,
    tags: ["Startups", "Funding", "Business"]
  },
  // ... keep the rest of your posts unchanged
];

// Convenience export for code that expects a static `posts` array
export const posts = localPosts;

/**
 * Fetch posts from CMS API (Vercel, Contentful, Sanity, etc.)
 * Uses NEXT_PUBLIC_API_BASE from .env.local
 */
export async function fetchPostsFromCMS() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts from CMS");
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error("CMS fetch error:", error);
    // Fallback to local mock data
    return localPosts;
  }
}

/**
 * Get all posts (CMS first, fallback to local)
 */
export async function getAllPosts() {
  const posts = await fetchPostsFromCMS();
  return posts.length ? posts : localPosts;
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch post from CMS");
    const data = await res.json();
    return data.post || null;
  } catch (error) {
    console.error("CMS fetch error:", error);
    const posts = await getAllPosts();
    return posts.find((post) => post.slug === slug);
  }
}

/**
 * Get featured posts (e.g., latest 3)
 */
export async function getFeaturedPosts(limit = 3) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category) {
  const posts = await getAllPosts();
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}