import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List,
  Star,
  ArrowUpDown
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mock';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    filterProducts(query, selectedCategory, priceRange, sortBy);
  }, [searchParams, selectedCategory, priceRange, sortBy]);

  const filterProducts = (query, category, price, sort) => {
    let filtered = [...products];

    // Text search
    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price range filter
    if (price.min || price.max) {
      filtered = filtered.filter(product => {
        const bestPrice = Math.min(...product.stores.map(store => store.price));
        const minPrice = price.min ? parseFloat(price.min) : 0;
        const maxPrice = price.max ? parseFloat(price.max) : Infinity;
        return bestPrice >= minPrice && bestPrice <= maxPrice;
      });
    }

    // Sort
    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = Math.min(...a.stores.map(store => store.price));
          const priceB = Math.min(...b.stores.map(store => store.price));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = Math.min(...a.stores.map(store => store.price));
          const priceB = Math.min(...b.stores.map(store => store.price));
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('relevance');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasFilters = selectedCategory || priceRange.min || priceRange.max || searchQuery;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-full"
              />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              {hasFilters && (
                <Button variant="ghost" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                  Clear All
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.name ? 'default' : 'ghost'}
                        className="w-full justify-start text-sm"
                        onClick={() => setSelectedCategory(
                          selectedCategory === category.name ? '' : category.name
                        )}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Price Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <Button
                        key={rating}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                      >
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 mr-1 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2">& up</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>

            {/* Applied Filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Search: {searchQuery}
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Category: {selectedCategory}
                  </Badge>
                )}
                {(priceRange.min || priceRange.max) && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Price: ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'w-full' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;