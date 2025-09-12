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
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(5);

  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const miniCartRef = useRef(null);
  const categoryMenuRef = useRef(null);

  const categories = {
    Men: {
      featured: [
        { name: "New Arrivals", href: "/men/new-arrivals" },
        { name: "Best Sellers", href: "/men/best-sellers" },
        { name: "Sale", href: "/men/sale" },
      ],
      shoes: [
        { name: "Running", href: "/men/shoes/running" },
        { name: "Basketball", href: "/men/shoes/basketball" },
        { name: "Sneakers", href: "/men/shoes/sneakers" },
      ],
      clothing: [
        { name: "T-Shirts", href: "/men/clothing/t-shirts" },
        { name: "Hoodies", href: "/men/clothing/hoodies" },
        { name: "Pants", href: "/men/clothing/pants" },
      ],
    },
    Women: {
      featured: [
        { name: "New Arrivals", href: "/women/new-arrivals" },
        { name: "Best Sellers", href: "/women/best-sellers" },
        { name: "Sale", href: "/women/sale" },
      ],
      shoes: [
        { name: "Running", href: "/women/shoes/running" },
        { name: "Training", href: "/women/shoes/training" },
        { name: "Sneakers", href: "/women/shoes/sneakers" },
      ],
      clothing: [
        { name: "Sports Bras", href: "/women/clothing/sports-bras" },
        { name: "Leggings", href: "/women/clothing/leggings" },
        { name: "Tops", href: "/women/clothing/tops" },
      ],
    },
    Kids: {
      featured: [
        { name: "New Arrivals", href: "/kids/new-arrivals" },
        { name: "Best Sellers", href: "/kids/best-sellers" },
        { name: "Sale", href: "/kids/sale" },
      ],
      boys: [
        { name: "Shoes", href: "/kids/boys/shoes" },
        { name: "Clothing", href: "/kids/boys/clothing" },
        { name: "Accessories", href: "/kids/boys/accessories" },
      ],
      girls: [
        { name: "Shoes", href: "/kids/girls/shoes" },
        { name: "Clothing", href: "/kids/girls/clothing" },
        { name: "Accessories", href: "/kids/girls/accessories" },
      ],
    },
    Home: {
      featured: [
        { name: "New Arrivals", href: "/home/new-arrivals" },
        { name: "Best Sellers", href: "/home/best-sellers" },
      ],
      categories: [
        { name: "Furniture", href: "/home/furniture" },
        { name: "Decor", href: "/home/decor" },
        { name: "Lighting", href: "/home/lighting" },
      ],
      rooms: [
        { name: "Living Room", href: "/home/rooms/living" },
        { name: "Bedroom", href: "/home/rooms/bedroom" },
        { name: "Office", href: "/home/rooms/office" },
      ],
    },
  };

  const navigationItems = ["Men", "Women", "Kids", "Home"];

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
        setActiveSubcategory(null);
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

  const styles = `
    .category-dropdown {
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
    }
    
    .category-nav:hover .category-dropdown,
    .category-nav:focus-within .category-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .subcategory-menu {
      display: none;
    }
    
    .subcategory-trigger:hover + .subcategory-menu,
    .subcategory-menu:hover {
      display: block;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      {/* Main Header with Subtle Pattern */}
      <header className="fixed top-0 left-0 right-0 bg-white/0 backdrop-blur-sm z-[1000] h-[5rem] flex items-center">
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-5 bg-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--color-accent) 10%, transparent 10%, transparent 50%, var(--color-accent) 50%, var(--color-accent) 60%, transparent 60%, transparent 100%)",
            backgroundSize: "8px 8px",
          }}
        ></div>

        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((category) => (
                <div
                  key={category}
                  className="category-nav relative"
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={`/${category.toLowerCase()}`}
                    className="text-sm font-bold text-accent transition-colors uppercase tracking-wider relative group"
                  >
                    {category}
                  </Link>

                  {/* Full-width Dropdown */}
                  {hoveredCategory === category && (
                    <div className="category-dropdown absolute left-0 right-0 top-full pt-2">
                      <div className="bg-white shadow-xl border-t border-gray-100">
                        <div className="container mx-auto px-4 py-8">
                          <div className="grid grid-cols-4 gap-8">
                            {Object.entries(categories[category]).map(
                              ([section, items]) => (
                                <div key={section} className="relative">
                                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                    {section}
                                  </h3>
                                  <ul className="space-y-3">
                                    {items.map((item, index) => (
                                      <li key={index}>
                                        <Link
                                          to={item.href}
                                          className="text-sm text-gray-900 hover:text-accent transition-colors"
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="flex items-center">
                <img src="/assets/logo.png" className="h-20 object-contain" />
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
                  <RiMenu3Line size={30} className="text-accent font-bold" />
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
