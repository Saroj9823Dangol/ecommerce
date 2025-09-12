import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import CartActions from "./components/CartActions";
import RecommendedProducts from "./components/RecommendedProducts";
import Icon from "../../components/AppIcon";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Ultraboost 22",
      category: "Running Shoes",
      price: 180,
      originalPrice: 200,
      quantity: 2,
      maxStock: 8,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      variant: {
        size: "US 9",
        color: "Black",
      },
      estimatedDeliveryDays: 3,
      freeShipping: true,
      isLimitedEdition: false,
    },
    {
      id: 2,
      name: "Stan Smith",
      category: "Lifestyle",
      price: 100,
      originalPrice: null,
      quantity: 1,
      maxStock: 12,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      variant: {
        size: "US 10",
        color: "White",
      },
      estimatedDeliveryDays: 2,
      freeShipping: true,
      isLimitedEdition: false,
    },
    {
      id: 3,
      name: "Gazelle Limited Edition",
      category: "Originals",
      price: 120,
      originalPrice: 150,
      quantity: 1,
      maxStock: 3,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      variant: {
        size: "US 8.5",
        color: "Red",
      },
      estimatedDeliveryDays: 5,
      freeShipping: true,
      isLimitedEdition: true,
    },
  ];

  useEffect(() => {
    // Simulate loading cart data
    const loadCartData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCartItems(mockCartItems);
        calculateOrderSummary(mockCartItems);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartData();
  }, []);

  const calculateOrderSummary = (items) => {
    const subtotal = items?.reduce(
      (sum, item) => sum + item?.price * item?.quantity,
      0
    );
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal >= 75 ? 0 : 9.99; // Free shipping over $75
    let discount = 0; // Will be updated when promo codes are applied
    const total = subtotal + tax + shipping - discount;

    setOrderSummary({
      subtotal,
      tax,
      shipping,
      discount,
      total,
    });
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const updatedItems = cartItems?.map((item) =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateOrderSummary(updatedItems);
  };

  const handleUpdateVariant = async (itemId, newVariant) => {
    const updatedItems = cartItems?.map((item) =>
      item?.id === itemId ? { ...item, variant: newVariant } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = async (itemId) => {
    const updatedItems = cartItems?.filter((item) => item?.id !== itemId);
    setCartItems(updatedItems);
    calculateOrderSummary(updatedItems);
  };

  const handleSaveForLater = async (itemId) => {
    // Move item to wishlist and remove from cart
    const updatedItems = cartItems?.filter((item) => item?.id !== itemId);
    setCartItems(updatedItems);
    calculateOrderSummary(updatedItems);

    // Show success message (in real app, this would be a toast notification)
    console.log("Item saved for later");
  };

  const handleApplyPromoCode = async (promoCode) => {
    // Mock promo code validation
    const validPromoCodes = {
      SAVE10: { discount: 10, type: "percentage" },
      WELCOME20: { discount: 20, type: "fixed" },
      FREESHIP: { discount: 0, type: "shipping" },
    };

    if (validPromoCodes?.[promoCode]) {
      const promo = validPromoCodes?.[promoCode];
      let discount = 0;

      if (promo?.type === "percentage") {
        discount = orderSummary?.subtotal * (promo?.discount / 100);
      } else if (promo?.type === "fixed") {
        discount = promo?.discount;
      } else if (promo?.type === "shipping") {
        discount = orderSummary?.shipping;
      }

      const newTotal =
        orderSummary?.subtotal +
        orderSummary?.tax +
        orderSummary?.shipping -
        discount;

      setOrderSummary((prev) => ({
        ...prev,
        discount,
        total: newTotal,
      }));

      return { success: true, discount };
    }

    return { success: false, message: "Invalid promo code" };
  };

  const handleProceedToCheckout = () => {
    window.location.href = "/checkout-process";
  };

  const handleClearCart = async () => {
    setCartItems([]);
    setOrderSummary({
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
    });
  };

  const handleContinueShopping = () => {
    window.location.href = "/product-catalog";
  };

  const handleSaveCart = async () => {
    // Mock save cart functionality
    console.log("Cart saved");
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find(
      (item) =>
        item?.id === product?.id &&
        item?.variant?.size === product?.variant?.size &&
        item?.variant?.color === product?.variant?.color
    );

    if (existingItem) {
      handleUpdateQuantity(existingItem?.id, existingItem?.quantity + 1);
    } else {
      const newItem = {
        ...product,
        maxStock: 10,
        estimatedDeliveryDays: 3,
        freeShipping: true,
        isLimitedEdition: false,
      };
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      calculateOrderSummary(updatedItems);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading your cart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-coder">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link
            to="/home-dashboard"
            className="hover:text-foreground transition-colors duration-200"
          >
            Home
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Shopping Cart</span>
        </nav>

        {cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h1 className=" font-bold text-3xl text-foreground mb-2">
                  Shopping Cart
                </h1>
                <p className="text-muted-foreground">
                  Review your items and proceed to checkout
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>Secure Checkout</span>
              </div>
            </div>

            {/* Cart Actions */}
            <div className="mb-6">
              <CartActions
                itemCount={cartItems?.reduce(
                  (sum, item) => sum + item?.quantity,
                  0
                )}
                onClearCart={handleClearCart}
                onContinueShopping={handleContinueShopping}
                onSaveCart={handleSaveCart}
                onShareCart={handleSaveCart}
              />
            </div>

            {/* Main Cart Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems?.map((item) => (
                  <CartItem
                    key={`${item?.id}-${item?.variant?.size}-${item?.variant?.color}`}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onUpdateVariant={handleUpdateVariant}
                    onRemove={handleRemoveItem}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={orderSummary?.subtotal}
                  tax={orderSummary?.tax}
                  shipping={orderSummary?.shipping}
                  discount={orderSummary?.discount}
                  total={orderSummary?.total}
                  onApplyPromoCode={handleApplyPromoCode}
                  onProceedToCheckout={handleProceedToCheckout}
                  isLoading={false}
                />
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mt-12">
              <RecommendedProducts onAddToCart={handleAddToCart} />
            </div>

            {/* Trust Signals */}
            <div className="mt-12 bg-card border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="Truck" size={24} className="text-success" />
                  </div>
                  <h3 className=" font-semibold text-foreground mb-1">
                    Free Shipping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    On orders over $75
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="RefreshCw" size={24} className="text-success" />
                  </div>
                  <h3 className=" font-semibold text-foreground mb-1">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    30-day return policy
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                    <Icon name="Shield" size={24} className="text-success" />
                  </div>
                  <h3 className=" font-semibold text-foreground mb-1">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    SSL encrypted checkout
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ShoppingCart;
