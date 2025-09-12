import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const BestSellers = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All Categories", count: 12 },
    { id: "running", label: "Running", count: 5 },
    { id: "lifestyle", label: "Lifestyle", count: 4 },
    { id: "training", label: "Training", count: 3 },
  ];

  const bestSellerProducts = [
    {
      id: 7,
      name: "Ultraboost 22 Black",
      category: "running",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 2847,
      colors: ["#000000", "#FFFFFF", "#6B7280"],
      isWishlisted: false,
    },
    {
      id: 8,
      name: "Stan Smith White Green",
      category: "lifestyle",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 3156,
      colors: ["#FFFFFF", "#22C55E"],
      isWishlisted: true,
    },
    {
      id: 9,
      name: "Superstar Foundation",
      category: "lifestyle",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.7,
      reviewCount: 2234,
      colors: ["#FFFFFF", "#000000"],
      isWishlisted: false,
    },
    {
      id: 10,
      name: "NMD R1 Core Black",
      category: "lifestyle",
      price: 140,
      image:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.6,
      reviewCount: 1892,
      colors: ["#000000", "#FFFFFF", "#EF4444"],
      isWishlisted: false,
    },
    {
      id: 11,
      name: "Alphaboost Training",
      category: "training",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.5,
      reviewCount: 1456,
      colors: ["#000000", "#6B7280", "#EF4444"],
      isWishlisted: false,
    },
    {
      id: 12,
      name: "Gazelle Vintage Blue",
      category: "lifestyle",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.7,
      reviewCount: 987,
      colors: ["#1E40AF", "#DC2626", "#059669"],
      isWishlisted: false,
    },
    {
      id: 13,
      name: "UltraBoost 21 White",
      category: "running",
      price: 160,
      originalPrice: 180,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      isBestSeller: true,
      discount: 11,
      rating: 4.8,
      reviewCount: 2156,
      colors: ["#FFFFFF", "#000000", "#6B7280"],
      isWishlisted: false,
    },
    {
      id: 14,
      name: "CrossTrainer Pro",
      category: "training",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.6,
      reviewCount: 1234,
      colors: ["#000000", "#FFFFFF", "#EF4444"],
      isWishlisted: false,
    },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? bestSellerProducts
      : bestSellerProducts?.filter(
          (product) => product?.category === activeFilter
        );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-coder font-semibold mb-4">
            <Icon name="TrendingUp" size={16} />
            Best Sellers
          </div>
          <h2 className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-4">
            Most Popular Products
          </h2>
          <p className="text-lg font-coder text-gray-600 max-w-2xl mx-auto">
            Discover what everyone's talking about. These are our top-rated and
            most-loved products.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setActiveFilter(filter?.id)}
              className={`px-6 py-3 rounded-full font-coder font-semibold text-sm transition-all duration-200 ${
                activeFilter === filter?.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter?.label}
              <span className="ml-2 text-xs opacity-75">({filter?.count})</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts?.slice(0, 8)?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              showQuickView={true}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
                50K+
              </div>
              <p className="text-gray-600 font-coder">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
                4.8★
              </div>
              <p className="text-gray-600 font-coder">Average Rating</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
                99%
              </div>
              <p className="text-gray-600 font-coder">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            className="font-coder font-semibold"
            asChild
          >
            <Link to="/product-catalog">
              Shop All Best Sellers
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
