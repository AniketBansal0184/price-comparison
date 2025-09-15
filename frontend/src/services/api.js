import axios from "axios";

// WooCommerce base
const WC_BASE = process.env.REACT_APP_WC_BASE;
const CONSUMER_KEY = process.env.REACT_APP_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_WC_CONSUMER_SECRET;

// WordPress base from env
const WP_BASE = process.env.REACT_APP_WP_BASE;

// Fetch top-level WooCommerce categories
export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${WC_BASE}/products/categories`, {
      auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET },
      params: { per_page: 100, hide_empty: false },
    });

    // Only top-level
    const parents = data.filter(cat => !cat.parent || cat.parent === 0);
    const children = data.filter(cat => cat.parent && cat.parent !== 0);

    const categories = parents.map(parent => ({
      id: parent.id,
      name: parent.name,
      slug: parent.slug,
      count: parent.count,
      subcategories: children.filter(c => c.parent === parent.id)
    }));

    return categories;
  } catch (err) {
    console.error("WooCommerce categories error:", err.message);
    return [];
  }
};

// Fetch products
export const getProducts = async (category_id = "", per_page = 20) => {
  try {
    const { data } = await axios.get(`${WC_BASE}/products`, {
      auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET },
      params: { per_page, category: category_id || undefined },
    });
    return data.map(prod => ({
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      price: prod.price,
      regular_price: prod.regular_price,
      sale_price: prod.sale_price,
      image: prod.images?.[0]?.src || "",
      categories: prod.categories,
    }));
  } catch (err) {
    console.error("WooCommerce products error:", err.message);
    return [];
  }
};

// Fetch WordPress posts/blogs
export const getBlogs = async (per_page = 5) => {
  try {
    const { data } = await axios.get(`${WP_BASE}/posts`, { params: { per_page } });
    return data.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      image: post.featured_media || "",
      link: post.link,
    }));
  } catch (err) {
    console.error("WP posts error:", err.message);
    return [];
  }
};
