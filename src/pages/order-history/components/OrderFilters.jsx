import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const OrderFilters = ({ onFilterChange, onSearchChange, totalOrders }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const statusFilters = [
    { key: "all", label: "All Orders", count: totalOrders },
    { key: "delivered", label: "Delivered", count: 12 },
    { key: "shipped", label: "Shipped", count: 3 },
    { key: "processing", label: "Processing", count: 2 },
    { key: "cancelled", label: "Cancelled", count: 1 },
    { key: "returned", label: "Returned", count: 1 },
  ];

  const dateRangeOptions = [
    { key: "all", label: "All Time" },
    { key: "30days", label: "Last 30 Days" },
    { key: "90days", label: "Last 3 Months" },
    { key: "6months", label: "Last 6 Months" },
    { key: "1year", label: "Last Year" },
  ];

  const handleStatusFilter = (status) => {
    setActiveFilter(status);
    onFilterChange({ status, dateRange });
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    onFilterChange({ status: activeFilter, dateRange: range });
  };

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const clearAllFilters = () => {
    setActiveFilter("all");
    setDateRange("all");
    setSearchQuery("");
    onFilterChange({ status: "all", dateRange: "all" });
    onSearchChange("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm font-coder">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by order number, product name, or tracking number..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm font-coder placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
            {(activeFilter !== "all" || dateRange !== "all" || searchQuery) && (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Status Filter Tabs */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {statusFilters?.map((filter) => (
            <button
              key={filter?.key}
              onClick={() => handleStatusFilter(filter?.key)}
              className={`px-4 py-2 rounded-lg text-sm font-coder font-medium transition-all duration-200 ${
                activeFilter === filter?.key
                  ? "bg-black text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter?.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter?.key
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {filter?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e?.target?.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-coder focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {dateRangeOptions?.map((option) => (
                  <option key={option?.key} value={option?.key}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Amount
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-coder focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option value="all">All Amounts</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200+">$200+</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-coder focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show Per Page
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-coder focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option value="10">10 Orders</option>
                <option value="25">25 Orders</option>
                <option value="50">50 Orders</option>
                <option value="100">100 Orders</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {(activeFilter !== "all" || dateRange !== "all") && (
        <div className="px-6 py-3 bg-blue-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Icon name="Filter" size={16} />
              <span>Active filters:</span>
              {activeFilter !== "all" && (
                <span className="px-2 py-1 bg-blue-100 rounded-md font-medium">
                  Status:{" "}
                  {statusFilters?.find((f) => f?.key === activeFilter)?.label}
                </span>
              )}
              {dateRange !== "all" && (
                <span className="px-2 py-1 bg-blue-100 rounded-md font-medium">
                  {dateRangeOptions?.find((d) => d?.key === dateRange)?.label}
                </span>
              )}
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;
