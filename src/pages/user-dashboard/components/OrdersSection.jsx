import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const OrdersSection = () => {
  const [orders] = useState([
    {
      id: "ORD-2025-001",
      orderNumber: "ADI2025001",
      date: "2025-01-08",
      status: "delivered",
      total: 299.99,
      items: [
        {
          id: 1,
          name: "Ultraboost 22 Running Shoes",
          price: 180,
          quantity: 1,
          size: "US 9",
          color: "Core Black",
          image: "/assets/images/no_image.png",
        },
        {
          id: 2,
          name: "Running Shorts",
          price: 45,
          quantity: 1,
          size: "M",
          color: "Black",
          image: "/assets/images/no_image.png",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2025-01-10",
      actualDelivery: "2025-01-09",
    },
    {
      id: "ORD-2025-002",
      orderNumber: "ADI2025002",
      date: "2025-01-05",
      status: "shipped",
      total: 149.99,
      items: [
        {
          id: 3,
          name: "Stan Smith Classic",
          price: 100,
          quantity: 1,
          size: "US 10",
          color: "Cloud White",
          image: "/assets/images/no_image.png",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2025-01-12",
    },
    {
      id: "ORD-2025-003",
      orderNumber: "ADI2025003",
      date: "2025-01-03",
      status: "processing",
      total: 89.99,
      items: [
        {
          id: 4,
          name: "Gazelle Vintage Sneakers",
          price: 90,
          quantity: 1,
          size: "US 8.5",
          color: "Noble Green",
          image: "/assets/images/no_image.png",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        street: "456 Oak Ave",
        city: "Brooklyn",
        state: "NY",
        zip: "11201",
      },
      estimatedDelivery: "2025-01-15",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          color: "bg-green-100 text-green-800",
          icon: "CheckCircle",
          label: "Delivered",
        };
      case "shipped":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: "Truck",
          label: "Shipped",
        };
      case "processing":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: "Clock",
          label: "Processing",
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800",
          icon: "XCircle",
          label: "Cancelled",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: "Package",
          label: "Unknown",
        };
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders?.filter((order) => order?.status === filterStatus);

  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    const statusInfo = getStatusInfo(order?.status);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-coder">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-coder font-semibold">Order Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-coder font-semibold">{order?.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-coder">
                  {new Date(order?.date)?.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo?.color}`}
                >
                  {statusInfo?.label}
                </span>
                <Icon
                  name={statusInfo?.icon}
                  size={18}
                  className="text-gray-500"
                />
              </div>
            </div>

            {/* Tracking Info */}
            {order?.trackingNumber && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Tracking</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-coder font-medium mb-1">
                    Tracking Number: {order?.trackingNumber}
                  </p>
                  {order?.estimatedDelivery && (
                    <p className="text-sm text-gray-600">
                      Est. Delivery:{" "}
                      {new Date(order?.estimatedDelivery)?.toLocaleDateString()}
                    </p>
                  )}
                  {order?.actualDelivery && (
                    <p className="text-sm text-green-600 font-medium">
                      Delivered:{" "}
                      {new Date(order?.actualDelivery)?.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Items */}
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Items ({order?.items?.length})
              </p>
              <div className="space-y-3">
                {order?.items?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4"
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "/assets/images/no_image.png";
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-coder font-medium">{item?.name}</h4>
                      <p className="text-sm text-gray-600">
                        Size: {item?.size} • Color: {item?.color}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item?.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-coder font-semibold">${item?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-coder font-medium">
                  {order?.shippingAddress?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {order?.shippingAddress?.street}
                </p>
                <p className="text-sm text-gray-600">
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.state} {order?.shippingAddress?.zip}
                </p>
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-coder font-semibold">Total</span>
                <span className="font-coder font-bold text-lg">
                  ${order?.total}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="border-t p-6">
            <div className="flex justify-end space-x-4">
              {order?.trackingNumber && (
                <Button variant="outline" size="sm">
                  Track Package
                </Button>
              )}
              <Button size="sm">Reorder Items</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-coder font-bold text-gray-900 mb-2">
          My Orders ({orders?.length})
        </h2>
        <p className="text-gray-600 font-coder">Track and manage your orders</p>
      </div>

      {/* Filter */}
      <div className="mb-6 font-coder">
        <div className="flex flex-wrap gap-2">
          {["all", "processing", "shipped", "delivered", "cancelled"]?.map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filterStatus === status
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "All Orders" : status}
                {status !== "all" && (
                  <span className="ml-2 text-xs">
                    (
                    {
                      orders?.filter((order) => order?.status === status)
                        ?.length
                    }
                    )
                  </span>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders?.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders?.map((order) => {
            const statusInfo = getStatusInfo(order?.status);

            return (
              <div
                key={order?.id}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6 font-coder"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-coder font-semibold text-lg">
                        #{order?.orderNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo?.color}`}
                      >
                        {statusInfo?.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ordered on {new Date(order?.date)?.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-coder font-bold text-xl">
                      ${order?.total}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order?.items?.length} item(s)
                    </p>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {order?.items?.slice(0, 6)?.map((item) => (
                      <div
                        key={item?.id}
                        className="flex items-center space-x-3 bg-white rounded-lg p-3"
                      >
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.target.src = "/assets/images/no_image.png";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium  lines-clamp-2 h-[calc(1.2em*2)] leading-[1.2]">
                            {item?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Size: {item?.size}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order?.items?.length > 6 && (
                    <p className="text-sm text-gray-600 mt-2">
                      +{order?.items?.length - 6} more item(s)
                    </p>
                  )}
                </div>

                {/* Order Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-300 space-y-3 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" onClick={() => setSelectedOrder(order)}>
                      View Details
                    </Button>

                    {order?.trackingNumber && (
                      <Button size="sm">
                        <Icon name="Truck" size={16} className="mr-2" />
                        Track Order
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {order?.status === "delivered" && (
                      <Button size="sm">
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Reorder
                      </Button>
                    )}

                    {order?.status === "processing" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Icon name="X" size={16} className="mr-2" />
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Package" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-coder font-semibold text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600 font-coder mb-6">
            {filterStatus === "all"
              ? "You haven't placed any orders yet."
              : `No orders with status"${filterStatus}".`}
          </p>
          <Button size="lg" asChild>
            <Link to="/product-catalog">
              <Icon name="Search" size={20} className="mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrdersSection;
