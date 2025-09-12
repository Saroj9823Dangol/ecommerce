import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const OrderConfirmation = ({ orderData }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery?.setDate(estimatedDelivery?.getDate() + 7);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-coder font-bold text-foreground mb-2">
          Order Confirmed!
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="bg-secondary rounded-lg p-4 inline-block">
          <p className="text-sm text-muted-foreground">Order Number</p>
          <p className="text-xl font-coder font-bold text-foreground">
            {orderData?.orderId}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-xl font-coder font-bold text-foreground mb-4">
              Order Details
            </h2>

            <div className="space-y-4">
              {orderData?.items?.map((item) => (
                <div key={item?.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 font-coder">
                    <h3 className="font-semibold text-foreground truncate">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item?.color} • Size {item?.size} • Qty: {item?.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-coder font-bold text-foreground">
                      ${(item?.price * item?.quantity)?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-coder font-medium text-foreground">
                  ${orderData?.summary?.subtotal?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-coder font-medium text-success">
                  {orderData?.summary?.shipping === 0
                    ? "Free"
                    : `$${orderData?.summary?.shipping?.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-coder font-medium text-foreground">
                  ${orderData?.summary?.tax?.toFixed(2)}
                </span>
              </div>

              {orderData?.summary?.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-coder font-medium text-success">
                    -${orderData?.summary?.discount?.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="font-coder font-bold text-lg text-foreground">
                    Total
                  </span>
                  <span className="font-coder font-bold text-lg text-foreground">
                    ${orderData?.summary?.total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-coder font-semibold text-foreground mb-4">
              Shipping Information
            </h3>

            <div className="space-y-3">
              <div>
                <p className="font-coder font-semibold text-foreground">
                  {orderData?.shipping?.address?.firstName}{" "}
                  {orderData?.shipping?.address?.lastName}
                </p>
                <p className="text-muted-foreground">
                  {orderData?.shipping?.address?.address}
                  {orderData?.shipping?.address?.apartment &&
                    `, ${orderData?.shipping?.address?.apartment}`}
                </p>
                <p className="text-muted-foreground">
                  {orderData?.shipping?.address?.city},{" "}
                  {orderData?.shipping?.address?.state}{" "}
                  {orderData?.shipping?.address?.zipCode}
                </p>
                <p className="text-muted-foreground">
                  {orderData?.shipping?.address?.phone}
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Icon name="Truck" size={16} className="text-success" />
                <span className="text-sm font-coder font-medium text-foreground">
                  Standard Delivery
                </span>
              </div>

              <div className="bg-secondary rounded-lg p-3">
                <p className="text-sm font-coder font-medium text-foreground">
                  Estimated Delivery
                </p>
                <p className="text-lg font-coder font-bold text-foreground">
                  {estimatedDelivery?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-coder font-semibold text-foreground mb-4">
              What's Next?
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-coder font-semibold text-foreground">
                    Order Confirmation Email
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email with your order details
                    shortly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground text-sm font-bold">
                    2
                  </span>
                </div>
                <div>
                  <p className="font-coder font-semibold text-foreground">
                    Processing & Packaging
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We'll prepare your items for shipment within 1-2 business
                    days.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground text-sm font-bold">
                    3
                  </span>
                </div>
                <div>
                  <p className="font-coder font-semibold text-foreground">
                    Shipping Notification
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll get tracking information once your order ships.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground text-sm font-bold">
                    4
                  </span>
                </div>
                <div>
                  <p className="font-coder font-semibold text-foreground">
                    Delivery
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your order will arrive at your doorstep within 5-7 business
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-coder font-semibold text-foreground mb-4">
              Manage Your Order
            </h3>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                iconName="Package"
                iconPosition="left"
                asChild
              >
                <Link to="/order-history">Track Your Order</Link>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                iconName="Download"
                iconPosition="left"
              >
                Download Receipt
              </Button>

              <Button
                variant="outline"
                className="w-full"
                iconName="Headphones"
                iconPosition="left"
              >
                Contact Support
              </Button>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="bg-secondary rounded-lg p-6 text-center">
            <h4 className="font-coder font-semibold text-foreground mb-2">
              Continue Shopping
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Discover more amazing products from our collection
            </p>
            <Button
              className="w-full"
              iconName="ArrowRight"
              iconPosition="right"
              asChild
            >
              <Link to="/product-catalog">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Support Information */}
      <div className="mt-8 bg-white rounded-lg border border-border p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="RotateCcw" size={24} className="text-white" />
            </div>
            <h4 className="font-coder font-semibold text-foreground mb-1">
              Easy Returns
            </h4>
            <p className="text-sm text-muted-foreground">
              30-day return policy for all items
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Headphones" size={24} className="text-white" />
            </div>
            <h4 className="font-coder font-semibold text-foreground mb-1">
              24/7 Support
            </h4>
            <p className="text-sm text-muted-foreground">
              Get help whenever you need it
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <h4 className="font-coder font-semibold text-foreground mb-1">
              Secure Payment
            </h4>
            <p className="text-sm text-muted-foreground">
              Your payment information is protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
