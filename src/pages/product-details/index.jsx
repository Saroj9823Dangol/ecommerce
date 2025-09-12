import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductSpecifications from "./components/ProductSpecifications";
import CustomerReviews from "./components/CustomerReviews";
import RelatedProducts from "./components/RelatedProducts";
import Icon from "../../components/AppIcon";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams?.get("id") || "1";

  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Ultraboost 22 Running Shoes",
    price: 180,
    originalPrice: 220,
    discount: 18,
    rating: 4.5,
    reviewCount: 1247,
    description: `Experience the ultimate in comfort and performance with the Ultraboost 22. Featuring our most responsive Boost midsole yet, these running shoes deliver incredible energy return with every step. The Primeknit upper adapts to your foot's natural movement while providing targeted support where you need it most.`,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    ],
    colors: [
      { id: 1, name: "Core Black", hex: "#000000" },
      { id: 2, name: "Cloud White", hex: "#FFFFFF" },
      { id: 3, name: "Solar Red", hex: "#FF4444" },
      { id: 4, name: "Navy Blue", hex: "#1E3A8A" },
    ],
    sizes: [
      { value: "7", label: "US 7", available: true },
      { value: "7.5", label: "US 7.5", available: true },
      { value: "8", label: "US 8", available: true },
      { value: "8.5", label: "US 8.5", available: false },
      { value: "9", label: "US 9", available: true },
      { value: "9.5", label: "US 9.5", available: true },
      { value: "10", label: "US 10", available: true },
      { value: "10.5", label: "US 10.5", available: false },
      { value: "11", label: "US 11", available: true },
      { value: "11.5", label: "US 11.5", available: true },
      { value: "12", label: "US 12", available: true },
    ],
    features: [
      "Boost midsole for incredible energy return",
      "Primeknit upper for adaptive fit and comfort",
      "Continental rubber outsole for superior traction",
      "Torsion System for midfoot stability",
      "Reflective details for low-light visibility",
      "Sustainable materials in construction",
    ],
  };

  const mockSpecifications = [
    { label: "Brand", value: "Adidas" },
    { label: "Model", value: "Ultraboost 22" },
    { label: "Category", value: "Running Shoes" },
    { label: "Gender", value: "Unisex" },
    { label: "Weight", value: "310g (US 9)" },
    { label: "Drop", value: "10mm" },
    { label: "Surface", value: "Road" },
    { label: "Support Type", value: "Neutral" },
    { label: "Closure", value: "Lace-up" },
    { label: "Season", value: "All Season" },
  ];

  const mockMaterials = [
    {
      component: "Upper",
      description: "Primeknit textile made from recycled ocean plastic",
      percentage: "50% recycled materials",
    },
    {
      component: "Midsole",
      description: "Boost foam technology for energy return",
      percentage: "100% TPU pellets",
    },
    {
      component: "Outsole",
      description: "Continental rubber compound for grip",
      percentage: "Rubber compound",
    },
    {
      component: "Lining",
      description: "Textile lining for comfort and breathability",
      percentage: "Synthetic materials",
    },
  ];

  const mockCareInstructions = [
    {
      icon: "Droplets",
      title: "Cleaning",
      description:
        "Remove dirt with a soft brush. Use mild soap and water for deeper cleaning. Avoid harsh chemicals.",
    },
    {
      icon: "Sun",
      title: "Drying",
      description:
        "Air dry at room temperature. Avoid direct sunlight and heat sources like radiators or dryers.",
    },
    {
      icon: "Archive",
      title: "Storage",
      description:
        "Store in a cool, dry place. Use shoe trees to maintain shape when not wearing.",
    },
    {
      icon: "Shield",
      title: "Protection",
      description:
        "Apply water-repellent spray regularly to protect against moisture and stains.",
    },
  ];

  const mockReviews = [
    {
      id: 1,
      author: "Michael Johnson",
      rating: 5,
      title: "Incredible comfort and performance!",
      content: `These shoes are absolutely amazing! I've been running in them for 3 months now and they still feel like new. The Boost technology really works - I can feel the energy return with every step. The fit is perfect and they're incredibly comfortable for long runs.`,
      date: "2025-01-15",
      verified: true,
      helpful: 23,
      size: "US 9",
      images: [],
    },
    {
      id: 2,
      author: "Sarah Chen",
      rating: 4,
      title: "Great shoes, minor sizing issue",
      content: `Love the design and comfort of these shoes. The Primeknit upper is really nice and adapts well to my foot. Only issue is they run slightly small - I had to go up half a size. Otherwise, excellent quality and performance.`,
      date: "2025-01-10",
      verified: true,
      helpful: 18,
      size: "US 8.5",
      images: [],
    },
    {
      id: 3,
      author: "David Rodriguez",
      rating: 5,
      title: "Best running shoes I've owned",
      content: `I'm a serious runner and these are hands down the best shoes I've ever owned. The energy return is incredible and they're so comfortable I can wear them all day. Worth every penny!`,
      date: "2025-01-05",
      verified: true,
      helpful: 31,
      size: "US 10",
      images: [],
    },
    {
      id: 4,
      author: "Emma Wilson",
      rating: 4,
      title: "Stylish and comfortable",
      content: `These shoes look great and are very comfortable for both running and casual wear. The quality is excellent and I love the sustainable materials. Only wish they came in more color options.`,
      date: "2024-12-28",
      verified: false,
      helpful: 12,
      size: "US 7.5",
      images: [],
    },
  ];

  const mockRelatedProducts = [
    {
      id: 2,
      name: "Stan Smith Classic Sneakers",
      price: 100,
      originalPrice: 120,
      discount: 17,
      rating: 4.3,
      reviewCount: 892,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      colors: [
        { name: "White/Green", hex: "#FFFFFF" },
        { name: "White/Navy", hex: "#1E3A8A" },
      ],
    },
    {
      id: 3,
      name: "Gazelle Vintage Sneakers",
      price: 90,
      rating: 4.4,
      reviewCount: 567,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      colors: [
        { name: "Grey", hex: "#6B7280" },
        { name: "Navy", hex: "#1E3A8A" },
        { name: "Burgundy", hex: "#7C2D12" },
      ],
    },
    {
      id: 4,
      name: "Superstar Shell Toe",
      price: 85,
      rating: 4.6,
      reviewCount: 1203,
      image:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
      colors: [
        { name: "White/Black", hex: "#FFFFFF" },
        { name: "Black/White", hex: "#000000" },
      ],
    },
    {
      id: 5,
      name: "NMD R1 Primeknit",
      price: 140,
      originalPrice: 160,
      discount: 13,
      rating: 4.2,
      reviewCount: 734,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
      colors: [
        { name: "Core Black", hex: "#000000" },
        { name: "Solar Red", hex: "#FF4444" },
        { name: "Blue", hex: "#3B82F6" },
      ],
    },
    {
      id: 6,
      name: "Alphaboost Training",
      price: 120,
      rating: 4.1,
      reviewCount: 445,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      colors: [
        { name: "Grey/Orange", hex: "#6B7280" },
        { name: "Black/Red", hex: "#000000" },
      ],
    },
  ];

  const mockRecentlyViewed = [
    {
      id: 7,
      name: "Forum Low Classic",
      price: 95,
      rating: 4.0,
      reviewCount: 321,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Black", hex: "#000000" },
      ],
    },
    {
      id: 8,
      name: "Continental 80",
      price: 80,
      rating: 4.3,
      reviewCount: 256,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      colors: [
        { name: "White/Red", hex: "#FFFFFF" },
        { name: "Off White", hex: "#F9FAFB" },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (productData) => {
    console.log("Adding to cart:", productData);
    // Add to cart logic would go here
    alert(
      `Added ${productData?.name} to cart!\nSize: ${productData?.selectedSize}\nColor: ${productData?.selectedColor?.name}\nQuantity: ${productData?.quantity}`
    );
  };

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", mockProduct);
    // Add to wishlist logic would go here
    alert(`Added ${mockProduct?.name} to wishlist!`);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center pt-[6rem]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-coder text-muted-foreground">
              Loading product details...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-[6rem]">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm font-coder">
              <button
                onClick={() => navigate("/home-dashboard")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Home
              </button>
              <Icon
                name="ChevronRight"
                size={14}
                className="text-muted-foreground"
              />
              <button
                onClick={() => navigate("/product-catalog")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Products
              </button>
              <Icon
                name="ChevronRight"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-foreground font-medium">Running Shoes</span>
              <Icon
                name="ChevronRight"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-foreground font-medium truncate">
                {mockProduct?.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery
                images={mockProduct?.images}
                productName={mockProduct?.name}
              />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo
                product={mockProduct}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="sticky top-16 bg-background/95 backdrop-blur-sm border-b border-border z-40 mb-8">
            <div className="flex space-x-8 overflow-x-auto pb-0">
              {[
                {
                  id: "specifications",
                  label: "Specifications",
                  icon: "FileText",
                },
                { id: "reviews", label: "Reviews", icon: "Star" },
                { id: "related", label: "Related Products", icon: "Grid3x3" },
              ]?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => scrollToSection(section?.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-coder font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    activeSection === section?.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Specifications */}
          <section id="specifications" className="mb-12">
            <ProductSpecifications
              specifications={mockSpecifications}
              materials={mockMaterials}
              careInstructions={mockCareInstructions}
            />
          </section>

          {/* Customer Reviews */}
          <section id="reviews" className="mb-12">
            <CustomerReviews
              reviews={mockReviews}
              averageRating={mockProduct?.rating}
              totalReviews={mockProduct?.reviewCount}
            />
          </section>

          {/* Related Products */}
          <section id="related" className="mb-12">
            <RelatedProducts
              products={mockRelatedProducts}
              title="Related Products"
            />
          </section>

          {/* Recently Viewed */}
          {mockRecentlyViewed?.length > 0 && (
            <section className="mb-12">
              <RelatedProducts
                products={mockRecentlyViewed}
                title="Recently Viewed"
              />
            </section>
          )}
        </div>

        {/* Floating Action Bar (Mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddToWishlist}
              className="w-12 h-12 border border-border rounded-md flex items-center justify-center hover:bg-secondary transition-colors duration-200"
            >
              <Icon name="Heart" size={20} />
            </button>
            <button
              onClick={() =>
                handleAddToCart({
                  ...mockProduct,
                  selectedSize: "US 9",
                  selectedColor: mockProduct?.colors?.[0],
                  quantity: 1,
                })
              }
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-coder font-semibold text-center hover:bg-primary/90 transition-colors duration-200"
            >
              Add to Cart - ${mockProduct?.price}
            </button>
          </div>
        </div>

        {/* Mobile Spacer */}
        <div className="lg:hidden h-20"></div>
      </div>
    </>
  );
};

export default ProductDetails;
