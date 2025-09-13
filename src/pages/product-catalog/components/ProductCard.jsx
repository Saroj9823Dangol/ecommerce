import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProductCard = ({
  product,
  viewMode = "grid",
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (selectedSize || product?.sizes?.length === 0) {
      onAddToCart(product, selectedSize);
    }
  };

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onToggleWishlist(product?.id);
  };

  const handleCompareToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onToggleCompare(product?.id);
  };

  const handleQuickView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onQuickView(product);
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
          size={14}
          className="text-warning fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="Star"
          size={14}
          className="text-warning fill-current opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={14}
          className="text-muted-foreground"
        />
      );
    }

    return stars;
  };

  if (viewMode === "list") {
    return (
      <Link
        to={`/product-details?id=${product?.id}`}
        className="block bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4 flex-wrap">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-md">
            <Image
              src={product?.image}
              alt={product?.name}
              className=" w-32 aspect-square object-cover transition-transform duration-300 hover:scale-105"
            />
            {product?.isNew && (
              <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            )}
            {product?.discount && (
              <span className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
                -{product?.discount}%
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 font-coder">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {product?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product?.category}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    product?.isWishlisted
                      ? "text-error bg-error/10"
                      : "text-muted-foreground hover:text-error hover:bg-error/10"
                  }`}
                >
                  <Icon
                    name="Heart"
                    size={18}
                    className={product?.isWishlisted ? "fill-current" : ""}
                  />
                </button>
                <button
                  onClick={handleCompareToggle}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    product?.isCompared
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                  }`}
                >
                  <Icon name="BarChart3" size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {renderStars(product?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product?.reviewCount} reviews)
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product?.description}
            </p>

            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center space-x-2">
                {product?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product?.originalPrice}
                  </span>
                )}
                <span className="font-coder font-bold text-xl text-foreground">
                  ${product?.price}
                </span>
              </div>

              <div className="flex items-center font-coder flex-wrap gap-2">
                <Button size="sm" onClick={handleQuickView}>
                  Quick View
                </Button>
                {/* <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={product?.sizes?.length > 0 && !selectedSize}
                >
                  Add to Cart
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product-details?id=${product?.id}`}
      className="block bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {product?.discount && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
              -{product?.discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 ${
              product?.isWishlisted
                ? "text-error"
                : "text-muted-foreground hover:text-error"
            }`}
          >
            <Icon
              name="Heart"
              size={18}
              className={product?.isWishlisted ? "fill-current" : ""}
            />
          </button>
          <button
            onClick={handleCompareToggle}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 ${
              product?.isCompared
                ? "text-accent"
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            <Icon name="BarChart3" size={18} />
          </button>
        </div>

        {/* Quick View Button - Shows on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center font-coder">
            <Button
              variant="secondary"
              onClick={handleQuickView}
              className="transform transition-all duration-200"
            >
              <Icon name="Eye" size={18} className="mr-2" />
              Quick View
            </Button>
          </div>
        )}
      </div>
      {/* Product Details */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-coder font-semibold text-base text-foreground line-clamp-2 leading-[1.2] h-[calc(1.2em*2)]">
            {product?.name}
          </h3>
          <p className="text-sm text-muted-foreground font-coder mt-2">
            {product?.category}
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-3 font-coder">
          <div className="flex items-center">
            {renderStars(product?.rating)}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Available Sizes */}
        {product?.sizes && product?.sizes?.length > 0 && (
          <div className="mb-3 font-coder">
            <p className="text-xs text-muted-foreground mb-2">
              Available Sizes:
            </p>
            <div className="flex flex-wrap gap-1">
              {product?.sizes?.slice(0, 4)?.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    setSelectedSize(size === selectedSize ? "" : size);
                  }}
                  className={`px-2 py-1 text-xs font-coder font-medium rounded border transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-secondary"
                  }`}
                >
                  {size}
                </button>
              ))}
              {product?.sizes?.length > 4 && (
                <span className="px-2 py-1 text-xs text-muted-foreground">
                  +{product?.sizes?.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through font-coder">
                ${product?.originalPrice}
              </span>
            )}
            <span className="font-bold text-lg text-foreground font-coder">
              ${product?.price}
            </span>
          </div>
        </div>

        {/* <Button
          fullWidth
          onClick={handleAddToCart}
          disabled={product?.sizes?.length > 0 && !selectedSize}
          className="mt-3"
        >
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          Add to Cart
        </Button> */}
      </div>
    </Link>
  );
};

export default ProductCard;
