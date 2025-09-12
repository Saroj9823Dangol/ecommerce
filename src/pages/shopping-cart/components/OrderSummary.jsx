import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const OrderSummary = ({
  subtotal,
  tax,
  shipping,
  discount,
  total,
  onApplyPromoCode,
  onProceedToCheckout,
  isLoading,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);
    setPromoError("");
    setPromoSuccess("");

    try {
      const result = await onApplyPromoCode(promoCode);
      if (result?.success) {
        setPromoSuccess(`Promo code applied! You saved $${result?.discount}`);
        setPromoCode("");
      } else {
        setPromoError(result?.message || "Invalid promo code");
      }
    } catch (error) {
      setPromoError("Failed to apply promo code");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20 font-coder">
      <h2 className=" font-bold text-xl text-foreground mb-6">Order Summary</h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
              error={promoError}
              disabled={isApplyingPromo}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleApplyPromoCode}
            disabled={isApplyingPromo || !promoCode?.trim()}
            loading={isApplyingPromo}
          >
            Apply
          </Button>
        </div>

        {promoSuccess && (
          <div className="flex items-center gap-2 mt-2 text-sm text-success">
            <Icon name="CheckCircle" size={16} />
            <span>{promoSuccess}</span>
          </div>
        )}
      </div>
      {/* Order Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-success">
              -{formatCurrency(discount)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="font-medium text-foreground">
            {formatCurrency(tax)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Shipping</span>
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </div>
          <span className="font-medium text-foreground">
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>

        <hr className="border-border" />

        <div className="flex justify-between items-center">
          <span className=" font-bold text-lg text-foreground">Total</span>
          <span className=" font-bold text-xl text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
      {/* Shipping Information */}
      <div className="bg-secondary rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Icon
            name="Truck"
            size={20}
            className="text-muted-foreground mt-0.5"
          />
          <div>
            <h4 className="font-medium text-foreground mb-1">Free Shipping</h4>
            <p className="text-sm text-muted-foreground">
              On orders over $75. Estimated delivery in 3-5 business days.
            </p>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 mb-6 py-4 border-t border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="RefreshCw" size={16} />
          <span>Easy Returns</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          fullWidth
          onClick={onProceedToCheckout}
          disabled={isLoading}
          loading={isLoading}
          iconName="CreditCard"
          iconPosition="left"
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => (window.location.href = "/product-catalog")}
        >
          Continue Shopping
        </Button>
      </div>
      {/* Payment Methods */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-3">
          We accept
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-5 bg-secondary rounded border border-border flex items-center justify-center">
            <span className="text-xs font-bold">VISA</span>
          </div>
          <div className="w-8 h-5 bg-secondary rounded border border-border flex items-center justify-center">
            <span className="text-xs font-bold">MC</span>
          </div>
          <div className="w-8 h-5 bg-secondary rounded border border-border flex items-center justify-center">
            <span className="text-xs font-bold">AMEX</span>
          </div>
          <div className="w-8 h-5 bg-secondary rounded border border-border flex items-center justify-center">
            <Icon name="Smartphone" size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
