import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Image from "../../../components/AppImage";

const ReviewStep = ({
  onBack,
  onComplete,
  shippingData,
  paymentData,
  orderSummary,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const validPromoCodes = ["SAVE20", "WELCOME10", "STUDENT15"];

  const handlePromoSubmit = (e) => {
    e?.preventDefault();
    if (validPromoCodes?.includes(promoCode?.toUpperCase())) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete({
        orderId: "ADI-" + Date.now(),
        items: mockOrderItems,
        shipping: shippingData,
        payment: paymentData,
        summary: {
          subtotal,
          shipping,
          tax,
          discount,
          total,
        },
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-coder">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-xl  font-bold text-foreground mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {mockOrderItems?.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                >
                  <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-coder font-semibold text-foreground truncate">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item?.color} • Size {item?.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item?.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className=" font-bold text-foreground">
                      ${(item?.price * item?.quantity)?.toFixed(2)}
                    </p>
                    {item?.quantity > 1 && (
                      <p className="text-sm text-muted-foreground">
                        ${item?.price?.toFixed(2)} each
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg  font-semibold text-foreground">
                Shipping Address
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>

            <div className="bg-secondary rounded-lg p-4">
              <p className="font-coder font-semibold text-foreground">
                {shippingData?.address?.firstName}{" "}
                {shippingData?.address?.lastName}
              </p>
              <p className="text-muted-foreground">
                {shippingData?.address?.address}
                {shippingData?.address?.apartment &&
                  `, ${shippingData?.address?.apartment}`}
              </p>
              <p className="text-muted-foreground">
                {shippingData?.address?.city}, {shippingData?.address?.state}{" "}
                {shippingData?.address?.zipCode}
              </p>
              <p className="text-muted-foreground">
                {shippingData?.address?.phone}
              </p>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <Icon name="Truck" size={16} className="text-success" />
              <span className="text-sm font-coder font-medium text-foreground">
                Standard Delivery (5-7 business days)
              </span>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg  font-semibold text-foreground">
                Payment Method
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>

            <div className="bg-secondary rounded-lg p-4">
              {paymentData?.method === "card" ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded border border-border flex items-center justify-center">
                    <Icon
                      name="CreditCard"
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                  <div>
                    <p className="font-coder font-semibold text-foreground">
                      •••• •••• ••••{" "}
                      {paymentData?.cardData?.number?.slice(-4) || "1234"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {paymentData?.cardData?.name || "John Doe"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded border border-border flex items-center justify-center">
                    <Icon
                      name="Wallet"
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                  <div>
                    <p className="font-coder font-semibold text-foreground">
                      {paymentData?.method === "paypal"
                        ? "PayPal"
                        : paymentData?.method === "apple"
                        ? "Apple Pay"
                        : "Google Pay"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      john.doe@email.com
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Total & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg  font-semibold text-foreground mb-4">
              Order Total
            </h3>

            <div className="space-y-3">
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

              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className=" font-bold text-lg text-foreground">
                    Total
                  </span>
                  <span className=" font-bold text-lg text-foreground">
                    ${total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            {!promoApplied && (
              <form onSubmit={handlePromoSubmit} className="mt-6">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e?.target?.value)}
                    error={promoError}
                    className="flex-1"
                  />
                  <Button type="submit" variant="outline" size="default">
                    Apply
                  </Button>
                </div>
              </form>
            )}

            {promoApplied && (
              <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="CheckCircle"
                      size={16}
                      className="text-success"
                    />
                    <span className="text-sm font-coder font-medium text-success">
                      Promo code applied
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setPromoApplied(false);
                      setPromoCode("");
                    }}
                    className="text-success hover:text-success/80"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            )}

            <Button
              onClick={handlePlaceOrder}
              loading={isProcessing}
              disabled={isProcessing}
              className="w-full mt-6"
              size="lg"
            >
              {isProcessing ? "Processing Order..." : "Place Order"}
            </Button>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={onBack}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back
              </Button>
            </div>
          </div>

          {/* Security & Guarantee */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-coder font-medium text-foreground">
                  Secure 256-bit SSL encryption
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={16} className="text-success" />
                <span className="text-sm font-coder font-medium text-foreground">
                  30-day return policy
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={16} className="text-success" />
                <span className="text-sm font-coder font-medium text-foreground">
                  24/7 customer support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
