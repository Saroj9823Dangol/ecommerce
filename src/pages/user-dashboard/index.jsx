import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import ProfileOverview from "./components/ProfileOverview";
import OrdersSection from "./components/OrdersSection";
import WishlistSection from "./components/WishlistSection";
import AddressesSection from "./components/AddressesSection";
import ProfileSettings from "./components/ProfileSettings";

const UserDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  // Extract active tab from URL
  React.useEffect(() => {
    const path = location?.pathname;
    if (path?.includes("/profile")) setActiveTab("profile");
    else if (path?.includes("/orders")) setActiveTab("orders");
    else if (path?.includes("/wishlist")) setActiveTab("wishlist");
    else if (path?.includes("/addresses")) setActiveTab("addresses");
    else setActiveTab("overview");
  }, [location?.pathname]);

  const sidebarItems = [
    {
      id: "overview",
      label: "Dashboard Overview",
      icon: "BarChart3",
      path: "/user-dashboard",
    },
    {
      id: "profile",
      label: "Profile Settings",
      icon: "User",
      path: "/user-dashboard/profile",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: "Package",
      path: "/user-dashboard/orders",
      badge: 3,
    },
    {
      id: "wishlist",
      label: "My Wishlist",
      icon: "Heart",
      path: "/user-dashboard/wishlist",
      badge: 5,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: "MapPin",
      path: "/user-dashboard/addresses",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "orders":
        return <OrdersSection />;
      case "wishlist":
        return <WishlistSection />;
      case "addresses":
        return <AddressesSection />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 lg:px-8 pt-[6rem]">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-monument font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600 font-coder">
            Manage your account, orders, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <nav className="space-y-1">
                {sidebarItems?.map((item) => (
                  <Link
                    key={item?.id}
                    to={item?.path}
                    onClick={() => setActiveTab(item?.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-coder font-medium transition-colors duration-200 ${
                      activeTab === item?.id
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </div>
                    {item?.badge && (
                      <span
                        className={`text-xs font-medium rounded-full px-2 py-1 ${
                          activeTab === item?.id
                            ? "bg-white text-primary"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item?.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Stats Card */}
            <div className="mt-6 bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-white">
              <h3 className="font-monument font-semibold text-lg mb-4">
                Member Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Total Orders</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Total Spent</span>
                  <span className="font-bold">$2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Member Since</span>
                  <span className="font-bold">2023</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs opacity-90">
                  🏆 Premium Member - Enjoy free shipping and exclusive deals!
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
