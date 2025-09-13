import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import WishlistButton from "../../../components/WishlistButton";

const ProductCard = ({ product, variant = "default" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // Mock cart addition
    console.log("Added to cart:", product?.name);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })?.format(price);
  };

  return (
    <div
      className="group relative bg-white border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton
          productId={product?.id}
          size="sm"
          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
        />
      </div>

      {/* Product Image */}
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <img
          src={product?.images?.[currentImageIndex] || product?.image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/assets/images/no_image.png";
          }}
        />

        {/* Quick View on Hover */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Button
            size="sm"
            className="bg-white text-black hover:bg-gray-100 font-coder"
          >
            Quick View
          </Button>
        </div>

        {/* Sale Badge */}
        {product?.isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product?.discountPercentage}%
          </div>
        )}

        {/* New Badge */}
        {product?.isNew && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}

        {/* Image Navigation Dots */}
        {product?.images?.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product?.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-coder">
            {product?.category}
          </span>
        </div>

        <h3 className="font-coder font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link
            to={`/product-details/${product?.id}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {product?.name}
          </Link>
        </h3>

        {/* Rating */}
        {product?.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={`${
                    i < Math.floor(product?.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product?.rating} ({product?.reviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-coder font-bold text-lg text-gray-900">
            ${product?.price}
          </span>
          {product?.originalPrice && (
            <span className="text-sm text-gray-500 line-through font-coder">
              ${product?.originalPrice}
            </span>
          )}
        </div>

        {/* Colors */}
        {product?.colors?.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs text-gray-500 font-coder">Colors:</span>
            <div className="flex space-x-1">
              {product?.colors?.slice(0, 4)?.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product?.colors?.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{product?.colors?.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {/* <div className="space-y-2 font-coder">
          <Button size="sm" className="w-full">
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
