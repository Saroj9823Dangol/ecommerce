import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product?.images || [product?.image];

  const colors = [
    { name: "Black", value: "black", color: "#000000" },
    { name: "White", value: "white", color: "#FFFFFF" },
    { name: "Red", value: "red", color: "#EF4444" },
    { name: "Blue", value: "blue", color: "#3B82F6" },
  ];

  const sizes = product?.sizes || ["XS", "S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    if (sizes?.length > 0 && !selectedSize) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleWishlistToggle = () => {
    onToggleWishlist(product?.id);
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
          size={16}
          className="text-warning fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="Star"
          size={16}
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
          size={16}
          className="text-muted-foreground"
        />
      );
    }

    return stars;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 font-coder"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-monument font-semibold text-xl text-foreground">
              Quick View
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={images?.[currentImageIndex]}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
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

                  {/* Navigation Arrows */}
                  {images?.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? images?.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-foreground hover:bg-white transition-colors duration-200"
                      >
                        <Icon name="ChevronLeft" size={20} />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === images?.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-foreground hover:bg-white transition-colors duration-200"
                      >
                        <Icon name="ChevronRight" size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Images */}
                {images?.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {images?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors duration-200 ${
                          currentImageIndex === index
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product?.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-monument font-bold text-2xl text-foreground mb-2">
                    {product?.name}
                  </h1>
                  <p className="text-muted-foreground">{product?.category}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product?.rating} ({product?.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3">
                  {product?.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product?.originalPrice}
                    </span>
                  )}
                  <span className="font-monument font-bold text-3xl text-foreground">
                    ${product?.price}
                  </span>
                  {product?.discount && (
                    <span className="text-success font-medium">
                      Save $
                      {(product?.originalPrice - product?.price)?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product?.description ||
                    `Experience premium comfort and style with the ${product?.name}. Crafted with attention to detail and designed for performance, this product combines innovative technology with timeless design.`}
                </p>

                {/* Color Selection */}
                {colors?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-coder font-medium text-sm text-foreground">
                      Color:{" "}
                      {selectedColor &&
                        colors?.find((c) => c?.value === selectedColor)?.name}
                    </h4>
                    <div className="flex space-x-2">
                      {colors?.map((color) => (
                        <button
                          key={color?.value}
                          onClick={() => setSelectedColor(color?.value)}
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                            selectedColor === color?.value
                              ? "border-primary scale-110"
                              : "border-border hover:scale-105"
                          }`}
                          style={{ backgroundColor: color?.color }}
                          title={color?.name}
                        >
                          {selectedColor === color?.value && (
                            <Icon
                              name="Check"
                              size={20}
                              className={
                                color?.value === "white"
                                  ? "text-black"
                                  : "text-white"
                              }
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {sizes?.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-coder font-medium text-sm text-foreground">
                      Size: {selectedSize}
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            setSelectedSize(size === selectedSize ? "" : size)
                          }
                          className={`px-3 py-2 text-sm font-coder font-medium rounded-md border transition-colors duration-200 ${
                            selectedSize === size
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:bg-secondary"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-3">
                  <h4 className="font-coder font-medium text-sm text-foreground">
                    Quantity
                  </h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-border rounded-md hover:bg-secondary transition-colors duration-200"
                    >
                      <Icon name="Minus" size={16} />
                    </button>
                    <span className="font-coder font-medium text-lg w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-border rounded-md hover:bg-secondary transition-colors duration-200"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 font-coder">
                  <Button
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={sizes?.length > 0 && !selectedSize}
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleWishlistToggle}
                    className={
                      product?.isWishlisted ? "text-error border-error" : ""
                    }
                  >
                    <Icon
                      name="Heart"
                      size={20}
                      className={product?.isWishlisted ? "fill-current" : ""}
                    />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-muted-foreground font-coder">
                  <div className="flex items-center space-x-2">
                    <Icon name="Truck" size={16} />
                    <span>Free shipping on orders over $75</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="RotateCcw" size={16} />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} />
                    <span>2-year warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
