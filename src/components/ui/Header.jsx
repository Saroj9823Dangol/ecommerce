import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(5);

  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const miniCartRef = useRef(null);
  const categoryMenuRef = useRef(null);

  const navigationItems = [
    { label: "Home", path: "/home-dashboard", icon: "Home" },
    { label: "Products", path: "/product-catalog", icon: "Package" },
    {
      label: "Cart",
      path: "/shopping-cart",
      icon: "ShoppingCart",
      badge: cartItemCount,
    },
  ];

  const categoryMenus = {
    Men: {
      featured: [
        {
          name: "New Arrivals",
          path: "/product-catalog?category=men&filter=new",
        },
        {
          name: "Best Sellers",
          path: "/product-catalog?category=men&filter=bestsellers",
        },
        {
          name: "Sale Items",
          path: "/product-catalog?category=men&filter=sale",
        },
      ],
      footwear: [
        {
          name: "Running Shoes",
          path: "/product-catalog?category=men&type=running",
        },
        {
          name: "Lifestyle Shoes",
          path: "/product-catalog?category=men&type=lifestyle",
        },
        {
          name: "Football Boots",
          path: "/product-catalog?category=men&type=football",
        },
        {
          name: "Basketball Shoes",
          path: "/product-catalog?category=men&type=basketball",
        },
        {
          name: "Training Shoes",
          path: "/product-catalog?category=men&type=training",
        },
        {
          name: "Sandals & Slides",
          path: "/product-catalog?category=men&type=sandals",
        },
      ],
      clothing: [
        {
          name: "T-Shirts & Tanks",
          path: "/product-catalog?category=men&type=tshirts",
        },
        {
          name: "Hoodies & Sweatshirts",
          path: "/product-catalog?category=men&type=hoodies",
        },
        {
          name: "Jackets & Coats",
          path: "/product-catalog?category=men&type=jackets",
        },
        {
          name: "Pants & Tights",
          path: "/product-catalog?category=men&type=pants",
        },
        { name: "Shorts", path: "/product-catalog?category=men&type=shorts" },
        {
          name: "Underwear & Socks",
          path: "/product-catalog?category=men&type=underwear",
        },
      ],
      sports: [
        {
          name: "Running",
          path: "/product-catalog?category=men&sport=running",
        },
        {
          name: "Football",
          path: "/product-catalog?category=men&sport=football",
        },
        {
          name: "Basketball",
          path: "/product-catalog?category=men&sport=basketball",
        },
        {
          name: "Training",
          path: "/product-catalog?category=men&sport=training",
        },
        { name: "Tennis", path: "/product-catalog?category=men&sport=tennis" },
        {
          name: "Outdoor",
          path: "/product-catalog?category=men&sport=outdoor",
        },
      ],
    },
    Women: {
      featured: [
        {
          name: "New Arrivals",
          path: "/product-catalog?category=women&filter=new",
        },
        {
          name: "Best Sellers",
          path: "/product-catalog?category=women&filter=bestsellers",
        },
        {
          name: "Sale Items",
          path: "/product-catalog?category=women&filter=sale",
        },
      ],
      footwear: [
        {
          name: "Running Shoes",
          path: "/product-catalog?category=women&type=running",
        },
        {
          name: "Lifestyle Shoes",
          path: "/product-catalog?category=women&type=lifestyle",
        },
        {
          name: "Training Shoes",
          path: "/product-catalog?category=women&type=training",
        },
        {
          name: "Tennis Shoes",
          path: "/product-catalog?category=women&type=tennis",
        },
        {
          name: "Sandals & Slides",
          path: "/product-catalog?category=women&type=sandals",
        },
        {
          name: "High Heels & Boots",
          path: "/product-catalog?category=women&type=boots",
        },
      ],
      clothing: [
        {
          name: "Sports Bras",
          path: "/product-catalog?category=women&type=sportsbras",
        },
        {
          name: "T-Shirts & Tanks",
          path: "/product-catalog?category=women&type=tshirts",
        },
        {
          name: "Hoodies & Sweatshirts",
          path: "/product-catalog?category=women&type=hoodies",
        },
        {
          name: "Jackets & Coats",
          path: "/product-catalog?category=women&type=jackets",
        },
        {
          name: "Leggings & Tights",
          path: "/product-catalog?category=women&type=leggings",
        },
        {
          name: "Dresses & Skirts",
          path: "/product-catalog?category=women&type=dresses",
        },
      ],
      sports: [
        {
          name: "Running",
          path: "/product-catalog?category=women&sport=running",
        },
        {
          name: "Yoga & Pilates",
          path: "/product-catalog?category=women&sport=yoga",
        },
        {
          name: "Training",
          path: "/product-catalog?category=women&sport=training",
        },
        {
          name: "Tennis",
          path: "/product-catalog?category=women&sport=tennis",
        },
        { name: "Dance", path: "/product-catalog?category=women&sport=dance" },
        {
          name: "Outdoor",
          path: "/product-catalog?category=women&sport=outdoor",
        },
      ],
    },
    Kids: {
      featured: [
        {
          name: "New Arrivals",
          path: "/product-catalog?category=kids&filter=new",
        },
        {
          name: "Best Sellers",
          path: "/product-catalog?category=kids&filter=bestsellers",
        },
        {
          name: "Sale Items",
          path: "/product-catalog?category=kids&filter=sale",
        },
      ],
      footwear: [
        {
          name: "Running Shoes",
          path: "/product-catalog?category=kids&type=running",
        },
        {
          name: "Lifestyle Shoes",
          path: "/product-catalog?category=kids&type=lifestyle",
        },
        {
          name: "Football Boots",
          path: "/product-catalog?category=kids&type=football",
        },
        {
          name: "Training Shoes",
          path: "/product-catalog?category=kids&type=training",
        },
        {
          name: "Sandals & Slides",
          path: "/product-catalog?category=kids&type=sandals",
        },
      ],
      clothing: [
        {
          name: "T-Shirts & Tanks",
          path: "/product-catalog?category=kids&type=tshirts",
        },
        {
          name: "Hoodies & Sweatshirts",
          path: "/product-catalog?category=kids&type=hoodies",
        },
        {
          name: "Jackets & Coats",
          path: "/product-catalog?category=kids&type=jackets",
        },
        {
          name: "Pants & Leggings",
          path: "/product-catalog?category=kids&type=pants",
        },
        { name: "Shorts", path: "/product-catalog?category=kids&type=shorts" },
      ],
      ages: [
        {
          name: "Infants (0-1 years)",
          path: "/product-catalog?category=kids&age=infant",
        },
        {
          name: "Toddlers (1-3 years)",
          path: "/product-catalog?category=kids&age=toddler",
        },
        {
          name: "Little Kids (3-7 years)",
          path: "/product-catalog?category=kids&age=little",
        },
        {
          name: "Big Kids (7-14 years)",
          path: "/product-catalog?category=kids&age=big",
        },
      ],
    },
  };

  const mockSuggestions = [
    "Ultraboost 22",
    "Stan Smith",
    "Gazelle",
    "Superstar",
    "NMD R1",
  ];

  const mockCartItems = [
    {
      id: 1,
      name: "Ultraboost 22",
      price: 180,
      image: "/assets/images/no_image.png",
      size: "US 9",
    },
    {
      id: 2,
      name: "Stan Smith",
      price: 100,
      image: "/assets/images/no_image.png",
      size: "US 10",
    },
    {
      id: 3,
      name: "Gazelle",
      price: 90,
      image: "/assets/images/no_image.png",
      size: "US 8.5",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchOpen(false);
        setSearchSuggestions([]);
      }
      if (
        userMenuRef?.current &&
        !userMenuRef?.current?.contains(event?.target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        miniCartRef?.current &&
        !miniCartRef?.current?.contains(event?.target)
      ) {
        setIsMiniCartOpen(false);
      }
      if (
        categoryMenuRef?.current &&
        !categoryMenuRef?.current?.contains(event?.target)
      ) {
        setHoveredCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <header className="relative bg-white/95 backdrop-blur-sm z-[1000] border-b border-gray-100">
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #000 10%, transparent 10%, transparent 50%, #000 50%, #000 60%, transparent 60%, transparent 100%)",
            backgroundSize: "8px 8px",
          }}
        ></div>

        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {["Men", "Women", "Kids"].map((category) => (
                <Link
                  key={category}
                  to={`/product-catalog?category=${category.toLowerCase()}`}
                  className="text-sm font-bold text-gray-900 hover:text-black transition-colors uppercase tracking-wider relative group"
                >
                  {category}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-monument font-black tracking-tight text-black">
                  ADIDAS
                </span>
              </Link>
            </div>

            {/* Right Side - Menu Button */}
            <div className="flex items-center ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 group relative"
                aria-label="Menu"
              >
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-black transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-2" : "top-0"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-black transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "top-2"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-black transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "top-4"
                    }`}
                  ></span>
                </div>
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
