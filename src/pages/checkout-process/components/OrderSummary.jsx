import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const OrderSummary = ({ isCollapsed, onToggle, className = "" }) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const mockOrderItems = [
    {
      id: 1,
      name: "Ultraboost 22 Running Shoes",
      color: "Core Black",
      size: "US 9",
      price: 180,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Stan Smith Sneakers",
      color: "Cloud White",
      size: "US 10",
      price: 100,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Gazelle Vintage Shoes",
      color: "Wonder Beige",
      size: "US 8.5",
      price: 90,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
    },
  ];

  const subtotal = mockOrderItems?.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoApplied ? 20 : 0; // $20 discount
  const total = subtotal + shipping + tax - discount;

  const handlePromoSubmit = (e) => {
    e?.preventDefault();
    if (promoCode?.toUpperCase() === "SAVE20") {
      setPromoApplied(true);
    }
  };

  if (isCollapsed) {
    return (
      <div
        className={`bg-white border border-border rounded-lg font-coder ${className}`}
      >
        <button
          onClick={onToggle}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <Icon
              name="ShoppingBag"
              size={20}
              className="text-muted-foreground"
            />
            <span className=" font-semibold text-foreground">
              Order Summary
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className=" font-bold text-foreground">
              ${total?.toFixed(2)}
            </span>
            <Icon
              name="ChevronDown"
              size={16}
              className="text-muted-foreground"
            />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border border-border rounded-lg font-coder ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-lg  font-semibold text-foreground">
            Order Summary
          </h3>
          <Icon
            name="ChevronUp"
            size={16}
            className="text-muted-foreground lg:hidden"
          />
        </button>
      </div>
      {/* Items */}
      <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
        {mockOrderItems?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
              {item?.quantity > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {item?.quantity}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-coder font-medium text-sm text-foreground truncate">
                {item?.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {item?.color} • Size {item?.size}
              </p>
            </div>
            <div className="text-right">
              <p className="font-coder font-semibold text-sm text-foreground">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Promo Code */}
      {!promoApplied && (
        <div className="p-4 border-t border-border">
          <form onSubmit={handlePromoSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value)}
              className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-coder font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Apply
            </button>
          </form>
        </div>
      )}
      {promoApplied && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between p-2 bg-success/10 border border-success/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-sm font-coder font-medium text-success">
                SAVE20 applied
              </span>
            </div>
            <button
              onClick={() => {
                setPromoApplied(false);
                setPromoCode("");
              }}
              className="text-success hover:text-success/80"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      )}
      {/* Totals */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-coder font-medium text-foreground">
            ${subtotal?.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-coder font-medium text-success">
            {shipping === 0 ? "Free" : `$${shipping?.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-coder font-medium text-foreground">
            ${tax?.toFixed(2)}
          </span>
        </div>

        {promoApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-coder font-medium text-success">
              -${discount?.toFixed(2)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-2">
          <div className="flex justify-between">
            <span className=" font-bold text-foreground">Total</span>
            <span className=" font-bold text-foreground">
              ${total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
