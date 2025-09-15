import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NearbyStores from "./NearbyStores";
import { getCategories } from "../services/api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNearbyStores, setShowNearbyStores] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // Close sidebar on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 text-center">
        <p className="text-sm font-medium flex items-center justify-center">
          <Zap className="h-4 w-4 mr-1" />
          Flash Sale: Up to 50% off electronics! Limited time only.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/beyond.jpg"
              alt="Logo"
              className="h-16 w-16 mr-1 rounded-lg object-contain"
            />
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
              BeyondSupplySchool
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Home
            </Button>
            <div className="relative group">
              <Button variant="ghost">Categories</Button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 space-y-2">
                  {categories.map((c) => (
                    <Button
                      key={c.id}
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-gray-50"
                      onClick={() => navigate(`/category/${c.slug}`)}
                    >
                      {c.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => navigate("/blog")}>
              Blog
            </Button>
            <Button
              variant="ghost"
              className="flex items-center"
              onClick={() => setShowNearbyStores(true)}
            >
              <MapPin className="h-4 w-4 mr-1" /> Nearby Stores
            </Button>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-full"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full"
            />
          </form>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col">
            {/* Top Close Button */}
            <div className="flex justify-end p-2 border-b border-gray-200">
              <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Button>

              {/* Categories */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-gray-600"
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCategoriesOpen && (
                  <div className="pl-6 space-y-1">
                    {categories.map((c) => (
                      <Button
                        key={c.id}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => {
                          navigate(`/category/${c.slug}`);
                          setIsMenuOpen(false);
                        }}
                      >
                        {c.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/blog");
                  setIsMenuOpen(false);
                }}
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setShowNearbyStores(true);
                  setIsMenuOpen(false);
                }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Nearby Stores
              </Button>

              <div className="border-t pt-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" /> Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" /> Account
                </Button>
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}

      <NearbyStores
        isOpen={showNearbyStores}
        onClose={() => setShowNearbyStores(false)}
      />
    </header>
  );
};

export default Header;
