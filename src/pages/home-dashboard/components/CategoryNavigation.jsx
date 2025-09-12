import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CategoryNavigation = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Running",
      description: "Performance shoes for every run",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      icon: "Zap",
      link: "/product-catalog?category=running",
      productCount: 156,
    },
    {
      id: 2,
      name: "Lifestyle",
      description: "Everyday comfort and style",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop",
      icon: "Heart",
      link: "/product-catalog?category=lifestyle",
      productCount: 243,
    },
    {
      id: 3,
      name: "Training",
      description: "Built for your workout",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop",
      icon: "Activity",
      link: "/product-catalog?category=training",
      productCount: 89,
    },
    {
      id: 4,
      name: "Originals",
      description: "Timeless classics reimagined",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=200&fit=crop",
      icon: "Star",
      link: "/product-catalog?category=originals",
      productCount: 127,
    },
    {
      id: 5,
      name: "Basketball",
      description: "Dominate the court",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
      icon: "Target",
      link: "/product-catalog?category=basketball",
      productCount: 67,
    },
    {
      id: 6,
      name: "Football",
      description: "Precision and performance",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      icon: "Circle",
      link: "/product-catalog?category=football",
      productCount: 94,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg font-coder text-gray-600 max-w-2xl mx-auto">
            Find the perfect gear for your sport and lifestyle. Each category is
            crafted with specific performance needs in mind.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              to={category?.link}
              className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredCategory(category?.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon
                      name={category?.icon}
                      size={20}
                      className="text-gray-900"
                    />
                  </div>
                </div>

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/80 text-white text-xs font-coder font-semibold px-2 py-1 rounded-full">
                    {category?.productCount} items
                  </span>
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
                    hoveredCategory === category?.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <div className="text-white text-center">
                    <Icon
                      name="ArrowRight"
                      size={24}
                      className="mx-auto mb-2"
                    />
                    <span className="font-coder font-semibold">Shop Now</span>
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-coder font-bold text-gray-900 group-hover:text-black transition-colors duration-200">
                    {category?.name}
                  </h3>
                  <p className="text-gray-600 font-coder">
                    {category?.description}
                  </p>
                </div>

                {/* Action Arrow */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-coder text-gray-500">
                    Explore collection
                  </span>
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className={`text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200 ${
                      hoveredCategory === category?.id ? "translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-600 font-coder">
            <span>Can't find what you're looking for?</span>
            <Link
              to="/product-catalog"
              className="text-black font-semibold hover:underline transition-all duration-200"
            >
              Browse all products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;
