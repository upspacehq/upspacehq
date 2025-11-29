// pages/api/posts/[slug].js
import { localPosts } from '../../../data/posts';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    // Try fetching from CMS API
    const cmsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${slug}`);
    if (!cmsRes.ok) throw new Error('CMS fetch failed');

    const data = await cmsRes.json();
    if (data.post) {
      return res.status(200).json({ post: data.post });
    }
  } catch (error) {
    console.error('CMS error (falling back to local):', error);
    // Fallback to local mock data
    const post = localPosts.find((p) => p.slug === slug);
    if (post) {
      return res.status(200).json({ post });
    }
  }

  return res.status(404).json({ error: 'Post not found' });
}