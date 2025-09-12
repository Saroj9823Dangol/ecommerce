import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const ShippingStep = ({ onNext, shippingData, setShippingData }) => {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    shippingData?.selectedAddressId || ""
  );
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [errors, setErrors] = useState({});

  const savedAddresses = [
    {
      id: "1",
      name: "Home Address",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      phone: "+1 (555) 123-4567",
      email: "john.doe@email.com",
    },
    {
      id: "2",
      name: "Work Address",
      firstName: "John",
      lastName: "Doe",
      address: "456 Business Ave",
      apartment: "Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "US",
      phone: "+1 (555) 987-6543",
      email: "john.doe@email.com",
    },
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

    if (showNewAddressForm) {
      if (!newAddress?.firstName?.trim())
        newErrors.firstName = "First name is required";
      if (!newAddress?.lastName?.trim())
        newErrors.lastName = "Last name is required";
      if (!newAddress?.email?.trim()) newErrors.email = "Email is required";
      if (!newAddress?.phone?.trim())
        newErrors.phone = "Phone number is required";
      if (!newAddress?.address?.trim())
        newErrors.address = "Address is required";
      if (!newAddress?.city?.trim()) newErrors.city = "City is required";
      if (!newAddress?.state) newErrors.state = "State is required";
      if (!newAddress?.zipCode?.trim())
        newErrors.zipCode = "ZIP code is required";
    } else if (!selectedAddress) {
      newErrors.address = "Please select a shipping address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const addressData = showNewAddressForm
        ? { ...newAddress, id: "new" }
        : savedAddresses?.find((addr) => addr?.id === selectedAddress);

      setShippingData({
        ...shippingData,
        selectedAddressId: addressData?.id,
        address: addressData,
      });
      onNext();
    }
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-xl font-monument font-bold text-foreground mb-6">
              Shipping Address
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Selection */}
              {!showNewAddressForm && (
                <div className="space-y-4">
                  <h3 className="text-lg font-monument font-semibold text-foreground">
                    Choose Shipping Address
                  </h3>

                  {savedAddresses?.map((address) => (
                    <label
                      key={address?.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAddress === address?.id
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="address"
                          value={address?.id}
                          checked={selectedAddress === address?.id}
                          onChange={(e) => setSelectedAddress(e?.target?.value)}
                          className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-coder font-semibold text-foreground">
                              {address?.name}
                            </h4>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              Saved
                            </span>
                          </div>
                          <p className="text-sm text-foreground mt-1">
                            {address?.firstName} {address?.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address?.address}
                            {address?.apartment && `, ${address?.apartment}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address?.city}, {address?.state} {address?.zipCode}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address?.phone}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}

                  {errors?.address && (
                    <p className="text-sm text-error">{errors?.address}</p>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewAddressForm(true)}
                    iconName="Plus"
                    iconPosition="left"
                    className="w-full"
                  >
                    Add New Address
                  </Button>
                </div>
              )}

              {/* New Address Form */}
              {showNewAddressForm && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-monument font-semibold text-foreground">
                      Add New Address
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowNewAddressForm(false)}
                      iconName="X"
                      iconPosition="left"
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="Enter first name"
                      value={newAddress?.firstName}
                      onChange={(e) =>
                        handleNewAddressChange("firstName", e?.target?.value)
                      }
                      error={errors?.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Enter last name"
                      value={newAddress?.lastName}
                      onChange={(e) =>
                        handleNewAddressChange("lastName", e?.target?.value)
                      }
                      error={errors?.lastName}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter email address"
                      value={newAddress?.email}
                      onChange={(e) =>
                        handleNewAddressChange("email", e?.target?.value)
                      }
                      error={errors?.email}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter phone number"
                      value={newAddress?.phone}
                      onChange={(e) =>
                        handleNewAddressChange("phone", e?.target?.value)
                      }
                      error={errors?.phone}
                      required
                    />
                  </div>

                  <Input
                    label="Street Address"
                    type="text"
                    placeholder="Enter street address"
                    value={newAddress?.address}
                    onChange={(e) =>
                      handleNewAddressChange("address", e?.target?.value)
                    }
                    error={errors?.address}
                    required
                  />

                  <Input
                    label="Apartment, suite, etc. (optional)"
                    type="text"
                    placeholder="Apartment, suite, etc."
                    value={newAddress?.apartment}
                    onChange={(e) =>
                      handleNewAddressChange("apartment", e?.target?.value)
                    }
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      type="text"
                      placeholder="Enter city"
                      value={newAddress?.city}
                      onChange={(e) =>
                        handleNewAddressChange("city", e?.target?.value)
                      }
                      error={errors?.city}
                      required
                    />
                    <Select
                      label="State"
                      options={stateOptions}
                      value={newAddress?.state}
                      onChange={(value) =>
                        handleNewAddressChange("state", value)
                      }
                      error={errors?.state}
                      placeholder="Select state"
                      required
                    />
                    <Input
                      label="ZIP Code"
                      type="text"
                      placeholder="Enter ZIP code"
                      value={newAddress?.zipCode}
                      onChange={(e) =>
                        handleNewAddressChange("zipCode", e?.target?.value)
                      }
                      error={errors?.zipCode}
                      required
                    />
                  </div>

                  <Select
                    label="Country"
                    options={countryOptions}
                    value={newAddress?.country}
                    onChange={(value) =>
                      handleNewAddressChange("country", value)
                    }
                    required
                  />

                  <Checkbox
                    label="Save this address for future orders"
                    checked
                    onChange={() => {}}
                  />
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history?.back()}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Cart
                </Button>
                <Button
                  type="submit"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Continue to Payment
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-monument font-semibold text-foreground mb-4">
              Delivery Options
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    defaultChecked
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div>
                    <p className="font-coder font-medium text-foreground">
                      Standard Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      5-7 business days
                    </p>
                  </div>
                </div>
                <span className="font-coder font-semibold text-foreground">
                  Free
                </span>
              </label>

              <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div>
                    <p className="font-coder font-medium text-foreground">
                      Express Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2-3 business days
                    </p>
                  </div>
                </div>
                <span className="font-coder font-semibold text-foreground">
                  $9.99
                </span>
              </label>

              <label className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="overnight"
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div>
                    <p className="font-coder font-medium text-foreground">
                      Overnight Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Next business day
                    </p>
                  </div>
                </div>
                <span className="font-coder font-semibold text-foreground">
                  $24.99
                </span>
              </label>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <div>
                <p className="font-coder font-medium text-foreground">
                  Secure Checkout
                </p>
                <p className="text-sm text-muted-foreground">
                  SSL encrypted & protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingStep;
