import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const OrderDetailsModal = ({
  order,
  isOpen,
  onClose,
  onReorder,
  onTrackOrder,
  onReturnRequest,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "returned":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canReturn = (status, orderDate) => {
    const daysSinceOrder = Math.floor(
      (new Date() - new Date(orderDate)) / (1000 * 60 * 60 * 24)
    );
    return status?.toLowerCase() === "delivered" && daysSinceOrder <= 30;
  };

  const canTrack = (status) => {
    return ["processing", "shipped"]?.includes(status?.toLowerCase());
  };

  const mockTrackingHistory = [
    {
      status: "Order Placed",
      date: order?.orderDate,
      location: "Online",
      description:
        "Your order has been confirmed and is being prepared for shipment.",
    },
    {
      status: "Processing",
      date: new Date(
        new Date(order.orderDate).getTime() + 24 * 60 * 60 * 1000
      )?.toISOString(),
      location: "Warehouse - Portland, OR",
      description: "Your items are being picked and packed for shipment.",
    },
    {
      status: "Shipped",
      date: new Date(
        new Date(order.orderDate).getTime() + 48 * 60 * 60 * 1000
      )?.toISOString(),
      location: "FedEx Facility - Portland, OR",
      description: "Your package has been shipped and is on its way.",
    },
    {
      status: "In Transit",
      date: new Date(
        new Date(order.orderDate).getTime() + 72 * 60 * 60 * 1000
      )?.toISOString(),
      location: "FedEx Facility - Denver, CO",
      description: "Package is in transit to the destination facility.",
    },
  ];

  const tabs = [
    { key: "details", label: "Order Details", icon: "Package" },
    { key: "tracking", label: "Tracking", icon: "Truck" },
    { key: "billing", label: "Billing", icon: "CreditCard" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-coder">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className=" font-bold text-xl text-gray-900">
              Order #{order?.orderNumber}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                order?.status
              )}`}
            >
              {order?.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.key}
                onClick={() => setActiveTab(tab?.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab?.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className=" font-semibold text-sm text-gray-900 mb-2">
                    Order Date
                  </h3>
                  <p className="text-gray-700">
                    {formatDate(order?.orderDate)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className=" font-semibold text-sm text-gray-900 mb-2">
                    Total Amount
                  </h3>
                  <p className=" font-bold text-lg text-gray-900">
                    ${order?.total?.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className=" font-semibold text-sm text-gray-900 mb-2">
                    Payment Method
                  </h3>
                  <p className="text-gray-700">{order?.paymentMethod}</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className=" font-semibold text-lg text-gray-900 mb-4">
                  Items Ordered ({order?.items?.length})
                </h3>
                <div className="space-y-4">
                  {order?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-coder font-medium text-gray-900 mb-1">
                          {item?.name}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>Size: {item?.size}</span>
                          <span>Color: {item?.color}</span>
                          <span>Quantity: {item?.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className=" font-semibold text-gray-900">
                          ${item?.price?.toFixed(2)}
                        </p>
                        {item?.quantity > 1 && (
                          <p className="text-sm text-gray-600">
                            ${(item?.price / item?.quantity)?.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className=" font-semibold text-base text-gray-900 mb-3">
                    Shipping Address
                  </h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-medium text-gray-900">
                      {order?.shippingAddress?.name}
                    </p>
                    <p>{order?.shippingAddress?.street}</p>
                    <p>
                      {order?.shippingAddress?.city},{" "}
                      {order?.shippingAddress?.state}{" "}
                      {order?.shippingAddress?.zipCode}
                    </p>
                    <p>{order?.shippingAddress?.country}</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className=" font-semibold text-base text-gray-900 mb-3">
                    Billing Address
                  </h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-medium text-gray-900">
                      {order?.billingAddress?.name ||
                        order?.shippingAddress?.name}
                    </p>
                    <p>
                      {order?.billingAddress?.street ||
                        order?.shippingAddress?.street}
                    </p>
                    <p>
                      {order?.billingAddress?.city ||
                        order?.shippingAddress?.city}
                      ,{" "}
                      {order?.billingAddress?.state ||
                        order?.shippingAddress?.state}{" "}
                      {order?.billingAddress?.zipCode ||
                        order?.shippingAddress?.zipCode}
                    </p>
                    <p>
                      {order?.billingAddress?.country ||
                        order?.shippingAddress?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tracking" && (
            <div className="space-y-6">
              {order?.trackingNumber ? (
                <>
                  {/* Tracking Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Truck" size={20} className="text-blue-600" />
                      <h3 className=" font-semibold text-lg text-blue-900">
                        Package Tracking
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700 font-medium">
                          Tracking Number:
                        </span>
                        <p className="font-mono text-blue-900 mt-1">
                          {order?.trackingNumber}
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-700 font-medium">
                          Carrier:
                        </span>
                        <p className="text-blue-900 mt-1">{order?.carrier}</p>
                      </div>
                      {order?.estimatedDelivery && (
                        <div className="md:col-span-2">
                          <span className="text-blue-700 font-medium">
                            Estimated Delivery:
                          </span>
                          <p className="text-blue-900 mt-1">
                            {formatDate(order?.estimatedDelivery)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tracking History */}
                  <div>
                    <h3 className=" font-semibold text-lg text-gray-900 mb-4">
                      Tracking History
                    </h3>
                    <div className="space-y-4">
                      {mockTrackingHistory?.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0 ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                            {index < mockTrackingHistory?.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-coder font-medium text-gray-900">
                                {event?.status}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {formatDate(event?.date)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {event?.location}
                            </p>
                            <p className="text-sm text-gray-700">
                              {event?.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="Package"
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <h3 className=" font-semibold text-lg text-gray-900 mb-2">
                    No Tracking Information
                  </h3>
                  <p className="text-gray-600">
                    Tracking information will be available once your order
                    ships.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className=" font-semibold text-lg text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">
                      ${order?.subtotal?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900">
                      ${order?.shipping?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-900">
                      ${order?.tax?.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className=" font-semibold text-base text-gray-900">
                        Total:
                      </span>
                      <span className=" font-bold text-lg text-gray-900">
                        ${order?.total?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className=" font-semibold text-lg text-gray-900 mb-4">
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">
                      Payment Method:
                    </span>
                    <p className="font-medium text-gray-900 mt-1">
                      {order?.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Transaction ID:
                    </span>
                    <p className="font-mono text-gray-900 mt-1">
                      TXN-{order?.orderNumber}-2024
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Payment Status:
                    </span>
                    <p className="font-medium text-green-600 mt-1">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => onReorder(order?.id)}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reorder Items
            </Button>

            {canReturn(order?.status, order?.orderDate) && (
              <Button
                variant="outline"
                onClick={() => onReturnRequest(order?.id)}
                iconName="Undo"
                iconPosition="left"
              >
                Return/Exchange
              </Button>
            )}

            {canTrack(order?.status) && order?.trackingNumber && (
              <Button
                variant="outline"
                onClick={() => onTrackOrder(order?.trackingNumber)}
                iconName="Truck"
                iconPosition="left"
              >
                Track Package
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => window.open(`/invoice/${order?.id}`, "_blank")}
              iconName="Download"
              iconPosition="left"
            >
              Download Invoice
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
