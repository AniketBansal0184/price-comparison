import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  Calendar,
  TrendingUp,
  ArrowRight,
  Package
} from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRemoveItem = (productId, productName) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist.`,
    });
  };

  const handleViewProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist.",
      });
    }
  };

  const getBestPrice = (product) => {
    return Math.min(...product.stores.map(s => s.price));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>My Wishlist ({wishlist.length})</span>
            </DialogTitle>
            {wishlist.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="py-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-4 max-w-sm mx-auto">
                Start adding products you love to keep track of them and get price alerts.
              </p>
              <Button
                onClick={() => {
                  onClose();
                  navigate('/');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Package className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto">
              {wishlist.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div 
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors truncate"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Added {formatDate(product.addedAt)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">
                          ${getBestPrice(product)}
                        </span>
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Best Price
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {product.stores.length} stores
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 flex-shrink-0">
                    <Button
                      size="sm"
                      onClick={() => handleViewProduct(product.id)}
                      className="bg-blue-600 hover:bg-blue-700 px-3"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(product.id, product.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {wishlist.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Total items: {wishlist.length}</span>
                <span>
                  Total value: ${wishlist.reduce((sum, product) => sum + getBestPrice(product), 0).toFixed(2)}
                </span>
              </div>
              
              <Button
                onClick={() => {
                  onClose();
                  navigate('/search');
                }}
                variant="outline"
                className="w-full"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistModal;