import React, { useState } from "react";
import { ShoppingBag, Menu, X, Search, Heart, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlistItems, setSearchQuery, isAuthenticated } = useApp();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate("/search");
      setSearchInput("");
      setIsSearchOpen(false);
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/signup");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold text-gray-800"
            >
              Elegante.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                isActive("/")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/collection"
              className={`font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                isActive("/collection")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              Collection
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                isActive("/about")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors duration-200 text-sm uppercase tracking-wide ${
                isActive("/contact")
                  ? "text-rose-600"
                  : "text-gray-700 hover:text-rose-600"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <Link
              to="/wishlist"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative"
            >
              <Heart className="w-5 h-5 text-gray-600" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <User className="w-5 h-5 text-gray-600" />
            </Link>
            <button
              onClick={handleCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {isAuthenticated && cart && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (appears when search is clicked) */}
        {isSearchOpen && (
          <div className="mt-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/"
                className={`font-medium text-sm uppercase tracking-wide ${
                  isActive("/")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/collection"
                className={`font-medium text-sm uppercase tracking-wide ${
                  isActive("/collection")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collection
              </Link>
              <Link
                to="/about"
                className={`font-medium text-sm uppercase tracking-wide ${
                  isActive("/about")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`font-medium text-sm uppercase tracking-wide ${
                  isActive("/contact")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center justify-between mt-6">
              <Link
                to="/wishlist"
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User className="w-5 h-5 text-gray-600" />
              </Link>
              <button
                onClick={handleCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                {isAuthenticated && cart && cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
