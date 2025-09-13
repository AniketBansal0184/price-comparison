import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Components
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

// Data
import { products, categories, blogPosts, featuredDeals } from '../data/mock';

const HomePage = () => {
  const navigate = useNavigate();
  
  const trendingProducts = products.slice(0, 3);
  const featuredCategories = categories.slice(0, 4);
  const recentPosts = blogPosts.slice(0, 3);

  const scrollProductsLeft = () => {
    document.getElementById('trending-products').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollProductsRight = () => {
    document.getElementById('trending-products').scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Popular Categories
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing deals across all your favorite product categories
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Card 
                key={category.id}
                className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-50 to-white"
                onClick={() => navigate(`/category/${category.slug}`)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white font-bold text-xl">
                      {category.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {category.subcategories.length} subcategories
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Hot Deals
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Trending Products
              </h2>
              <p className="text-gray-600">
                Most compared products this week
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={scrollProductsLeft}
                className="hidden sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={scrollProductsRight}
                className="hidden sm:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div 
            id="trending-products"
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingProducts.map((product) => (
              <div key={product.id} className="flex-none w-80">
                <ProductCard product={product} showDiscount={true} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline"
              onClick={() => navigate('/search')}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose PriceSpy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join millions of smart shoppers who save money every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Trusted by Millions</h3>
              <p className="text-gray-600">
                Over 5 million users trust us to find the best deals online
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Updates</h3>
              <p className="text-gray-600">
                Prices updated every minute to ensure you never miss a deal
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Verified Reviews</h3>
              <p className="text-gray-600">
                Authentic reviews from real customers to help you decide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Latest Insights
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">
              From Our Blog
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert tips, buying guides, and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline"
              onClick={() => navigate('/blog')}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Read More Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;