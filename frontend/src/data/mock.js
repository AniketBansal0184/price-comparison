// Mock data for PriceSpy clone
export const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      { id: 1, name: 'Smartphones', slug: 'smartphones' },
      { id: 2, name: 'Laptops', slug: 'laptops' },
      { id: 3, name: 'Headphones', slug: 'headphones' },
      { id: 4, name: 'Cameras', slug: 'cameras' },
      { id: 5, name: 'Gaming', slug: 'gaming' }
    ]
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    subcategories: [
      { id: 6, name: 'Men\'s Clothing', slug: 'mens-clothing' },
      { id: 7, name: 'Women\'s Clothing', slug: 'womens-clothing' },
      { id: 8, name: 'Shoes', slug: 'shoes' },
      { id: 9, name: 'Accessories', slug: 'accessories' }
    ]
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    subcategories: [
      { id: 10, name: 'Furniture', slug: 'furniture' },
      { id: 11, name: 'Kitchen', slug: 'kitchen' },
      { id: 12, name: 'Garden', slug: 'garden' },
      { id: 13, name: 'Decor', slug: 'decor' }
    ]
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    subcategories: [
      { id: 14, name: 'Gym Equipment', slug: 'gym-equipment' },
      { id: 15, name: 'Outdoor Sports', slug: 'outdoor-sports' }
    ]
  }
];

export const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    subcategory: 'Smartphones',
    description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and pro camera system.',
    specs: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Camera': 'Pro camera system 48MP',
      'Battery': 'Up to 29 hours video playback',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Material': 'Titanium'
    },
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800'
    ],
    rating: 4.8,
    reviewCount: 2847,
    stores: [
      {
        id: 1,
        name: 'Apple Store',
        logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100',
        price: 1199,
        shipping: 'Free',
        link: 'https://apple.com',
        isBestPrice: true
      },
      {
        id: 2,
        name: 'Best Buy',
        logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100',
        price: 1249,
        shipping: '$9.99',
        link: 'https://bestbuy.com'
      },
      {
        id: 3,
        name: 'Amazon',
        logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
        price: 1229,
        shipping: 'Free',
        link: 'https://amazon.com'
      }
    ]
  },
  {
    id: 2,
    name: 'MacBook Pro 14-inch',
    category: 'Electronics',
    subcategory: 'Laptops',
    description: 'Supercharged by M3 Pro and M3 Max chips. Built for all types of creatives.',
    specs: {
      'Display': '14.2-inch Liquid Retina XDR',
      'Chip': 'Apple M3 Pro',
      'Memory': '18GB unified memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 18 hours',
      'Ports': 'Three Thunderbolt 4, HDMI, SDXC'
    },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
    ],
    rating: 4.9,
    reviewCount: 1832,
    stores: [
      {
        id: 1,
        name: 'Apple Store',
        logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100',
        price: 1999,
        shipping: 'Free',
        link: 'https://apple.com',
        isBestPrice: true
      },
      {
        id: 2,
        name: 'Best Buy',
        logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100',
        price: 2049,
        shipping: 'Free',
        link: 'https://bestbuy.com'
      }
    ]
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    category: 'Electronics',
    subcategory: 'Headphones',
    description: 'Industry-leading noise canceling with all-day comfort and exceptional call quality.',
    specs: {
      'Driver Unit': '30mm',
      'Noise Canceling': 'Industry-leading',
      'Battery Life': 'Up to 30 hours',
      'Quick Charge': '3 min charge = 3 hours playback',
      'Connectivity': 'Bluetooth 5.2, NFC',
      'Weight': '250g'
    },
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'
    ],
    rating: 4.7,
    reviewCount: 3241,
    stores: [
      {
        id: 1,
        name: 'Sony Store',
        logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100',
        price: 399,
        shipping: 'Free',
        link: 'https://sony.com',
        isBestPrice: true
      },
      {
        id: 2,
        name: 'Amazon',
        logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
        price: 429,
        shipping: 'Free',
        link: 'https://amazon.com'
      }
    ]
  }
];

export const blogPosts = [
  {
    id: 1,
    title: 'Best Smartphones of 2025: Complete Buying Guide',
    excerpt: 'Discover the top smartphones this year with detailed comparisons and expert recommendations.',
    author: 'Tech Team',
    publishedAt: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    category: 'Buying Guides',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'How to Find the Best Deals Online: Expert Tips',
    excerpt: 'Learn insider secrets for getting the best prices on everything you buy online.',
    author: 'Shopping Expert',
    publishedAt: '2025-01-12',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
    category: 'Tips & Tricks',
    readTime: '6 min read'
  },
  {
    id: 3,
    title: 'Laptop vs Desktop: Which is Right for You?',
    excerpt: 'A comprehensive comparison to help you choose between laptop and desktop computers.',
    author: 'Tech Team',
    publishedAt: '2025-01-10',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    category: 'Reviews',
    readTime: '10 min read'
  }
];

export const featuredDeals = [
  {
    id: 1,
    productId: 1,
    discount: 15,
    originalPrice: 1399,
    salePrice: 1199,
    endDate: '2025-01-31'
  },
  {
    id: 2,
    productId: 3,
    discount: 20,
    originalPrice: 499,
    salePrice: 399,
    endDate: '2025-01-25'
  }
];

export const stores = [
  {
    id: 1,
    name: 'Apple Store',
    logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100',
    website: 'https://apple.com',
    location: { lat: 40.7128, lng: -74.0060, address: '767 5th Ave, New York, NY' }
  },
  {
    id: 2,
    name: 'Best Buy',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100',
    website: 'https://bestbuy.com',
    location: { lat: 40.7590, lng: -73.9845, address: '1280 Lexington Ave, New York, NY' }
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
    website: 'https://amazon.com',
    location: { lat: 40.7505, lng: -73.9934, address: '34th St, New York, NY' }
  }
];