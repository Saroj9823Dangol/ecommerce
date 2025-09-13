import { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  fetchCategories,
  fetchFeaturedCategories,
} from "store/slices/categoriesSlice";
import { dispatch, useSelector } from "store/store";
import Icon from "../AppIcon";

// Skeleton Loader Component
const SkeletonLoader = ({ count = 1, className = "" }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className={`animate-pulse bg-gray-200 rounded ${className}`}
        style={{ animationDelay: `${index * 100}ms` }}
      />
    ));
};

// Skeleton for menu items
const MenuSkeleton = () => (
  <div className="">
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-5 gap-8 h-[70vh] overflow-y-auto pr-4">
        {[1, 2, 3, 4].map((col) => (
          <div key={col} className="space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="space-y-3 mt-4">
              {[1, 2, 3, 4].map((item) => (
                <SkeletonLoader key={item} />
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-2 row-span-2 bg-gray-100 rounded-lg">
          <SkeletonLoader count={1} className="h-64" />
        </div>
      </div>
    </div>
  </div>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const dropdownRef = useRef(null);

  const { categories, featuredCategories, loading, featuredLoading } =
    useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(
      fetchFeaturedCategories({
        params: {
          pageSize: 4,
          page: 1,
          populate: "parent",
          sort: "order:ASC",
          filters: {
            "parent.id": {
              $null: true,
            },
          },
        },
      })
    );
  }, []);

  useEffect(() => {
    if (
      categories?.length > 0 &&
      categories?.[0]?.parent?.parent?.id === activeCategory
    ) {
      return;
    }
    if (activeCategory) {
      dispatch(
        fetchCategories({
          params: {
            pageSize: 100,
            page: 1,
            populate: "parent.parent",
            sort: "order:ASC",
            filters: {
              $and: [
                {
                  $or: [
                    {
                      "parent.id": {
                        $eq: activeCategory,
                      },
                    },
                    {
                      "parent.parent.id": {
                        $eq: activeCategory,
                      },
                    },
                  ],
                },
                {
                  "parent.parent.id": {
                    $notNull: true,
                  },
                },
              ],
            },
          },
        })
      );
    }
  }, [activeCategory]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Main Header with Subtle Pattern */}
      <header className="fixed top-0 left-0 right-0 bg-white/0 backdrop-blur-sm z-[1000] h-[5rem] flex items-center">
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {featuredLoading && !featuredCategories?.length ? (
                // Skeleton for top navigation
                <div className="flex space-x-8">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-6 w-20 bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
              ) : (
                featuredCategories?.map((category) => (
                  <div
                    key={category?.id}
                    className="relative group"
                    onMouseEnter={() => setActiveCategory(category?.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="flex items-center cursor-pointer py-2 group/nav-item">
                      <div className="relative">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider hover:text-accent/80 transition-colors">
                          {category?.name}
                        </span>
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                            activeCategory === category?.id
                              ? "w-full"
                              : "w-0 group-hover/nav-item:w-full"
                          }`}
                        ></span>
                      </div>
                    </div>

                    {/* Mega Menu */}
                    {activeCategory === category?.id && (
                      <div className="fixed left-0 right-0 backdrop-blur-xl bg-white shadow-xl z-50 border-t border-gray-100 animate-fadeIn font-coder overflow-hidden">
                        {loading ? (
                          <MenuSkeleton />
                        ) : (
                          <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-5 gap-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                              {Array.from(
                                new Map(
                                  categories?.map((cat) => [
                                    cat?.parent?.id,
                                    cat?.parent,
                                  ])
                                )?.values()
                              )?.map((subcategory) => (
                                <div key={subcategory?.id} className="group">
                                  <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 group-hover:text-accent transition-colors duration-200">
                                    {subcategory?.name}
                                  </h4>
                                  <ul className="space-y-3 mt-2">
                                    {categories
                                      ?.filter(
                                        (cat) =>
                                          cat?.parent?.id === subcategory?.id
                                      )
                                      ?.map((item) => (
                                        <li
                                          key={item?.id}
                                          className="transform hover:translate-x-1 transition-transform duration-200"
                                        >
                                          <Link
                                            to={`/${category?.name?.toLowerCase()}/${item?.name
                                              ?.toLowerCase()
                                              ?.replace(/\s+/g, "-")}`}
                                            className="text-sm text-gray-600 hover:text-accent transition-colors duration-200 flex items-center group/item"
                                          >
                                            <span className="w-1.5 h-1.5 bg-accent opacity-0 group-hover/item:opacity-100 rounded-full mr-2 transition-all duration-200"></span>
                                            {item?.name}
                                            {item === "New Arrivals" && (
                                              <span className="ml-2 px-1.5 py-0.5 bg-accent text-white text-xs rounded-full">
                                                New
                                              </span>
                                            )}
                                            {item === "Sale" && (
                                              <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                                Sale
                                              </span>
                                            )}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              ))}

                              {category?.name === "Men" && (
                                <div className="relative rounded-lg overflow-hidden col-span-2 row-span-2 group">
                                  <img
                                    src="/assets/images/men-featured.jpg"
                                    alt="Men's Collection"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                    <span className="text-xs text-white/80 mb-1">
                                      NEW COLLECTION
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                      Summer '24
                                    </h3>
                                    <p className="text-sm text-white/90 mb-4">
                                      Discover the latest styles for the season
                                    </p>
                                    <button className="bg-white text-accent text-sm font-medium px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors">
                                      Shop Now
                                    </button>
                                  </div>
                                </div>
                              )}

                              {category?.name === "Women" && (
                                <div className="relative rounded-lg overflow-hidden col-span-2 row-span-2 group">
                                  <img
                                    src="/assets/images/women-featured.jpg"
                                    alt="Women's Collection"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                    <span className="text-xs text-white/80 mb-1">
                                      FEATURED
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                      Activewear
                                    </h3>
                                    <p className="text-sm text-white/90 mb-4">
                                      Performance meets style
                                    </p>
                                    <button className="bg-white text-accent text-sm font-medium px-4 py-2 rounded-full w-fit hover:bg-gray-100 transition-colors">
                                      Explore
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                  <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:text-accent flex items-center"
                                  >
                                    <Icon
                                      name="Star"
                                      size={16}
                                      className="mr-2"
                                    />
                                    New Arrivals
                                  </a>
                                  <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:text-accent flex items-center"
                                  >
                                    <Icon
                                      name="Tag"
                                      size={16}
                                      className="mr-2"
                                    />
                                    Best Sellers
                                  </a>
                                  <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:text-accent flex items-center"
                                  >
                                    <Icon
                                      name="Percent"
                                      size={16}
                                      className="mr-2"
                                    />
                                    Sale
                                  </a>
                                </div>
                                <a
                                  href="#"
                                  className="text-sm font-medium text-accent hover:underline flex items-center"
                                >
                                  View All {category?.name}
                                  <Icon
                                    name="ArrowRight"
                                    size={16}
                                    className="ml-1"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
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
                        label: `Wishlist${5 > 0 ? ` (${5})` : ""}`,
                        icon: "Heart",
                        path: "/wishlist",
                      },
                      {
                        label: `Cart${5 > 0 ? ` (${5})` : ""}`,
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
                      // onClick={handleLogout}
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
