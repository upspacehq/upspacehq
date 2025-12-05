import categoriesData from '../data/categories.json';
import { posts } from '../data/posts';

/**
 * Get all categories with dynamic post counts
 */
export function getCategories() {
  return categoriesData.map(category => ({
    ...category,
    count: posts.filter(
      post => post.category.toLowerCase() === category.slug.toLowerCase()
    ).length
  }));
}

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug) {
  return categoriesData.find(cat => cat.slug === slug);
}