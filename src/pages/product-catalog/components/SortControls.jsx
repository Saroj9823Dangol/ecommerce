import React from "react";
import Icon from "../../../components/AppIcon";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const SortControls = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFilterToggle,
  productCount = 0,
  totalProducts = 0,
}) => {
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "popularity", label: "Most Popular" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 font-coder">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Side - Results Count and Filter Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onFilterToggle}
            className="lg:hidden"
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>

          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">{productCount}</span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{totalProducts}</span>{" "}
            products
          </div>
        </div>

        {/* Right Side - Sort and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-coder font-medium text-foreground whitespace-nowrap">
              Sort by:
            </span>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              className="min-w-[180px]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-secondary rounded-md p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
            >
              <Icon name="Grid3X3" size={18} />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="List View"
            >
              <Icon name="List" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View Mode Toggle */}
      <div className="sm:hidden flex items-center justify-center mt-4">
        <div className="flex items-center bg-secondary rounded-md p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors duration-200 ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name="Grid3X3" size={18} />
            <span className="text-sm font-coder font-medium">Grid</span>
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors duration-200 ${
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name="List" size={18} />
            <span className="text-sm font-coder font-medium">List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;
