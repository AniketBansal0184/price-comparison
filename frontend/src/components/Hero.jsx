import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, TrendingUp, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find the best deals across thousands of stores instantly'
    },
    {
      icon: TrendingUp,
      title: 'Price Tracking',
      description: 'Get alerts when prices drop on your favorite products'
    },
    {
      icon: Shield,
      title: 'Verified Stores',
      description: 'Shop safely with our verified retailer network'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Compare prices in milliseconds, not minutes'
    }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-700 border-blue-200"
              >
                🎉 Over 2M+ products compared daily
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find the
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Best Deals </span>
                in Seconds
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Compare prices across thousands of stores and save money on everything you buy. 
                Get instant price alerts, exclusive deals, and verified retailer information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate('/search')}
              >
                <Search className="h-5 w-5 mr-2" />
                Start Comparing Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-400 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2M+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Stores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$500M+</div>
                <div className="text-sm text-gray-600">Saved</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-40 left-1/3 w-8 h-8 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
    </section>
  );
};

export default Hero;