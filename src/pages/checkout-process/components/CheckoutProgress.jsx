import React from "react";
import Icon from "../../../components/AppIcon";

const CheckoutProgress = ({ currentStep, completedSteps, onStepClick }) => {
  const steps = [
    { id: 1, title: "Shipping", icon: "Truck" },
    { id: 2, title: "Payment", icon: "CreditCard" },
    { id: 3, title: "Review", icon: "CheckCircle" },
  ];

  return (
    <div className="bg-white border-b border-border p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <React.Fragment key={step?.id}>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    completedSteps?.includes(step?.id) && onStepClick(step?.id)
                  }
                  disabled={
                    !completedSteps?.includes(step?.id) &&
                    step?.id !== currentStep
                  }
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    completedSteps?.includes(step?.id)
                      ? "bg-success border-success text-white cursor-pointer hover:bg-success/90"
                      : step?.id === currentStep
                      ? "bg-primary border-primary text-white"
                      : "bg-muted border-border text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {completedSteps?.includes(step?.id) ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </button>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-monument font-medium ${
                      step?.id === currentStep ||
                      completedSteps?.includes(step?.id)
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step?.title}
                  </p>
                </div>
              </div>
              {index < steps?.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    completedSteps?.includes(step?.id)
                      ? "bg-success"
                      : "bg-border"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Step Title */}
        <div className="sm:hidden mt-4 text-center">
          <p className="text-lg font-monument font-semibold text-foreground">
            {steps?.find((step) => step?.id === currentStep)?.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;
