import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const CartActions = ({
  itemCount,
  onClearCart,
  onContinueShopping,
  onSaveCart,
  onShareCart,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await onClearCart();
      setShowClearConfirm(false);
    } finally {
      setIsClearing(false);
    }
  };

  const handleSaveCart = async () => {
    setIsSaving(true);
    try {
      await onSaveCart();
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareCart = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Adidas Cart",
        text: `Check out my cart with ${itemCount} items!`,
        url: window.location?.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard?.writeText(window.location?.href);
      onShareCart?.();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 font-coder">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Cart Info */}
        <div className="flex items-center gap-3">
          <Icon
            name="ShoppingCart"
            size={20}
            className="text-muted-foreground"
          />
          <span className="font-coder text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveCart}
            loading={isSaving}
            iconName="Bookmark"
            iconPosition="left"
          >
            Save Cart
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShareCart}
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onContinueShopping}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Continue Shopping
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowClearConfirm(true)}
            iconName="Trash2"
            className="text-error hover:text-error"
          >
            Clear Cart
          </Button>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className=" font-semibold text-foreground">Clear Cart</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Are you sure you want to remove all {itemCount} items from your
              cart? This will permanently delete all selected products.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowClearConfirm(false)}
                disabled={isClearing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={handleClearCart}
                loading={isClearing}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartActions;
