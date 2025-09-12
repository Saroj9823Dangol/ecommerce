import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const CartItem = ({
  item,
  onUpdateQuantity,
  onUpdateVariant,
  onRemove,
  onSaveForLater,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showVariantOptions, setShowVariantOptions] = useState(false);

  const sizeOptions = [
    { value: "US 7", label: "US 7" },
    { value: "US 7.5", label: "US 7.5" },
    { value: "US 8", label: "US 8" },
    { value: "US 8.5", label: "US 8.5" },
    { value: "US 9", label: "US 9" },
    { value: "US 9.5", label: "US 9.5" },
    { value: "US 10", label: "US 10" },
    { value: "US 10.5", label: "US 10.5" },
    { value: "US 11", label: "US 11" },
    { value: "US 11.5", label: "US 11.5" },
    { value: "US 12", label: "US 12" },
  ];

  const colorOptions = [
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Green", label: "Green" },
  ];

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.maxStock) return;

    setIsUpdating(true);
    try {
      await onUpdateQuantity(item?.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleVariantUpdate = async (field, value) => {
    setIsUpdating(true);
    try {
      await onUpdateVariant(item?.id, { ...item?.variant, [field]: value });
      setShowVariantOptions(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDeliveryDate = (days) => {
    const date = new Date();
    date?.setDate(date?.getDate() + days);
    return date?.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 font-coder">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-32 h-48 lg:h-32 bg-secondary rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {item?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item?.category}</p>
              {item?.isLimitedEdition && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground mt-1">
                  Limited Edition
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-foreground">
                ${item?.price}
              </p>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <p className="text-sm text-muted-foreground line-through">
                  ${item?.originalPrice}
                </p>
              )}
            </div>
          </div>

          {/* Variant Information */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Size:</span>
              <button
                onClick={() => setShowVariantOptions(!showVariantOptions)}
                className="font-medium text-foreground hover:text-accent transition-colors duration-200 underline"
              >
                {item?.variant?.size}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Color:</span>
              <button
                onClick={() => setShowVariantOptions(!showVariantOptions)}
                className="flex items-center gap-1 font-medium text-foreground hover:text-accent transition-colors duration-200 underline"
              >
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{
                    backgroundColor: item?.variant?.color?.toLowerCase(),
                  }}
                />
                {item?.variant?.color}
              </button>
            </div>
          </div>

          {/* Variant Options */}
          {showVariantOptions && (
            <div className="bg-secondary rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select
                  label="Size"
                  options={sizeOptions}
                  value={item?.variant?.size}
                  onChange={(value) => handleVariantUpdate("size", value)}
                  disabled={isUpdating}
                />
                <Select
                  label="Color"
                  options={colorOptions}
                  value={item?.variant?.color}
                  onChange={(value) => handleVariantUpdate("color", value)}
                  disabled={isUpdating}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVariantOptions(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isUpdating}
                  iconName="Minus"
                  className="rounded-r-none border-r border-border"
                />
                <span className="px-4 py-2 font-medium text-foreground min-w-[3rem] text-center">
                  {item?.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={item?.quantity >= item?.maxStock || isUpdating}
                  iconName="Plus"
                  className="rounded-l-none border-l border-border"
                />
              </div>

              <div className="text-xs text-muted-foreground">
                {item?.maxStock <= 5 && (
                  <span className="text-warning">
                    Only {item?.maxStock} left
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSaveForLater(item?.id)}
                iconName="Heart"
                iconPosition="left"
                disabled={isUpdating}
              >
                Save for Later
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item?.id)}
                iconName="Trash2"
                disabled={isUpdating}
                className="text-error hover:text-error"
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Truck" size={16} />
            <span>
              Estimated delivery:{" "}
              {formatDeliveryDate(item?.estimatedDeliveryDays)}
            </span>
            {item?.freeShipping && (
              <span className="text-success font-medium">Free Shipping</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
