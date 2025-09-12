import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      label: "Home",
      name: "John Doe",
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      label: "Work",
      name: "John Doe",
      street: "456 Business Ave",
      apartment: "Suite 100",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
    {
      id: 3,
      type: "other",
      label: "Parents House",
      name: "John Doe",
      street: "789 Family Lane",
      apartment: "",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "United States",
      phone: "+1 (555) 456-7890",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: "home",
    label: "",
    name: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev?.map((addr) =>
          addr?.id === editingAddress?.id
            ? { ...formData, id: editingAddress?.id }
            : formData?.isDefault
            ? { ...addr, isDefault: false }
            : addr
        )
      );
      setEditingAddress(null);
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now(),
      };

      setAddresses((prev) => {
        if (formData?.isDefault) {
          return [
            ...prev?.map((addr) => ({ ...addr, isDefault: false })),
            newAddress,
          ];
        }
        return [...prev, newAddress];
      });
    }

    // Reset form
    setFormData({
      type: "home",
      label: "",
      name: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
    setShowAddForm(false);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({ ...address });
    setShowAddForm(true);
  };

  const handleDelete = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev?.filter((addr) => addr?.id !== addressId));
    }
  };

  const handleSetDefault = (addressId) => {
    setAddresses((prev) =>
      prev?.map((addr) => ({
        ...addr,
        isDefault: addr?.id === addressId,
      }))
    );
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    setFormData({
      type: "home",
      label: "",
      name: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case "home":
        return "Home";
      case "work":
        return "Building2";
      default:
        return "MapPin";
    }
  };

  return (
    <div className="p-6 font-coder">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              My Addresses ({addresses?.length})
            </h2>
            <p className="text-gray-600 font-coder">
              Manage your saved addresses for faster checkout
            </p>
          </div>

          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)}>
              <Icon name="Plus" size={20} className="mr-2" />
              Add New Address
            </Button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-coder font-semibold mb-6">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Type & Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <select
                  value={formData?.type}
                  onChange={(e) => handleInputChange("type", e?.target?.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Label
                </label>
                <Input
                  type="text"
                  value={formData?.label}
                  onChange={(e) => handleInputChange("label", e?.target?.value)}
                  placeholder="e.g., Home, Office, etc."
                  required
                />
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange("name", e?.target?.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange("phone", e?.target?.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <Input
                type="text"
                value={formData?.street}
                onChange={(e) => handleInputChange("street", e?.target?.value)}
                placeholder="123 Main Street"
                required
              />
            </div>

            {/* Apartment/Suite */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apartment/Suite (Optional)
              </label>
              <Input
                type="text"
                value={formData?.apartment}
                onChange={(e) =>
                  handleInputChange("apartment", e?.target?.value)
                }
                placeholder="Apt 4B, Suite 100, etc."
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  type="text"
                  value={formData?.city}
                  onChange={(e) => handleInputChange("city", e?.target?.value)}
                  placeholder="New York"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <Input
                  type="text"
                  value={formData?.state}
                  onChange={(e) => handleInputChange("state", e?.target?.value)}
                  placeholder="NY"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <Input
                  type="text"
                  value={formData?.zipCode}
                  onChange={(e) =>
                    handleInputChange("zipCode", e?.target?.value)
                  }
                  placeholder="10001"
                  required
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={formData?.country}
                onChange={(e) => handleInputChange("country", e?.target?.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            {/* Set as Default */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="setDefault"
                checked={formData?.isDefault}
                onChange={(e) =>
                  handleInputChange("isDefault", e?.target?.checked)
                }
                className="rounded border-gray-300 text-primary focus:ring-primary mr-3"
              />
              <label htmlFor="setDefault" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {editingAddress ? "Update Address" : "Save Address"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses Grid */}
      {addresses?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {addresses?.map((address) => (
            <div
              key={address?.id}
              className="bg-white border border-gray-200 rounded-lg p-6 relative"
            >
              {/* Default Badge */}
              {address?.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Default
                  </span>
                </div>
              )}

              {/* Address Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name={getAddressTypeIcon(address?.type)}
                    size={20}
                    className="text-gray-600"
                  />
                </div>
                <div>
                  <h3 className="font-coder font-semibold text-gray-900">
                    {address?.label}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {address?.type} address
                  </p>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-2 mb-6">
                <p className="font-coder font-medium text-gray-900">
                  {address?.name}
                </p>
                <p className="text-gray-600">{address?.street}</p>
                {address?.apartment && (
                  <p className="text-gray-600">{address?.apartment}</p>
                )}
                <p className="text-gray-600">
                  {address?.city}, {address?.state} {address?.zipCode}
                </p>
                <p className="text-gray-600">{address?.country}</p>
                <p className="text-gray-600">{address?.phone}</p>
              </div>

              {/* Address Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Edit
                  </button>

                  {!address?.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address?.id)}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(address?.id)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                  disabled={address?.isDefault}
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="MapPin" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-coder font-semibold text-gray-900 mb-2">
            No addresses saved
          </h3>
          <p className="text-gray-600 font-coder mb-6">
            Add your addresses for faster and easier checkout.
          </p>
          <Button size="lg" onClick={() => setShowAddForm(true)}>
            <Icon name="Plus" size={20} className="mr-2" />
            Add Your First Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressesSection;
