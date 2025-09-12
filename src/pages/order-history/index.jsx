import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import OrderCard from "./components/OrderCard";
import OrderFilters from "./components/OrderFilters";
import OrderDetailsModal from "./components/OrderDetailsModal";
import EmptyOrderState from "./components/EmptyOrderState";
import OrderPagination from "./components/OrderPagination";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: "all", dateRange: "all" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 5;

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD-2024-001",
      orderNumber: "2024-001",
      orderDate: "2024-01-15T10:30:00Z",
      status: "Delivered",
      total: 299.97,
      subtotal: 279.97,
      shipping: 10.0,
      tax: 10.0,
      paymentMethod: "Visa ending in 4242",
      trackingNumber: "FDX123456789",
      carrier: "FedEx",
      estimatedDelivery: "2024-01-20T18:00:00Z",
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      items: [
        {
          name: "Ultraboost 22 Running Shoes",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          price: 180.0,
          quantity: 1,
          size: "US 9",
          color: "Core Black",
        },
        {
          name: "Essentials 3-Stripes Hoodie",
          image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
          price: 65.0,
          quantity: 1,
          size: "M",
          color: "Black",
        },
        {
          name: "Trefoil Logo Cap",
          image:
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
          price: 34.97,
          quantity: 1,
          size: "One Size",
          color: "Black",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      orderNumber: "2024-002",
      orderDate: "2024-01-10T14:20:00Z",
      status: "Shipped",
      total: 159.99,
      subtotal: 149.99,
      shipping: 0.0,
      tax: 10.0,
      paymentMethod: "Mastercard ending in 8888",
      trackingNumber: "UPS987654321",
      carrier: "UPS",
      estimatedDelivery: "2024-01-25T17:00:00Z",
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      items: [
        {
          name: "Stan Smith Sneakers",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
          price: 100.0,
          quantity: 1,
          size: "US 10",
          color: "White/Green",
        },
        {
          name: "Adicolor Classics Firebird Track Jacket",
          image:
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
          price: 49.99,
          quantity: 1,
          size: "L",
          color: "Navy",
        },
      ],
    },
    {
      id: "ORD-2024-003",
      orderNumber: "2024-003",
      orderDate: "2024-01-05T09:15:00Z",
      status: "Processing",
      total: 89.99,
      subtotal: 79.99,
      shipping: 5.0,
      tax: 5.0,
      paymentMethod: "PayPal",
      trackingNumber: null,
      carrier: null,
      estimatedDelivery: null,
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      items: [
        {
          name: "Gazelle Vintage Sneakers",
          image:
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
          price: 79.99,
          quantity: 1,
          size: "US 8.5",
          color: "Grey/White",
        },
      ],
    },
    {
      id: "ORD-2023-045",
      orderNumber: "2023-045",
      orderDate: "2023-12-20T16:45:00Z",
      status: "Delivered",
      total: 249.98,
      subtotal: 229.98,
      shipping: 10.0,
      tax: 10.0,
      paymentMethod: "Visa ending in 1234",
      trackingNumber: "DHL456789123",
      carrier: "DHL",
      estimatedDelivery: "2023-12-25T12:00:00Z",
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      items: [
        {
          name: "NMD_R1 Shoes",
          image:
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
          price: 130.0,
          quantity: 1,
          size: "US 9.5",
          color: "Core Black",
        },
        {
          name: "Adicolor Classics SST Track Pants",
          image:
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
          price: 99.98,
          quantity: 1,
          size: "M",
          color: "Black",
        },
      ],
    },
    {
      id: "ORD-2023-044",
      orderNumber: "2023-044",
      orderDate: "2023-12-15T11:30:00Z",
      status: "Returned",
      total: 120.0,
      subtotal: 110.0,
      shipping: 5.0,
      tax: 5.0,
      paymentMethod: "Apple Pay",
      trackingNumber: "RET789123456",
      carrier: "FedEx",
      estimatedDelivery: null,
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
      items: [
        {
          name: "Superstar Shoes",
          image:
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
          price: 110.0,
          quantity: 1,
          size: "US 11",
          color: "White/Black",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate API call
    const loadOrders = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    };

    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    // Apply status filter
    if (filters?.status !== "all") {
      filtered = filtered?.filter(
        (order) =>
          order?.status?.toLowerCase() === filters?.status?.toLowerCase()
      );
    }

    // Apply date range filter
    if (filters?.dateRange !== "all") {
      const now = new Date();
      let cutoffDate;

      switch (filters?.dateRange) {
        case "30days":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "90days":
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "6months":
          cutoffDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          break;
        case "1year":
          cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = null;
      }

      if (cutoffDate) {
        filtered = filtered?.filter(
          (order) => new Date(order.orderDate) >= cutoffDate
        );
      }
    }

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(
        (order) =>
          order?.orderNumber?.toLowerCase()?.includes(query) ||
          order?.trackingNumber?.toLowerCase()?.includes(query) ||
          order?.items?.some((item) =>
            item?.name?.toLowerCase()?.includes(query)
          )
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, filters, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (orderId) => {
    const order = orders?.find((o) => o?.id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleReorder = (orderId) => {
    const order = orders?.find((o) => o?.id === orderId);
    if (order) {
      // Add items to cart and redirect
      console.log("Reordering items from order:", orderId);
      window.location.href = "/shopping-cart?reorder=" + orderId;
    }
  };

  const handleTrackOrder = (trackingNumber) => {
    if (trackingNumber) {
      window.open(
        `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingNumber}`,
        "_blank"
      );
    }
  };

  const handleReturnRequest = (orderId) => {
    console.log("Initiating return request for order:", orderId);
    // In a real app, this would open a return request form
    alert("Return request feature would be implemented here");
  };

  const clearAllFilters = () => {
    setFilters({ status: "all", dateRange: "all" });
    setSearchQuery("");
  };

  const hasActiveFilters =
    filters?.status !== "all" ||
    filters?.dateRange !== "all" ||
    searchQuery?.trim();

  // Pagination
  const totalPages = Math.ceil(filteredOrders?.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-[6rem]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 font-coder pt-[6rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="font-monument font-bold text-3xl text-gray-900">
                  Order History
                </h1>
                <p className="text-gray-600 mt-2">
                  Track and manage your orders, returns, and deliveries
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link to="/product-catalog">
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/home-dashboard">
                    <Icon name="Home" size={18} className="mr-2" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <OrderFilters
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              totalOrders={orders?.length}
            />
          </div>

          {/* Orders List */}
          {filteredOrders?.length === 0 ? (
            <EmptyOrderState
              hasFilters={hasActiveFilters}
              onClearFilters={clearAllFilters}
            />
          ) : (
            <>
              {/* Results Summary */}
              <div className="mb-6">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Showing {filteredOrders?.length} of {orders?.length}{" "}
                      orders
                      {hasActiveFilters && (
                        <span className="ml-2 text-blue-600">(filtered)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Clock" size={16} />
                      <span>
                        Last updated: {new Date()?.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="space-y-6 mb-8">
                {currentOrders?.map((order) => (
                  <OrderCard
                    key={order?.id}
                    order={order}
                    onReorder={handleReorder}
                    onViewDetails={handleViewDetails}
                    onTrackOrder={handleTrackOrder}
                    onReturnRequest={handleReturnRequest}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <OrderPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalOrders={filteredOrders?.length}
                  ordersPerPage={ordersPerPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {/* Order Details Modal */}
          <OrderDetailsModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReorder={handleReorder}
            onTrackOrder={handleTrackOrder}
            onReturnRequest={handleReturnRequest}
          />
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
