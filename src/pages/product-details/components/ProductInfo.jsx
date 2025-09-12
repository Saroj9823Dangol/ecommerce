import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={16}
        className={
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="space-y-6 font-coder">
      {/* Product Title and Price */}
      <div>
        <h1 className="font-monument font-bold text-2xl lg:text-3xl text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4 mb-3">
          <span className="font-monument font-bold text-2xl text-foreground">
            ${product?.price}
          </span>
          {product?.originalPrice && (
            <span className="font-coder text-lg text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
          )}
          {product?.discount && (
            <span className="bg-error text-error-foreground px-2 py-1 rounded text-sm font-coder font-medium">
              -{product?.discount}%
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
          </div>
          <span className="font-coder text-sm text-muted-foreground">
            {product?.rating} ({product?.reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Product Description */}
      <div>
        <p className="font-coder text-muted-foreground leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Color Selection */}
      <div>
        <h3 className="font-coder font-semibold text-sm mb-3">
          Color: {selectedColor?.name}
        </h3>
        <div className="flex space-x-2">
          {product?.colors?.map((color) => (
            <button
              key={color?.id}
              onClick={() => handleColorSelect(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor?.id === color?.id
                  ? "border-primary scale-110"
                  : "border-border hover:border-muted-foreground"
              }`}
              style={{ backgroundColor: color?.hex }}
              title={color?.name}
            />
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-coder font-semibold text-sm">Size</h3>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="font-coder text-sm text-primary hover:underline"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product?.sizes?.map((size) => (
            <button
              key={size?.value}
              onClick={() => handleSizeSelect(size?.value)}
              disabled={!size?.available}
              className={`py-3 px-4 border rounded-md font-coder font-medium text-sm transition-all duration-200 ${
                selectedSize === size?.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : size?.available
                  ? "border-border hover:border-muted-foreground"
                  : "border-border bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {size?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Quantity Selection */}
      <div>
        <h3 className="font-coder font-semibold text-sm mb-3">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 font-coder font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-2 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="font-coder text-sm text-muted-foreground">
            Max 10 items
          </span>
        </div>
      </div>
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon
          name={product?.inStock ? "Check" : "X"}
          size={16}
          className={product?.inStock ? "text-success" : "text-error"}
        />
        <span
          className={`font-coder text-sm ${
            product?.inStock ? "text-success" : "text-error"
          }`}
        >
          {product?.inStock ? "In Stock" : "Out of Stock"}
        </span>
        {product?.inStock && (
          <span className="font-coder text-sm text-muted-foreground">
            • Ships in 2-3 business days
          </span>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={!product?.inStock}
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onAddToWishlist}
            iconName="Heart"
            iconPosition="left"
          >
            Wishlist
          </Button>
          <Button variant="outline" iconName="Share" iconPosition="left">
            Share
          </Button>
        </div>
      </div>
      {/* Product Features */}
      <div className="border-t border-border pt-6">
        <h3 className="font-coder font-semibold text-sm mb-4">
          Product Features
        </h3>
        <div className="space-y-3">
          {product?.features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon
                name="Check"
                size={16}
                className="text-success mt-0.5 flex-shrink-0"
              />
              <span className="font-coder text-sm text-muted-foreground">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-monument font-bold text-lg">Size Guide</h2>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="p-1 hover:bg-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-coder font-semibold">
                          US Size
                        </th>
                        <th className="text-left py-2 font-coder font-semibold">
                          UK Size
                        </th>
                        <th className="text-left py-2 font-coder font-semibold">
                          EU Size
                        </th>
                        <th className="text-left py-2 font-coder font-semibold">
                          CM
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 font-coder">7</td>
                        <td className="py-2 font-coder">6.5</td>
                        <td className="py-2 font-coder">40</td>
                        <td className="py-2 font-coder">25</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-coder">8</td>
                        <td className="py-2 font-coder">7.5</td>
                        <td className="py-2 font-coder">41</td>
                        <td className="py-2 font-coder">25.5</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-coder">9</td>
                        <td className="py-2 font-coder">8.5</td>
                        <td className="py-2 font-coder">42</td>
                        <td className="py-2 font-coder">26</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-coder">10</td>
                        <td className="py-2 font-coder">9.5</td>
                        <td className="py-2 font-coder">43</td>
                        <td className="py-2 font-coder">27</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-coder">11</td>
                        <td className="py-2 font-coder">10.5</td>
                        <td className="py-2 font-coder">44</td>
                        <td className="py-2 font-coder">28</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-secondary p-4 rounded-md">
                  <h4 className="font-coder font-semibold text-sm mb-2">
                    How to measure:
                  </h4>
                  <p className="font-coder text-sm text-muted-foreground">
                    Place your foot on a piece of paper and mark the longest toe
                    and heel. Measure the distance between these points in
                    centimeters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
