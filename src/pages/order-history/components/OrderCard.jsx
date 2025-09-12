import React, { useState } from "react";

import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const OrderCard = ({
  order,
  onReorder,
  onViewDetails,
  onTrackOrder,
  onReturnRequest,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      month: "short",
      day: "numeric",
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 font-coder">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h3 className=" font-semibold text-lg text-gray-900">
                Order #{order?.orderNumber}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Placed on {formatDate(order?.orderDate)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  order?.status
                )}`}
              >
                {order?.status}
              </span>
              <span className=" font-bold text-lg text-gray-900">
                ${order?.total?.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? "Less" : "Details"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(order?.id)}
              iconName="Eye"
              iconPosition="left"
            >
              View
            </Button>
          </div>
        </div>

        {/* Product Thumbnails */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex -space-x-2">
            {order?.items?.slice(0, 4)?.map((item, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg border-2 border-white shadow-sm overflow-hidden bg-gray-50"
              >
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {order?.items?.length > 4 && (
              <div className="w-12 h-12 rounded-lg border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{order?.items?.length - 4}
                </span>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {order?.items?.length} item{order?.items?.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-6 bg-gray-50">
          {/* Items List */}
          <div className="space-y-4 mb-6">
            <h4 className=" font-semibold text-base text-gray-900">
              Order Items
            </h4>
            {order?.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-coder font-medium text-gray-900 truncate">
                    {item?.name}
                  </h5>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>Size: {item?.size}</span>
                    <span>Color: {item?.color}</span>
                    <span>Qty: {item?.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className=" font-semibold text-gray-900">
                    ${item?.price?.toFixed(2)}
                  </p>
                  {item?.quantity > 1 && (
                    <p className="text-xs text-gray-600">
                      ${(item?.price / item?.quantity)?.toFixed(2)} each
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className=" font-semibold text-sm text-gray-900 mb-3">
                Shipping Address
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
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

            {/* Payment & Tracking */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className=" font-semibold text-sm text-gray-900 mb-3">
                Order Information
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="text-gray-900">{order?.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">
                    ${order?.subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">
                    ${order?.shipping?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">
                    ${order?.tax?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between  font-semibold text-base pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">
                    ${order?.total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Information */}
          {order?.trackingNumber && (
            <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
              <h5 className=" font-semibold text-sm text-gray-900 mb-3">
                Tracking Information
              </h5>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Tracking Number:{" "}
                    <span className="font-mono font-medium text-gray-900">
                      {order?.trackingNumber}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Carrier: {order?.carrier}
                  </p>
                  {order?.estimatedDelivery && (
                    <p className="text-sm text-gray-600 mt-1">
                      Estimated Delivery: {formatDate(order?.estimatedDelivery)}
                    </p>
                  )}
                </div>
                {canTrack(order?.status) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTrackOrder(order?.trackingNumber)}
                    iconName="Truck"
                    iconPosition="left"
                  >
                    Track Package
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
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

            <Button
              variant="ghost"
              onClick={() => window.open(`/invoice/${order?.id}`, "_blank")}
              iconName="Download"
              iconPosition="left"
            >
              Download Invoice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
