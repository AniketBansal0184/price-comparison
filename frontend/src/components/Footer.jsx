import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Company': ['About Us', 'Careers', 'Press', 'Contact'],
    'Help': ['Customer Support', 'FAQ', 'Shipping Info', 'Returns'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
    'Features': ['Price Tracking', 'Deal Alerts', 'Store Finder', 'API Access']
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Get the Best Deals First</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on exclusive deals, price drops, and insider shopping tips.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-100 focus:bg-white/20"
              />
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <ArrowRight className="h-4 w-4 ml-1" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
                  PriceSpy
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                The ultimate price comparison platform. Find the best deals across thousands of stores and save money on everything you buy.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@pricespy.com
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  1-800-PRICESPY
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  San Francisco, CA
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h4 className="font-semibold text-white">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Button 
                        variant="ghost" 
                        className="h-auto p-0 text-gray-400 hover:text-white font-normal justify-start"
                      >
                        {link}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-8 bg-gray-800" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 PriceSpy. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;