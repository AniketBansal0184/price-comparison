// // Mock data for BeyondSupplySchool clone
// export const categories = [
//   {
//     id: 1,
//     name: 'Electronics',
//     slug: 'electronics',
//     subcategories: [
//       { id: 1, name: 'Smartphones', slug: 'smartphones' },
//       { id: 2, name: 'Laptops', slug: 'laptops' },
//       { id: 3, name: 'Headphones', slug: 'headphones' },
//       { id: 4, name: 'Cameras', slug: 'cameras' },
//       { id: 5, name: 'Gaming', slug: 'gaming' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Fashion',
//     slug: 'fashion',
//     subcategories: [
//       { id: 6, name: 'Men\'s Clothing', slug: 'mens-clothing' },
//       { id: 7, name: 'Women\'s Clothing', slug: 'womens-clothing' },
//       { id: 8, name: 'Shoes', slug: 'shoes' },
//       { id: 9, name: 'Accessories', slug: 'accessories' }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Home & Garden',
//     slug: 'home-garden',
//     subcategories: [
//       { id: 10, name: 'Furniture', slug: 'furniture' },
//       { id: 11, name: 'Kitchen', slug: 'kitchen' },
//       { id: 12, name: 'Garden', slug: 'garden' },
//       { id: 13, name: 'Decor', slug: 'decor' }
//     ]
//   },
//   {
//     id: 4,
//     name: 'Sports & Fitness',
//     slug: 'sports-fitness',
//     subcategories: [
//       { id: 14, name: 'Gym Equipment', slug: 'gym-equipment' },
//       { id: 15, name: 'Outdoor Sports', slug: 'outdoor-sports' }
//     ]
//   }
// ];

// export const products = [
//   {
//     id: 1,
//     name: 'iPhone 15 Pro Max',
//     category: 'Electronics',
//     subcategory: 'Smartphones',
//     description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and pro camera system.',
//     specs: {
//       'Display': '6.7-inch Super Retina XDR',
//       'Chip': 'A17 Pro',
//       'Camera': 'Pro camera system 48MP',
//       'Battery': 'Up to 29 hours video playback',
//       'Storage': '128GB, 256GB, 512GB, 1TB',
//       'Material': 'Titanium'
//     },
//     images: [
//       'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
//       'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
//       'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800'
//     ],
//     rating: 4.8,
//     reviewCount: 2847,
//     stores: [
//       {
//         id: 1,
//         name: 'Apple Store',
//         logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100',
//         price: 1199,
//         shipping: 'Free',
//         link: 'https://apple.com',
//         isBestPrice: true
//       },
//       {
//         id: 2,
//         name: 'Best Buy',
//         logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100',
//         price: 1249,
//         shipping: '$9.99',
//         link: 'https://bestbuy.com'
//       },
//       {
//         id: 3,
//         name: 'Amazon',
//         logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
//         price: 1229,
//         shipping: 'Free',
//         link: 'https://amazon.com'
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'MacBook Pro 14-inch',
//     category: 'Electronics',
//     subcategory: 'Laptops',
//     description: 'Supercharged by M3 Pro and M3 Max chips. Built for all types of creatives.',
//     specs: {
//       'Display': '14.2-inch Liquid Retina XDR',
//       'Chip': 'Apple M3 Pro',
//       'Memory': '18GB unified memory',
//       'Storage': '512GB SSD',
//       'Battery': 'Up to 18 hours',
//       'Ports': 'Three Thunderbolt 4, HDMI, SDXC'
//     },
//     images: [
//       'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
//       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
//     ],
//     rating: 4.9,
//     reviewCount: 1832,
//     stores: [
//       {
//         id: 1,
//         name: 'Apple Store',
//         logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100',
//         price: 1999,
//         shipping: 'Free',
//         link: 'https://apple.com',
//         isBestPrice: true
//       },
//       {
//         id: 2,
//         name: 'Best Buy',
//         logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100',
//         price: 2049,
//         shipping: 'Free',
//         link: 'https://bestbuy.com'
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: 'Sony WH-1000XM5',
//     category: 'Electronics',
//     subcategory: 'Headphones',
//     description: 'Industry-leading noise canceling with all-day comfort and exceptional call quality.',
//     specs: {
//       'Driver Unit': '30mm',
//       'Noise Canceling': 'Industry-leading',
//       'Battery Life': 'Up to 30 hours',
//       'Quick Charge': '3 min charge = 3 hours playback',
//       'Connectivity': 'Bluetooth 5.2, NFC',
//       'Weight': '250g'
//     },
//     images: [
//       'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
//       'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'
//     ],
//     rating: 4.7,
//     reviewCount: 3241,
//     stores: [
//       {
//         id: 1,
//         name: 'Sony Store',
//         logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100',
//         price: 399,
//         shipping: 'Free',
//         link: 'https://sony.com',
//         isBestPrice: true
//       },
//       {
//         id: 2,
//         name: 'Amazon',
//         logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
//         price: 429,
//         shipping: 'Free',
//         link: 'https://amazon.com'
//       }
//     ]
//   }
// ];

// export const blogPosts = [
//   {
//     id: 1,
//     title: 'Best Smartphones of 2025: Complete Buying Guide',
//     excerpt: 'Discover the top smartphones this year with detailed comparisons and expert recommendations.',
//     author: 'Tech Team',
//     publishedAt: '2025-01-15',
//     image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
//     category: 'Buying Guides',
//     readTime: '8 min read'
//   },
//   {
//     id: 2,
//     title: 'How to Find the Best Deals Online: Expert Tips',
//     excerpt: 'Learn insider secrets for getting the best prices on everything you buy online.',
//     author: 'Shopping Expert',
//     publishedAt: '2025-01-12',
//     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
//     category: 'Tips & Tricks',
//     readTime: '6 min read'
//   },
//   {
//     id: 3,
//     title: 'Laptop vs Desktop: Which is Right for You?',
//     excerpt: 'A comprehensive comparison to help you choose between laptop and desktop computers.',
//     author: 'Tech Team',
//     publishedAt: '2025-01-10',
//     image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
//     category: 'Reviews',
//     readTime: '10 min read'
//   }
// ];

// export const featuredDeals = [
//   {
//     id: 1,
//     productId: 1,
//     discount: 15,
//     originalPrice: 1399,
//     salePrice: 1199,
//     endDate: '2025-01-31'
//   },
//   {
//     id: 2,
//     productId: 3,
//     discount: 20,
//     originalPrice: 499,
//     salePrice: 399,
//     endDate: '2025-01-25'
//   }
// ];

// export const stores = [
//   {
//     id: 1,
//     name: 'Apple Store',
//     logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100',
//     website: 'https://apple.com',
//     location: { lat: 40.7128, lng: -74.0060, address: '767 5th Ave, New York, NY' }
//   },
//   {
//     id: 2,
//     name: 'Best Buy',
//     logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100',
//     website: 'https://bestbuy.com',
//     location: { lat: 40.7590, lng: -73.9845, address: '1280 Lexington Ave, New York, NY' }
//   },
//   {
//     id: 3,
//     name: 'Amazon',
//     logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
//     website: 'https://amazon.com',
//     location: { lat: 40.7505, lng: -73.9934, address: '34th St, New York, NY' }
//   }
// ];


// Mock data for BeyondSupplySchool clone

export const categories = [
  { id: 1, name: 'Art & Craft Supplies', slug: 'art-craft-supplies', subcategories: [] },
  { id: 2, name: 'Automotive Transport', slug: 'automotive-transport', subcategories: [
      { id: 1, name: 'Automotive Enthusiast Merchandise', slug: 'automotive-enthusiast-merchandise' },
      { id: 2, name: 'Automotive Replacement Parts', slug: 'automotive-replacement-parts' },
      { id: 3, name: 'Automotive Tools & Equipment', slug: 'automotive-tools-equipment' },
      { id: 4, name: 'Boating', slug: 'boating' },
      { id: 5, name: 'Bodywork', slug: 'bodywork' },
      { id: 6, name: 'Brake System', slug: 'brake-system' },
      { id: 7, name: 'Car Care & Vehicle Accessories', slug: 'car-care-vehicle-accessories' },
      { id: 8, name: 'Car Rims', slug: 'car-rims' },
      { id: 9, name: 'Chassi Parts', slug: 'chassi-parts' },
      { id: 10, name: 'Cooling System', slug: 'cooling-system' },
      { id: 11, name: 'Driver\'s Education', slug: 'drivers-education' },
      { id: 12, name: 'Electric Vehicle Charging', slug: 'electric-vehicle-charging' },
      { id: 13, name: 'Electric Vehicles', slug: 'electric-vehicles' },
      { id: 14, name: 'Engine Parts', slug: 'engine-parts' },
      { id: 15, name: 'Exhaust Systems', slug: 'exhaust-systems' },
      { id: 16, name: 'Filters', slug: 'filters' },
      { id: 17, name: 'Find Parts', slug: 'find-parts' },
      { id: 18, name: 'Fuel Supply System', slug: 'fuel-supply-system' },
      { id: 19, name: 'Ignition Parts', slug: 'ignition-parts' },
      { id: 20, name: 'Motorcycle & Powersports', slug: 'motorcycle-powersports' },
      { id: 21, name: 'Motorcycle Equipment', slug: 'motorcycle-equipment' },
      { id: 22, name: 'RV Parts & Accessories', slug: 'rv-parts-accessories' },
      { id: 23, name: 'Rearview-& Side Mirrors', slug: 'rearview-side-mirrors' },
      { id: 24, name: 'Trailers', slug: 'trailers' },
      { id: 25, name: 'Tyres', slug: 'tyres' },
      { id: 26, name: 'Vehicle Interior', slug: 'vehicle-interior' },
      { id: 27, name: 'Vehicle Lights', slug: 'vehicle-lights' },
      { id: 28, name: 'Wiper Blades', slug: 'wiper-blades' }
    ]
  },
  { id: 3, name: 'Books & Media', slug: 'books-media', subcategories: [] },
  { id: 4, name: 'DIY', slug: 'diy', subcategories: [
      { id: 1, name: 'Bricks & Paving', slug: 'bricks-paving' },
      { id: 2, name: 'Building Materials', slug: 'building-materials-diy' },
      { id: 3, name: 'Conservatories, Outbildings & Sheds', slug: 'conservatories-outbildings-sheds' },
      { id: 4, name: 'DIY Accessories', slug: 'diy-accessories' },
      { id: 5, name: 'Floor, Wall & Roof', slug: 'floor-wall-roof' },
      { id: 6, name: 'Heating & Plumbing', slug: 'heating-plumbing' },
      { id: 7, name: 'Kitchen Units', slug: 'kitchen-units' },
      { id: 8, name: 'Tools & Machines', slug: 'tools-machines' },
      { id: 9, name: 'Waste Disposal Units', slug: 'waste-disposal-units' }
    ]
  },
  { id: 5, name: 'Early Year Childhood', slug: 'early-year-childhood', subcategories: [] },
  { id: 6, name: 'Education Resources', slug: 'education-resources', subcategories: [] },
  { id: 7, name: 'Electronics', slug: 'electronics', subcategories: [
      { id: 1, name: 'Air Conditioners', slug: 'air-conditioners' },
      { id: 2, name: 'Audio', slug: 'audio' },
      { id: 3, name: 'Cameras', slug: 'cameras' },
      { id: 4, name: 'Digital', slug: 'digital' },
      { id: 5, name: 'Electronics Accessories', slug: 'electronics-accessories' }
    ]
  },
  { id: 8, name: 'Food', slug: 'food', subcategories: [
      { id: 1, name: 'Coupons', slug: 'coupons-food-grocery' },
      { id: 2, name: 'Fresh Packaged Produce', slug: 'fresh-packaged-produce' },
      { id: 3, name: 'Grocery & Gourmet Food', slug: 'grocery-gourmet-food' },
      { id: 4, name: 'Household Supplies', slug: 'household-supplies-food-grocery' },
      { id: 5, name: 'Organic Food', slug: 'organic-food' },
      { id: 6, name: 'Vegan', slug: 'vegan-food-grocery' }
    ]
  },
  { id: 9, name: 'Furniture', slug: 'furniture', subcategories: [
      { id: 1, name: 'Art Studio Furniture', slug: 'art-studio-furniture' },
      { id: 2, name: 'Audio-Video Shelving', slug: 'audio-video-shelving' },
      { id: 3, name: 'Baby & Toddler Furniture', slug: 'baby-toddler-furniture' },
      { id: 4, name: 'Bedroom Furniture', slug: 'bedroom-furniture' }
    ]
  },
  {
    id: 10, name: 'Garden & Outdoor',
    slug: 'garden-outdoor',
    subcategories: []
  },
  {
    id: 11, name: 'Health , Household & Baby Care Products Clothing, Shoes & Jewelry',
    slug: 'health-household-baby-care-products-clothing-shoes-jewelry',
    subcategories: []
  },
  {
    id: 12, name: 'Home Kitchen',
    slug: 'home-kitchen',
    subcategories: []
  },
  {
    id: 13, name: 'Industrial, Scientific & Vocational',
    slug: 'industrial-scientific-vocational',
    subcategories: []
  },
  {
    id: 14, name: 'Musical Instruments',
    slug: 'musical-instruments',
    subcategories: []
  },
  {
    id: 15, name: 'Opulence',
    slug: 'opulence',
    subcategories: []
  },
  {
    id: 16, name: 'Pet Supplies',
    slug: 'pet-supplies',
    subcategories: []
  },
  {
    id: 17, name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    subcategories: []
  },
  {
    id: 18, name: 'Tools & Home Improvement',
    slug: 'tools-home-improvement',
    subcategories: []
  },
  {
    id: 19, name: 'Toys & Games',
    slug: 'toys-games',
    subcategories: []
  },
  {
    id: 20, name: 'Used & Refurbished',
    slug: 'used-refurbished',
    subcategories: []
  }
];
export const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    subcategory: 'Smartphones',
    description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and pro camera system.',
    specs: { Display: '6.7-inch Super Retina XDR', Chip: 'A17 Pro', Camera: 'Pro camera system 48MP', Battery: 'Up to 29 hours video playback', Storage: '128GB, 256GB, 512GB, 1TB', Material: 'Titanium' },
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
    ],
    rating: 4.8,
    reviewCount: 2847,
    stores: [
      { id: 1, name: 'Apple Store', logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100', price: 1199, shipping: 'Free', link: 'https://apple.com', isBestPrice: true },
      { id: 2, name: 'Best Buy', logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100', price: 1249, shipping: '$9.99', link: 'https://bestbuy.com' }
    ]
  },
  {
    id: 2,
    name: 'MacBook Pro 14-inch',
    category: 'Electronics',
    subcategory: 'Laptops',
    description: 'Supercharged by M3 Pro and M3 Max chips. Built for all types of creatives.',
    specs: { Display: '14.2-inch Liquid Retina XDR', Chip: 'Apple M3 Pro', Memory: '18GB unified memory', Storage: '512GB SSD', Battery: 'Up to 18 hours', Ports: 'Three Thunderbolt 4, HDMI, SDXC' },
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
    ],
    rating: 4.9,
    reviewCount: 1832,
    stores: [
      { id: 1, name: 'Apple Store', logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100', price: 1999, shipping: 'Free', link: 'https://apple.com', isBestPrice: true }
    ]
  }
];

// Featured deals
export const featuredDeals = [
  { id: 1, productId: 1, discount: 15, originalPrice: 1399, salePrice: 1199, endDate: '2025-01-31' }
];

// Stores
export const stores = [
  { id: 1, name: 'Apple Store', logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100', website: 'https://apple.com', location: { lat: 40.7128, lng: -74.0060, address: '767 5th Ave, New York, NY' } }
];

// Blog posts
export const blogPosts = [
  { 
    id: 1, 
    title: 'Best Smartphones of 2025: Complete Buying Guide', 
    excerpt: 'Discover the top smartphones this year with detailed comparisons, pros and cons, and expert recommendations to help you choose the perfect device.', 
    author: 'Tech Team', 
    publishedAt: '2025-01-15', 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', 
    category: 'Buying Guides', 
    readTime: '8 min read' 
  },
  { 
    id: 2, 
    title: 'How to Spot the Best Online Deals Without Getting Scammed', 
    excerpt: 'Learn practical tips for spotting authentic online deals, avoiding hidden charges, and making smart purchases every time.', 
    author: 'Shopping Expert', 
    publishedAt: '2025-01-12', 
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', 
    category: 'Tips & Tricks', 
    readTime: '6 min read' 
  },
  { 
    id: 3, 
    title: 'Laptop vs Desktop: Choosing the Right Setup for You', 
    excerpt: 'Compare performance, portability, and price to decide whether a laptop or desktop best fits your needs and workflow.', 
    author: 'Tech Team', 
    publishedAt: '2025-01-10', 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', 
    category: 'Reviews', 
    readTime: '10 min read' 
  }
];

