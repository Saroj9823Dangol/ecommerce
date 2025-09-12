import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import FilterPanel from "./components/FilterPanel";
import SortControls from "./components/SortControls";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import QuickViewModal from "./components/QuickViewModal";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("search") || ""
  );
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    brands: [],
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [compareList, setCompareList] = useState(new Set());
  const [cartItems, setCartItems] = useState([]);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Ultraboost 22 Running Shoes",
      category: "Running Shoes",
      price: 180,
      originalPrice: 200,
      discount: 10,
      rating: 4.8,
      reviewCount: 1247,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      ],
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      colors: ["black", "white", "blue"],
      brand: "adidas",
      isNew: true,
      description: `Experience unparalleled comfort and energy return with the Ultraboost 22. Featuring responsive BOOST midsole technology and a Primeknit upper that adapts to your foot's changing shape.`,
    },
    {
      id: 2,
      name: "Stan Smith Classic Sneakers",
      category: "Lifestyle",
      price: 100,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 892,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
      colors: ["white", "green"],
      brand: "adidas",
      isNew: false,
      description: `The iconic Stan Smith gets a sustainable update. Made with recycled materials, this timeless silhouette maintains its classic appeal while reducing environmental impact.`,
    },
    {
      id: 3,
      name: "Gazelle Vintage Shoes",
      category: "Lifestyle",
      price: 90,
      originalPrice: 110,
      discount: 18,
      rating: 4.4,
      reviewCount: 634,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
      colors: ["red", "blue", "gray"],
      brand: "adidas",
      isNew: false,
      description: `Step into retro style with the Gazelle. This vintage-inspired shoe features a suede upper and classic 3-Stripes design that's been a street style staple for decades.`,
    },
    {
      id: 4,
      name: "Superstar Original",
      category: "Lifestyle",
      price: 85,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 1156,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      colors: ["white", "black"],
      brand: "adidas",
      isNew: false,
      description: `The shell-toe legend that started it all. The Superstar shoe was born on the basketball court but became a street style icon with its distinctive rubber shell toe.`,
    },
    {
      id: 5,
      name: "NMD R1 Primeknit",
      category: "Running Shoes",
      price: 140,
      originalPrice: 160,
      discount: 12,
      rating: 4.5,
      reviewCount: 789,
      image:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      colors: ["black", "white", "blue"],
      brand: "adidas",
      isNew: true,
      description: `Urban exploration meets cutting-edge design. The NMD R1 features BOOST cushioning and a sock-like Primeknit upper for all-day comfort in the city.`,
    },
    {
      id: 6,
      name: "Forum Low Shoes",
      category: "Basketball",
      price: 95,
      originalPrice: null,
      rating: 4.3,
      reviewCount: 445,
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      colors: ["white", "black", "red"],
      brand: "adidas",
      isNew: false,
      description: `Born on the basketball court in 1984, the Forum Low brings retro basketball style to the streets with its distinctive ankle strap and premium leather upper.`,
    },
    {
      id: 7,
      name: "Continental 80 Shoes",
      category: "Lifestyle",
      price: 80,
      originalPrice: 95,
      discount: 16,
      rating: 4.2,
      reviewCount: 567,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
      colors: ["white", "gray"],
      brand: "adidas",
      isNew: false,
      description: `Inspired by '80s tennis style, the Continental 80 features a premium leather upper with contrasting details and a split rubber cupsole for authentic retro appeal.`,
    },
    {
      id: 8,
      name: "Samba Classic",
      category: "Football",
      price: 75,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 923,
      image:
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
      colors: ["black", "white"],
      brand: "adidas",
      isNew: false,
      description: `The original indoor football shoe. The Samba's leather upper and gum rubber outsole have made it a timeless favorite both on and off the pitch.`,
    },
    {
      id: 9,
      name: "Campus 80s",
      category: "Lifestyle",
      price: 85,
      originalPrice: 100,
      discount: 15,
      rating: 4.4,
      reviewCount: 678,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
      colors: ["green", "blue", "gray"],
      brand: "adidas",
      isNew: true,
      description: `Vintage basketball style meets modern comfort. The Campus 80s features a suede upper and classic proportions that defined an era of athletic footwear.`,
    },
    {
      id: 10,
      name: "ZX 2K Boost",
      category: "Running Shoes",
      price: 120,
      originalPrice: 140,
      discount: 14,
      rating: 4.3,
      reviewCount: 534,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      colors: ["black", "white", "red"],
      brand: "adidas",
      isNew: false,
      description: `Future-forward design meets proven performance. The ZX 2K Boost combines innovative materials with responsive BOOST cushioning for next-level comfort.`,
    },
    {
      id: 11,
      name: "Trefoil Hoodie",
      category: "Clothing",
      price: 65,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 789,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["black", "white", "gray"],
      brand: "adidas",
      isNew: false,
      description: `Classic comfort meets iconic style. This hoodie features the legendary Trefoil logo and soft cotton blend fabric for all-day comfort.`,
    },
    {
      id: 12,
      name: "3-Stripes Track Pants",
      category: "Clothing",
      price: 55,
      originalPrice: 70,
      discount: 21,
      rating: 4.4,
      reviewCount: 623,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["black", "blue", "red"],
      brand: "adidas",
      isNew: true,
      description: `Sporty style for everyday wear. These track pants feature the iconic 3-Stripes design and comfortable fit that's perfect for training or casual wear.`,
    },
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(
        (product) =>
          product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          product?.category
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.categories?.some((category) =>
          product?.category?.toLowerCase()?.includes(category?.toLowerCase())
        )
      );
    }

    // Apply price range filter
    filtered = filtered?.filter(
      (product) =>
        product?.price >= filters?.priceRange?.[0] &&
        product?.price <= filters?.priceRange?.[1]
    );

    // Apply size filter
    if (filters?.sizes?.length > 0) {
      filtered = filtered?.filter(
        (product) =>
          product?.sizes &&
          product?.sizes?.some((size) =>
            filters?.sizes?.includes(size?.toLowerCase())
          )
      );
    }

    // Apply color filter
    if (filters?.colors?.length > 0) {
      filtered = filtered?.filter(
        (product) =>
          product?.colors &&
          product?.colors?.some((color) => filters?.colors?.includes(color))
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.brands?.includes(product?.brand)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case "price-desc":
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case "rating":
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case "newest":
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case "popularity":
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case "name-asc":
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case "name-desc":
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters, sortBy]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleAddToCart = (product, size, color, quantity = 1) => {
    const cartItem = {
      id: `${product?.id}-${size || "default"}-${color || "default"}`,
      productId: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      size: size || "",
      color: color || "",
      quantity,
    };

    setCartItems((prev) => {
      const existingItem = prev?.find((item) => item?.id === cartItem?.id);
      if (existingItem) {
        return prev?.map((item) =>
          item?.id === cartItem?.id
            ? { ...item, quantity: item?.quantity + quantity }
            : item
        );
      }
      return [...prev, cartItem];
    });

    // Show success message (you could implement a toast notification here)
    console.log("Added to cart:", cartItem);
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist?.has(productId)) {
        newWishlist?.delete(productId);
      } else {
        newWishlist?.add(productId);
      }
      return newWishlist;
    });
  };

  const handleToggleCompare = (productId) => {
    setCompareList((prev) => {
      const newCompareList = new Set(prev);
      if (newCompareList?.has(productId)) {
        newCompareList?.delete(productId);
      } else if (newCompareList?.size < 4) {
        // Limit to 4 products for comparison
        newCompareList?.add(productId);
      }
      return newCompareList;
    });
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Add wishlist and compare status to products
  const productsWithStatus = filteredProducts?.map((product) => ({
    ...product,
    isWishlisted: wishlist?.has(product?.id),
    isCompared: compareList?.has(product?.id),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 font-coder pt-[6rem]">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-monument font-bold text-3xl lg:text-4xl text-foreground mb-2">
            Product Catalog
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover our complete collection of premium athletic footwear and
            apparel
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Desktop */}
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            productCount={productsWithStatus?.length}
          />

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onFilterToggle={() => setIsFilterOpen(true)}
              productCount={productsWithStatus?.length}
              totalProducts={products?.length}
            />

            {/* Product Grid */}
            <ProductGrid
              products={productsWithStatus}
              viewMode={viewMode}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              onQuickView={handleQuickView}
              loading={loading}
            />

            {/* Load More Button */}
            {!loading &&
              productsWithStatus?.length > 0 &&
              productsWithStatus?.length < products?.length && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      // Implement load more functionality
                      console.log("Load more products");
                    }}
                  >
                    Load More Products
                  </Button>
                </div>
              )}
          </div>
        </div>

        {/* Compare Bar */}
        {compareList?.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Icon name="BarChart3" size={20} className="text-accent" />
                <span className="font-coder font-medium">
                  {compareList?.size} product{compareList?.size > 1 ? "s" : ""}{" "}
                  selected for comparison
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCompareList(new Set())}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  disabled={compareList?.size < 2}
                  onClick={() => {
                    // Navigate to comparison page
                    console.log("Compare products:", Array.from(compareList));
                  }}
                >
                  Compare ({compareList?.size})
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setQuickViewProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
};

export default ProductCatalog;
