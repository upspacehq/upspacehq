import categoriesData from '../data/categories.json';
import { posts } from '../data/posts';

export function getCategories() {
  return categoriesData.map(category => ({
    ...category,
    count: posts.filter(post => 
      post.category.toLowerCase() === category.name.toLowerCase()
    ).length
  }));
}

export function getCategoryBySlug(slug) {
  return categoriesData.find(cat => cat.slug === slug);
}