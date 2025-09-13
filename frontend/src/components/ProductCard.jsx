import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, showDiscount = false }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const bestPrice = product.stores?.reduce((min, store) => 
    store.price < min ? store.price : min, 
    product.stores[0]?.price || 0
  );

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img 
          src={product.images?.[0]} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={handleProductClick}
        />
        {showDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -15% OFF
          </Badge>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4" onClick={handleProductClick}>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
                ${bestPrice}
              </span>
              {showDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ${Math.round(bestPrice * 1.15)}
                </span>
              )}
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              Best Price
            </Badge>
          </div>
          
          <Button 
            className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Compare Prices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;