import { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(5);

  const location = useLocation();

  const navigationItems = ["Men", "Women", "Kids", "Home"];

  const mockSuggestions = [
    "Ultraboost 22",
    "Stan Smith",
    "Gazelle",
    "Superstar",
    "NMD R1",
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);

    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter((item) =>
        item?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      window.location.href = `/product-catalog?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
    window.location.href = `/product-catalog?search=${encodeURIComponent(
      suggestion
    )}`;
  };

  const toggleMobileSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector(".mobile-search-input");
        if (searchInput) searchInput?.focus();
      }, 100);
    }
  };

  const handleCartItemRemove = (itemId) => {
    setCartItemCount((prev) => Math.max(0, prev - 1));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Main Header with Subtle Pattern */}
      <header className="fixed top-0 left-0 right-0 bg-white/0 backdrop-blur-sm z-[1000] h-[5rem] flex items-center">
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((category) => (
                <div key={category} className="category-nav relative">
                  <Link
                    to={`/${category.toLowerCase()}`}
                    className="text-sm font-bold text-accent transition-colors uppercase tracking-wider relative group"
                  >
                    {category}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="flex items-center">
                <img src="/assets/logo.png" className="h-20 object-contain" />
              </Link>
            </div>

            {/* Right Side - Navigation and Menu */}
            <div className="flex items-center ml-auto">
              <nav className="hidden md:flex items-center space-x-6 mr-4">
                <div className="relative">
                  <Link
                    to="/about"
                    className="text-sm font-bold text-accent transition-colors uppercase tracking-wider relative group"
                  >
                    About
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    to="/help"
                    className="text-sm font-bold text-accent transition-colors uppercase tracking-wider relative group"
                  >
                    Help
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    to="/contact"
                    className="text-sm font-bold text-accent transition-colors uppercase tracking-wider relative group"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -mr-2"
                aria-label="Menu"
              >
                <RiMenu3Line size={30} className="text-accent" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[1001] transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <span className="font-coder font-medium">Welcome Back</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-4 px-6">
            <nav className="space-y-1">
              {[
                { label: "Home", icon: "Home", path: "/" },
                { label: "New Arrivals", icon: "Zap", path: "/new-arrivals" },
                { label: "Men", icon: "Shirt", path: "/men" },
                { label: "Women", icon: "Dress", path: "/women" },
                { label: "Kids", icon: "Baby", path: "/kids" },
                { label: "Sale", icon: "Tag", path: "/sale" },
                { label: "Collections", icon: "Grid", path: "/collections" },
                ...(isAuthenticated
                  ? [
                      {
                        label: `Wishlist${
                          wishlistCount > 0 ? ` (${wishlistCount})` : ""
                        }`,
                        icon: "Heart",
                        path: "/wishlist",
                      },
                      {
                        label: `Cart${
                          cartItemCount > 0 ? ` (${cartItemCount})` : ""
                        }`,
                        icon: "ShoppingCart",
                        path: "/shopping-cart",
                      },
                    ]
                  : []),
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black/5 transition-colors">
                    <Icon
                      name={item.icon}
                      size={16}
                      className="text-gray-700"
                    />
                  </div>
                  <span className="font-coder text-gray-900">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-coder font-medium text-gray-500 uppercase tracking-wider mb-4 px-2">
                Account
              </h3>
              <nav className="space-y-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/account"
                      className="flex items-center space-x-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                        <Icon name="User" size={16} className="text-gray-700" />
                      </div>
                      <span className="font-coder text-gray-900">
                        My Account
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                        <Icon
                          name="LogOut"
                          size={16}
                          className="text-red-600"
                        />
                      </div>
                      <span className="font-coder text-red-600">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full py-3 px-4 text-center font-coder text-white bg-black rounded-lg hover:bg-gray-900 transition-colors mb-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full py-3 px-4 text-center font-coder text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span> 2023 Adidas</span>
              <div className="flex space-x-4">
                <Link to="/privacy" className="hover:text-black">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-black">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
