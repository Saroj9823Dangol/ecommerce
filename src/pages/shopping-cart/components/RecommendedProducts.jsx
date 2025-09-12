import React from "react";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const RecommendedProducts = ({ onAddToCart }) => {
  const recommendedProducts = [
    {
      id: 101,
      name: "Ultraboost 22",
      price: 180,
      originalPrice: 200,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Running Shoes",
      rating: 4.8,
      reviewCount: 1247,
      isNew: false,
      badge: "Best Seller",
    },
    {
      id: 102,
      name: "NMD R1 V2",
      price: 140,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category: "Lifestyle",
      rating: 4.6,
      reviewCount: 892,
      isNew: true,
      badge: "New",
    },
    {
      id: 103,
      name: "Superstar",
      price: 100,
      originalPrice: 120,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      category: "Originals",
      rating: 4.9,
      reviewCount: 2156,
      isNew: false,
      badge: "Classic",
    },
    {
      id: 104,
      name: "Gazelle",
      price: 90,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      category: "Originals",
      rating: 4.7,
      reviewCount: 1543,
      isNew: false,
      badge: null,
    },
  ];

  const handleAddToCart = (product) => {
    onAddToCart({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      category: product?.category,
      variant: {
        size: "US 9",
        color: "Black",
      },
      quantity: 1,
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={12}
          className="text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="Star"
          size={12}
          className="text-yellow-400 fill-current opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={12}
          className="text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-monument font-bold text-xl text-foreground">
          You might also like
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => (window.location.href = "/product-catalog")}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-coder">
        {recommendedProducts?.map((product) => (
          <div
            key={product?.id}
            className="group bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-secondary overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badge */}
              {product?.badge && (
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product?.badge === "New"
                        ? "bg-accent text-accent-foreground"
                        : product?.badge === "Best Seller"
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {product?.badge}
                  </span>
                </div>
              )}

              {/* Quick Add Button */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  iconName="Plus"
                  iconPosition="left"
                  className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                  Quick Add
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-1">
                {product?.category}
              </p>

              <h3 className=" font-semibold text-foreground mb-2 line-clamp-2 leading-[1.2] h-[calc(1.2em*2)]">
                {product?.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className=" font-bold text-foreground">
                    ${product?.price}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product?.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    (window.location.href = `/product-details?id=${product?.id}`)
                  }
                  className="text-accent hover:text-accent/80 transition-colors duration-200"
                >
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center mt-6">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/product-catalog")}
          iconName="Grid3x3"
          iconPosition="left"
        >
          Browse All Products
        </Button>
      </div>
    </div>
  );
};

export default RecommendedProducts;
