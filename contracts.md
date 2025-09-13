# PriceSpy API Contracts & Integration Plan

## Current Mock Data Status
The frontend is currently using mock data from `/app/frontend/src/data/mock.js` containing:
- 15+ categories with subcategories
- Sample products (iPhone, MacBook, Sony headphones)
- Multiple stores with pricing information
- Blog posts and featured deals
- Store location data

## API Endpoints Required

### 1. Products API
```
GET /api/products
- Query params: category, subcategory, search, limit, offset, sort
- Returns: paginated product list with store prices

GET /api/products/:id
- Returns: detailed product info with all store prices, specs, images

GET /api/products/trending
- Returns: most compared products

GET /api/products/search
- Query params: q (search query), filters
- Returns: search results with filtering options
```

### 2. Categories API
```
GET /api/categories
- Returns: all categories with subcategories

GET /api/categories/:slug/products
- Returns: products in specific category
```

### 3. Stores API
```
GET /api/stores
- Returns: list of all partner stores

GET /api/stores/nearby
- Query params: lat, lng, radius
- Returns: nearby physical store locations
```

### 4. Blog API
```
GET /api/blog/posts
- Query params: category, limit, offset
- Returns: blog posts with metadata

GET /api/blog/posts/:id
- Returns: full blog post content
```

### 5. Price Tracking API
```
POST /api/price-alerts
- Create price alert for product

GET /api/price-history/:productId
- Returns: historical pricing data
```

### 6. QR Code API
```
GET /api/qr-code/:productId
- Returns: QR code for affiliate link

POST /api/qr-tracking
- Track QR code scans with analytics
```

## Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  category: String,
  subcategory: String,
  brand: String,
  specs: Object,
  images: [String],
  rating: Number,
  reviewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Stores Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  logo: String,
  website: String,
  apiEndpoint: String,
  isActive: Boolean,
  location: {
    type: "Point",
    coordinates: [longitude, latitude],
    address: String
  }
}
```

### Product Prices Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  storeId: ObjectId,
  price: Number,
  originalPrice: Number,
  isAvailable: Boolean,
  shippingCost: Number,
  shippingInfo: String,
  affiliateLink: String,
  lastUpdated: Date
}
```

### Blog Posts Collection
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  category: String,
  tags: [String],
  featuredImage: String,
  publishedAt: Date,
  readTime: String
}
```

## Frontend Integration Changes

### Replace Mock Data
1. Update `ProductCard.jsx` to use real API data
2. Modify `HomePage.jsx` to fetch from `/api/products/trending`
3. Update `ProductComparison.jsx` to use `/api/products/:id`
4. Change `SearchPage.jsx` to use `/api/products/search`
5. Update `BlogPage.jsx` to use `/api/blog/posts`

### API Integration Pattern
```javascript
// Example API service
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export const productsService = {
  getTrending: () => api.get('/api/products/trending'),
  getById: (id) => api.get(`/api/products/${id}`),
  search: (query, filters) => api.get('/api/products/search', { params: { q: query, ...filters } })
};
```

## External API Integration

### Priority APIs to Implement
1. **FakeStore API** (immediate) - For demo products
2. **DummyJSON API** (immediate) - Additional product data
3. **Amazon Product Advertising API** (future) - Real affiliate products
4. **Google Maps Places API** (future) - Store locations

### Price Update Strategy
- Implement cron job to update prices every 6 hours
- Store price history for trend analysis
- Alert users when prices drop below their threshold

## Business Logic Requirements

### Price Comparison Algorithm
1. Find best price across all stores for each product
2. Factor in shipping costs for true comparison
3. Highlight verified deals and exclusive offers
4. Calculate savings compared to original prices

### Affiliate Tracking
1. Generate unique affiliate links with UTM parameters
2. Track clicks, conversions, and QR code scans
3. Implement commission tracking dashboard
4. Generate dynamic QR codes with tracking pixels

### Location-Based Features
1. Use HTML5 Geolocation API to detect user location
2. Show nearby stores within specified radius
3. Compare online vs local store pricing
4. Integrate with Google Maps for store directions

## Security & Performance

### API Security
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS configuration for frontend domain
- API key authentication for external services

### Performance Optimizations
- MongoDB indexing on search fields
- Redis caching for frequently accessed products
- Image optimization and CDN integration
- Lazy loading for product images

### Error Handling
- Graceful fallbacks when external APIs fail
- User-friendly error messages
- Retry logic for failed price updates
- Monitoring and alerting for API failures

## Testing Requirements
1. Unit tests for all API endpoints
2. Integration tests for external API calls
3. Performance tests for search functionality
4. End-to-end tests for price comparison flow

This contract serves as the blueprint for seamless backend integration while maintaining the current high-quality frontend experience.