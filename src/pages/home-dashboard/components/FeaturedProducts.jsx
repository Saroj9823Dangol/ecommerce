import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Ultraboost 22 Running Shoes",
      category: "Running",
      price: 180,
      originalPrice: 200,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      isNew: true,
      discount: 10,
      rating: 4.8,
      reviewCount: 1247,
      colors: ["#000000", "#FFFFFF", "#FF6B35", "#1E40AF"],
      isWishlisted: false,
    },
    {
      id: 2,
      name: "Stan Smith Classic Sneakers",
      category: "Lifestyle",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 2156,
      colors: ["#FFFFFF", "#000000", "#22C55E"],
      isWishlisted: true,
    },
    {
      id: 3,
      name: "NMD R1 Urban Explorer",
      category: "Lifestyle",
      price: 140,
      originalPrice: 160,
      image:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
      discount: 12,
      rating: 4.6,
      reviewCount: 892,
      colors: ["#1F2937", "#EF4444", "#FFFFFF"],
      isWishlisted: false,
    },
    {
      id: 4,
      name: "Gazelle Vintage Sneakers",
      category: "Originals",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 654,
      colors: ["#DC2626", "#1E40AF", "#059669"],
      isWishlisted: false,
    },
    {
      id: 5,
      name: "Superstar Foundation",
      category: "Originals",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 1876,
      colors: ["#FFFFFF", "#000000"],
      isWishlisted: false,
    },
    {
      id: 6,
      name: "Alphaboost Training Shoes",
      category: "Training",
      price: 120,
      originalPrice: 140,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      isNew: true,
      discount: 14,
      rating: 4.5,
      reviewCount: 423,
      colors: ["#000000", "#6B7280", "#EF4444"],
      isWishlisted: false,
    },
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef?.current) {
      const container = scrollContainerRef?.current;
      const itemWidth = container?.scrollWidth / featuredProducts?.length;
      container?.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollNext = () => {
    const maxIndex = featuredProducts?.length - itemsPerView?.desktop;
    const nextIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(nextIndex);
  };

  const scrollPrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-lg font-coder text-gray-600">
              Discover our most popular and trending items
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={currentIndex === 0}
              className="w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={
                currentIndex >= featuredProducts?.length - itemsPerView?.desktop
              }
              className="w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProducts?.map((product) => (
              <div key={product?.id} className="flex-none w-72 sm:w-80 lg:w-72">
                <ProductCard product={product} showQuickView={true} />
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex gap-2">
              {Array.from({
                length: Math.ceil(
                  featuredProducts?.length / itemsPerView?.mobile
                ),
              })?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-black w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="font-coder font-semibold"
            asChild
          >
            <Link to="/product-catalog">
              View All Products
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
