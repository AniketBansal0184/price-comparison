import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Star, 
  Heart, 
  Share2, 
  Bell, 
  ExternalLink, 
  QrCode,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  ArrowRight
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QRCodeModal from '../components/QRCodeModal';
import { products } from '../data/mock';

const ProductComparison = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
      const related = products.filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      ).slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const bestStore = product.stores.find(store => store.isBestPrice) || product.stores[0];

  const handleQRCodeClick = (store) => {
    setSelectedStore(store);
    setShowQRModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            Home
          </Button>
          <span>/</span>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/category/${product.category.toLowerCase()}`)}>
            {product.category}
          </Button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Product Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating}/5 ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Best Price Highlight */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-green-100 text-green-700">Best Price</Badge>
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${bestStore.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      at {bestStore.name} • {bestStore.shipping} shipping
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 w-full"
                      onClick={() => window.open(bestStore.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleQRCodeClick(bestStore)}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                Price Alert
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Comparison Table */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Price Comparison</h2>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 font-semibold text-gray-900">Store</th>
                    <th className="text-center py-4 font-semibold text-gray-900">Price</th>
                    <th className="text-center py-4 font-semibold text-gray-900">Shipping</th>
                    <th className="text-center py-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.stores
                    .sort((a, b) => a.price - b.price)
                    .map((store, index) => (
                    <tr key={store.id} className={`border-b border-gray-100 ${store.isBestPrice ? 'bg-green-50' : ''}`}>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={store.logo} 
                            alt={store.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{store.name}</div>
                            {store.isBestPrice && (
                              <Badge className="bg-green-100 text-green-700 text-xs">Best Deal</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4">
                        <span className="text-xl font-bold text-gray-900">${store.price}</span>
                      </td>
                      <td className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <Truck className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-gray-600">{store.shipping}</span>
                        </div>
                      </td>
                      <td className="text-center py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button 
                            variant={store.isBestPrice ? "default" : "outline"}
                            onClick={() => window.open(store.link, '_blank')}
                            className={store.isBestPrice ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Buy Now
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleQRCodeClick(store)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {product.stores
                .sort((a, b) => a.price - b.price)
                .map((store) => (
                <Card key={store.id} className={store.isBestPrice ? 'border-green-200 bg-green-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={store.logo} 
                          alt={store.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{store.name}</div>
                          {store.isBestPrice && (
                            <Badge className="bg-green-100 text-green-700 text-xs">Best Deal</Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-xl font-bold text-gray-900">${store.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Truck className="h-4 w-4 mr-1" />
                        <span>{store.shipping}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={store.isBestPrice ? "default" : "outline"}
                          size="sm"
                          onClick={() => window.open(store.link, '_blank')}
                          className={store.isBestPrice ? "bg-gradient-to-r from-green-600 to-blue-600" : ""}
                        >
                          Buy Now
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleQRCodeClick(store)}
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
              <Button 
                variant="outline"
                onClick={() => navigate(`/category/${product.category.toLowerCase()}`)}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        product={product}
        store={selectedStore}
      />
    </div>
  );
};

export default ProductComparison;