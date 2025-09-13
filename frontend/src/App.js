import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Pages
import HomePage from "./pages/HomePage";
import ProductComparison from "./pages/ProductComparison";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import BlogPage from "./pages/BlogPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <BrowserRouter>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductComparison />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;