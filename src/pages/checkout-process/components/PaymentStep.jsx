import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const PaymentStep = ({ onNext, onBack, paymentData, setPaymentData }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentData?.method || "card"
  );
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    saveCard: false,
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [errors, setErrors] = useState({});

  const savedCards = [
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiry: "12/25",
      name: "John Doe",
    },
    {
      id: "2",
      type: "mastercard",
      last4: "8888",
      expiry: "08/26",
      name: "John Doe",
    },
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "CreditCard" },
    { id: "paypal", name: "PayPal", icon: "Wallet" },
    { id: "apple", name: "Apple Pay", icon: "Smartphone" },
    { id: "google", name: "Google Pay", icon: "Smartphone" },
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ];

  const stateOptions = [
    { value: "NY", label: "New York" },
    { value: "CA", label: "California" },
    { value: "TX", label: "Texas" },
    { value: "FL", label: "Florida" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (selectedPaymentMethod === "card") {
      if (!cardData?.number?.trim())
        newErrors.cardNumber = "Card number is required";
      if (!cardData?.expiry?.trim())
        newErrors.expiry = "Expiry date is required";
      if (!cardData?.cvv?.trim()) newErrors.cvv = "CVV is required";
      if (!cardData?.name?.trim())
        newErrors.cardName = "Cardholder name is required";

      if (!billingAddress?.sameAsShipping) {
        if (!billingAddress?.address?.trim())
          newErrors.billingAddress = "Billing address is required";
        if (!billingAddress?.city?.trim())
          newErrors.billingCity = "City is required";
        if (!billingAddress?.state)
          newErrors.billingState = "State is required";
        if (!billingAddress?.zipCode?.trim())
          newErrors.billingZip = "ZIP code is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setPaymentData({
        method: selectedPaymentMethod,
        cardData: selectedPaymentMethod === "card" ? cardData : null,
        billingAddress,
      });
      onNext();
    }
  };

  const handleCardDataChange = (field, value) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBillingAddressChange = (field, value) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, "")?.replace(/[^0-9]/gi, "");
    const matches = v?.match(/\d{4,16}/g);
    const match = (matches && matches?.[0]) || "";
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\s+/g, "")?.replace(/[^0-9]/gi, "");
    if (v?.length >= 2) {
      return v?.substring(0, 2) + "/" + v?.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-xl font-monument font-bold text-foreground mb-6">
              Payment Method
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-monument font-semibold text-foreground">
                  Choose Payment Method
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {paymentMethods?.map((method) => (
                    <label
                      key={method?.id}
                      className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPaymentMethod === method?.id
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method?.id}
                        checked={selectedPaymentMethod === method?.id}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e?.target?.value)
                        }
                        className="sr-only"
                      />
                      <Icon name={method?.icon} size={24} className="mb-2" />
                      <span className="text-sm font-coder font-medium text-center">
                        {method?.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Credit Card Form */}
              {selectedPaymentMethod === "card" && (
                <div className="space-y-6">
                  {/* Saved Cards */}
                  {savedCards?.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-monument font-semibold text-foreground">
                        Saved Cards
                      </h4>

                      {savedCards?.map((card) => (
                        <label
                          key={card?.id}
                          className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors duration-200"
                        >
                          <input
                            type="radio"
                            name="savedCard"
                            value={card?.id}
                            className="w-4 h-4 text-primary border-border focus:ring-primary mr-3"
                          />
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                              <Icon
                                name="CreditCard"
                                size={16}
                                className="text-muted-foreground"
                              />
                            </div>
                            <div>
                              <p className="font-coder font-medium text-foreground">
                                •••• •••• •••• {card?.last4}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires {card?.expiry} • {card?.name}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}

                      <div className="text-center">
                        <Button
                          type="button"
                          variant="outline"
                          iconName="Plus"
                          iconPosition="left"
                        >
                          Add New Card
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* New Card Form */}
                  <div className="space-y-4">
                    <h4 className="font-monument font-semibold text-foreground">
                      {savedCards?.length > 0
                        ? "Or Add New Card"
                        : "Card Information"}
                    </h4>

                    <Input
                      label="Card Number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData?.number}
                      onChange={(e) =>
                        handleCardDataChange(
                          "number",
                          formatCardNumber(e?.target?.value)
                        )
                      }
                      error={errors?.cardNumber}
                      maxLength={19}
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        type="text"
                        placeholder="MM/YY"
                        value={cardData?.expiry}
                        onChange={(e) =>
                          handleCardDataChange(
                            "expiry",
                            formatExpiry(e?.target?.value)
                          )
                        }
                        error={errors?.expiry}
                        maxLength={5}
                        required
                      />
                      <Input
                        label="CVV"
                        type="text"
                        placeholder="123"
                        value={cardData?.cvv}
                        onChange={(e) =>
                          handleCardDataChange(
                            "cvv",
                            e?.target?.value?.replace(/\D/g, "")
                          )
                        }
                        error={errors?.cvv}
                        maxLength={4}
                        required
                      />
                    </div>

                    <Input
                      label="Cardholder Name"
                      type="text"
                      placeholder="Enter name on card"
                      value={cardData?.name}
                      onChange={(e) =>
                        handleCardDataChange("name", e?.target?.value)
                      }
                      error={errors?.cardName}
                      required
                    />

                    <Checkbox
                      label="Save this card for future purchases"
                      checked={cardData?.saveCard}
                      onChange={(e) =>
                        handleCardDataChange("saveCard", e?.target?.checked)
                      }
                    />
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h4 className="font-monument font-semibold text-foreground">
                      Billing Address
                    </h4>

                    <Checkbox
                      label="Same as shipping address"
                      checked={billingAddress?.sameAsShipping}
                      onChange={(e) =>
                        handleBillingAddressChange(
                          "sameAsShipping",
                          e?.target?.checked
                        )
                      }
                    />

                    {!billingAddress?.sameAsShipping && (
                      <div className="space-y-4">
                        <Input
                          label="Street Address"
                          type="text"
                          placeholder="Enter billing address"
                          value={billingAddress?.address}
                          onChange={(e) =>
                            handleBillingAddressChange(
                              "address",
                              e?.target?.value
                            )
                          }
                          error={errors?.billingAddress}
                          required
                        />

                        <div className="grid md:grid-cols-3 gap-4">
                          <Input
                            label="City"
                            type="text"
                            placeholder="Enter city"
                            value={billingAddress?.city}
                            onChange={(e) =>
                              handleBillingAddressChange(
                                "city",
                                e?.target?.value
                              )
                            }
                            error={errors?.billingCity}
                            required
                          />
                          <Select
                            label="State"
                            options={stateOptions}
                            value={billingAddress?.state}
                            onChange={(value) =>
                              handleBillingAddressChange("state", value)
                            }
                            error={errors?.billingState}
                            placeholder="Select state"
                            required
                          />
                          <Input
                            label="ZIP Code"
                            type="text"
                            placeholder="Enter ZIP code"
                            value={billingAddress?.zipCode}
                            onChange={(e) =>
                              handleBillingAddressChange(
                                "zipCode",
                                e?.target?.value
                              )
                            }
                            error={errors?.billingZip}
                            required
                          />
                        </div>

                        <Select
                          label="Country"
                          options={countryOptions}
                          value={billingAddress?.country}
                          onChange={(value) =>
                            handleBillingAddressChange("country", value)
                          }
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Digital Wallet Options */}
              {selectedPaymentMethod !== "card" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name={
                        paymentMethods?.find(
                          (m) => m?.id === selectedPaymentMethod
                        )?.icon || "Wallet"
                      }
                      size={32}
                      className="text-muted-foreground"
                    />
                  </div>
                  <h3 className="text-lg font-monument font-semibold text-foreground mb-2">
                    {
                      paymentMethods?.find(
                        (m) => m?.id === selectedPaymentMethod
                      )?.name
                    }
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You'll be redirected to complete your payment securely.
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Shipping
                </Button>
                <Button
                  type="submit"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Review Order
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Security & Trust Badges */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-monument font-semibold text-foreground mb-4">
              Secure Payment
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-coder font-medium text-foreground">
                    SSL Encrypted
                  </p>
                  <p className="text-sm text-muted-foreground">
                    256-bit security
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Lock" size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-coder font-medium text-foreground">
                    PCI Compliant
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Secure processing
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-coder font-medium text-foreground">
                    Money Back
                  </p>
                  <p className="text-sm text-muted-foreground">
                    30-day guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Accepted Cards */}
          <div className="bg-secondary rounded-lg p-4">
            <h4 className="font-coder font-medium text-foreground mb-3">
              We Accept
            </h4>
            <div className="flex items-center space-x-2">
              {["CreditCard", "Wallet", "Smartphone"]?.map((icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-white rounded border border-border flex items-center justify-center"
                >
                  <Icon
                    name={icon}
                    size={16}
                    className="text-muted-foreground"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
