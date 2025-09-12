import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProfileOverview = () => {
  const recentOrders = [
    {
      id: "ORD-2025-001",
      date: "2025-01-08",
      status: "Delivered",
      total: 299.99,
      items: 2,
      image: "/assets/images/no_image.png",
    },
    {
      id: "ORD-2025-002",
      date: "2025-01-05",
      status: "In Transit",
      total: 149.99,
      items: 1,
      image: "/assets/images/no_image.png",
    },
    {
      id: "ORD-2025-003",
      date: "2025-01-03",
      status: "Processing",
      total: 89.99,
      items: 1,
      image: "/assets/images/no_image.png",
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Ultraboost 22 Running Shoes",
      price: 180,
      image: "/assets/images/no_image.png",
      inStock: true,
    },
    {
      id: 2,
      name: "Stan Smith Classic",
      price: 100,
      image: "/assets/images/no_image.png",
      inStock: true,
    },
    {
      id: 3,
      name: "Gazelle Vintage Sneakers",
      price: 90,
      image: "/assets/images/no_image.png",
      inStock: false,
    },
  ];

  const quickStats = [
    {
      label: "Total Orders",
      value: "24",
      icon: "Package",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Wishlist Items",
      value: "5",
      icon: "Heart",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Saved Addresses",
      value: "3",
      icon: "MapPin",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Loyalty Points",
      value: "1,250",
      icon: "Star",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 font-coder">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl  font-bold text-gray-900 mb-2">
          Welcome back, John! 👋
        </h2>
        <p className="text-gray-600 font-coder">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {quickStats?.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-coder text-gray-500 mb-1">
                  {stat?.label}
                </p>
                <p className="text-2xl  font-bold text-gray-900">
                  {stat?.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}
              >
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg  font-semibold text-gray-900">
              Recent Orders
            </h3>
            <Button variant="outline" size="sm" asChild>
              <Link to="/user-dashboard/orders">View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentOrders?.map((order) => (
              <div
                key={order?.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-coder font-semibold text-sm text-gray-900">
                      #{order?.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order?.date)?.toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order?.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={order?.image}
                      alt="Order"
                      className="w-8 h-8 rounded object-cover bg-gray-100"
                      onError={(e) => {
                        e.target.src = "/assets/images/no_image.png";
                      }}
                    />
                    <span className="text-sm text-gray-600">
                      {order?.items} item{order?.items > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="font-coder font-semibold text-sm text-gray-900">
                    ${order?.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist Preview */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg  font-semibold text-gray-900">
              Wishlist Items
            </h3>
            <Button variant="outline" size="sm" asChild>
              <Link to="/user-dashboard/wishlist">View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {wishlistItems?.map((item) => (
              <div
                key={item?.id}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = "/assets/images/no_image.png";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-coder font-medium text-sm text-gray-900 truncate">
                      {item?.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className=" font-semibold text-sm text-gray-900">
                        ${item?.price}
                      </p>
                      <div className="flex items-center space-x-2">
                        {item?.inStock ? (
                          <span className="text-xs text-green-600 font-medium">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg  font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-auto p-4" asChild>
            <Link
              to="/product-catalog"
              className="flex flex-col items-center text-center"
            >
              <Icon name="Search" size={24} className="mb-2" />
              <span className="font-medium">Browse Products</span>
              <span className="text-xs opacity-75 mt-1">
                Discover new arrivals
              </span>
            </Link>
          </Button>

          <Button variant="outline" className="h-auto p-4" asChild>
            <Link
              to="/user-dashboard/orders"
              className="flex flex-col items-center text-center"
            >
              <Icon name="Package" size={24} className="mb-2" />
              <span className="font-medium">Track Orders</span>
              <span className="text-xs opacity-75 mt-1">View order status</span>
            </Link>
          </Button>

          <Button variant="outline" className="h-auto p-4" asChild>
            <Link
              to="/user-dashboard/profile"
              className="flex flex-col items-center text-center"
            >
              <Icon name="Settings" size={24} className="mb-2" />
              <span className="font-medium">Update Profile</span>
              <span className="text-xs opacity-75 mt-1">Manage your info</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
