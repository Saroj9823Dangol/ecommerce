import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const RelatedProducts = ({ products, title = "Related Products" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Calculate max index based on items per view
  const maxIndex = Math.max(0, products?.length - itemsPerView);

  // Handle window resize for responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
      // Reset to first slide on resize to prevent empty spaces
      setCurrentIndex(0);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX - touchEndX;
    const touchThreshold = 50; // Minimum swipe distance to trigger slide change

    if (touchDiff > touchThreshold) {
      handleNext();
    } else if (touchDiff < -touchThreshold) {
      handlePrev();
    }
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
        aria-hidden="true"
      />
    ));
  };

  const handleAddToCart = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("Added to cart:", product);
  };

  const handleAddToWishlist = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log("Added to wishlist:", product);
  };

  // Calculate item width based on items per view
  const itemWidth = 100 / itemsPerView;

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-monument font-bold text-lg sm:text-xl text-foreground">
          {title}
        </h2>

        {/* Navigation Controls - Hidden on mobile when there's only one item */}
        {itemsPerView < products?.length && (
          <div className="flex items-center space-x-2 font-coder self-end sm:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Previous products"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Next products"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Products Carousel */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="list"
          aria-label="Related products list"
        >
          {products?.map((product) => (
            <div
              key={product?.id}
              className="flex-shrink-0 px-1 sm:px-2"
              style={{ width: `${itemWidth}%` }}
              role="listitem"
            >
              <Link
                to={`/product-details?id=${product?.id}`}
                className="block group"
                aria-label={`View ${product?.name} details`}
              >
                <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-secondary overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Discount Badge */}
                    {product?.discount && (
                      <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded text-xs font-coder font-medium">
                        -{product?.discount}%
                      </div>
                    )}

                    {/* Quick Actions - Only show on hover on desktop, always show on mobile */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-opacity duration-200">
                      <button
                        onClick={(e) => handleAddToWishlist(product, e)}
                        className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 mb-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label={`Add ${product?.name} to wishlist`}
                      >
                        <Icon name="Heart" size={14} />
                      </button>
                    </div>

                    {/* Quick Add to Cart - Show on mobile, hide on desktop except on hover */}
                    {/* <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-opacity duration-200">
                      <Button
                        size="sm"
                        fullWidth
                        onClick={(e) => handleAddToCart(product, e)}
                        iconName="ShoppingCart"
                        iconPosition="left"
                        className="text-xs sm:text-sm"
                      >
                        Add to Cart
                      </Button>
                    </div> */}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <h3 className="font-coder font-semibold text-sm text-foreground mb-1 line-clamp-2">
                      {product?.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2 mt-auto">
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
                    {product?.colors?.length > 0 && (
                      <div className="flex items-center space-x-1 mt-2">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color?.hex }}
                            title={color?.name}
                            aria-label={`Color: ${color?.name}`}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="font-coder text-xs text-muted-foreground">
                            +{product.colors.length - 3}
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

      {/* Dots Indicator - Only show if there are multiple slides */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? "bg-primary w-4" : "bg-border"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* View All Link */}
      <div className="text-center mt-4 sm:mt-6">
        <Link
          to="/product-catalog"
          className="font-coder text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded px-2 py-1"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
