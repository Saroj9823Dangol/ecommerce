import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import CheckoutProgress from "./components/CheckoutProgress";
import ShippingStep from "./components/ShippingStep";
import PaymentStep from "./components/PaymentStep";
import ReviewStep from "./components/ReviewStep";
import OrderSummary from "./components/OrderSummary";
import OrderConfirmation from "./components/OrderConfirmation";

const CheckoutProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isOrderSummaryCollapsed, setIsOrderSummaryCollapsed] = useState(true);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const [shippingData, setShippingData] = useState({
    selectedAddressId: "",
    address: null,
    deliveryOption: "standard",
  });

  const [paymentData, setPaymentData] = useState({
    method: "",
    cardData: null,
    billingAddress: {
      sameAsShipping: true,
    },
  });

  // Handle responsive behavior for order summary
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOrderSummaryCollapsed(false);
      } else {
        setIsOrderSummaryCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStepComplete = (stepNumber) => {
    if (!completedSteps?.includes(stepNumber)) {
      setCompletedSteps((prev) => [...prev, stepNumber]);
    }
    setCurrentStep(stepNumber + 1);
  };

  const handleStepClick = (stepNumber) => {
    if (completedSteps?.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleShippingNext = () => {
    handleStepComplete(1);
  };

  const handlePaymentNext = () => {
    handleStepComplete(2);
  };

  const handlePaymentBack = () => {
    setCurrentStep(2);
  };

  const handleReviewBack = () => {
    setCurrentStep(2);
  };

  const handleOrderComplete = (orderInfo) => {
    setOrderData(orderInfo);
    setOrderCompleted(true);
    setCompletedSteps([1, 2, 3]);
  };

  if (orderCompleted && orderData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <OrderConfirmation orderData={orderData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Progress Indicator */}
      <CheckoutProgress
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      <div className="relative">
        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden sticky top-16 z-10 p-4 bg-background border-b border-border">
          <OrderSummary
            isCollapsed={isOrderSummaryCollapsed}
            onToggle={() =>
              setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)
            }
          />
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 lg:pr-8">
            {currentStep === 1 && (
              <ShippingStep
                onNext={handleShippingNext}
                shippingData={shippingData}
                setShippingData={setShippingData}
              />
            )}

            {currentStep === 2 && (
              <PaymentStep
                onNext={handlePaymentNext}
                onBack={handlePaymentBack}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
              />
            )}

            {currentStep === 3 && (
              <ReviewStep
                onBack={handleReviewBack}
                onComplete={handleOrderComplete}
                shippingData={shippingData}
                paymentData={paymentData}
                orderSummary={
                  <OrderSummary isCollapsed={false} onToggle={() => {}} />
                }
              />
            )}
          </div>

          {/* Desktop Order Summary Sidebar */}
          <div className="hidden lg:block w-96 sticky top-16 h-fit">
            <div className="p-6">
              <OrderSummary isCollapsed={false} onToggle={() => {}} />
            </div>
          </div>
        </div>

        {/* Mobile Order Summary Expanded */}
        {!isOrderSummaryCollapsed && (
          <div className="lg:hidden fixed inset-0 top-16 bg-background z-20 overflow-y-auto">
            <div className="p-4">
              <OrderSummary
                isCollapsed={false}
                onToggle={() => setIsOrderSummaryCollapsed(true)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Guest Checkout Banner */}
      {currentStep === 1 && (
        <div className="bg-secondary border-t border-border">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <p className="font-coder font-medium text-foreground">
                    Shopping as a guest?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Create an account to track orders and save addresses
                  </p>
                </div>
              </div>
              <button className="text-primary font-coder font-medium text-sm hover:underline">
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutProcess;
