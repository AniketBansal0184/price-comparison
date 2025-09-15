import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { 
  Grid, 
  List, 
  ArrowUpDown, 
  Filter,
  Star,
  TrendingUp
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';


const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
        const foundCategory = cats.find(cat => cat.slug === slug);
        setCategory(foundCategory || null);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    })();
  }, [slug]);

  useEffect(() => {
    if (category) {
      let filtered = products.filter(product => 
        product.category.toLowerCase() === category.name.toLowerCase()
      );

      // Subcategory filter
      if (selectedSubcategory) {
        filtered = filtered.filter(product => 
          product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()
        );
      }

      // Sort products
      switch (sortBy) {
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
          break;
      }

      setFilteredProducts(filtered);
    }
  }, [category, selectedSubcategory, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {category.name.charAt(0)}
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare prices on the best {category.name.toLowerCase()} products from top brands and retailers.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{filteredProducts.length} Products</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>

                {/* Subcategories */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Subcategories</h4>
                  <div className="space-y-2">
                    <Button
                      variant={!selectedSubcategory ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedSubcategory('')}
                    >
                      All {category.name}
                    </Button>
                    {category.subcategories?.map((subcategory) => (
                      <Button
                        key={subcategory.id}
                        variant={selectedSubcategory === subcategory.name ? 'default' : 'ghost'}
                        className="w-full justify-start text-sm"
                        onClick={() => setSelectedSubcategory(
                          selectedSubcategory === subcategory.name ? '' : subcategory.name
                        )}
                      >
                        {subcategory.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Quick Filters</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <Star className="h-3 w-3 mr-2 text-yellow-400 fill-current" />
                      Top Rated (4.5+)
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <TrendingUp className="h-3 w-3 mr-2 text-blue-500" />
                      Best Sellers
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <Badge variant="secondary" className="mr-2 text-xs">Sale</Badge>
                      On Sale
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedSubcategory || category.name}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
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

                {/* View Mode */}
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

            {/* Active Filters */}
            {selectedSubcategory && (
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200"
                  onClick={() => setSelectedSubcategory('')}
                >
                  {selectedSubcategory} ✕
                </Badge>
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
                  <Filter className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedSubcategory('')}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;