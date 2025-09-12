import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const RelatedProducts = ({ products, title = "Related Products" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products?.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }
      />
    ));
  };

  const handleAddToCart = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // Add to cart logic would go here
    console.log("Added to cart:", product);
  };

  const handleAddToWishlist = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // Add to wishlist logic would go here
    console.log("Added to wishlist:", product);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-monument font-bold text-xl text-foreground">
          {title}
        </h2>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2 font-coder">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      {/* Products Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products?.map((product) => (
            <div key={product?.id} className="w-1/4 flex-shrink-0 px-2">
              <Link
                to={`/product-details?id=${product?.id}`}
                className="block group"
              >
                <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-secondary overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Discount Badge */}
                    {product?.discount && (
                      <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-coder font-medium">
                        -{product?.discount}%
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => handleAddToWishlist(product, e)}
                        className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 mb-2"
                      >
                        <Icon name="Heart" size={14} />
                      </button>
                    </div>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        size="sm"
                        fullWidth
                        onClick={(e) => handleAddToCart(product, e)}
                        iconName="ShoppingCart"
                        iconPosition="left"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-coder font-semibold text-sm text-foreground mb-1 line-clamp-2">
                      {product?.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center space-x-0.5">
                        {renderStars(product?.rating)}
                      </div>
                      <span className="font-coder text-xs text-muted-foreground">
                        ({product?.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="font-monument font-bold text-sm text-foreground">
                        ${product?.price}
                      </span>
                      {product?.originalPrice && (
                        <span className="font-coder text-xs text-muted-foreground line-through">
                          ${product?.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Colors Available */}
                    {product?.colors && product?.colors?.length > 0 && (
                      <div className="flex items-center space-x-1 mt-2">
                        {product?.colors?.slice(0, 3)?.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color?.hex }}
                            title={color?.name}
                          />
                        ))}
                        {product?.colors?.length > 3 && (
                          <span className="font-coder text-xs text-muted-foreground">
                            +{product?.colors?.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentIndex === index ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      {/* View All Link */}
      <div className="text-center mt-6">
        <Link
          to="/product-catalog"
          className="font-coder text-sm text-primary hover:underline"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
