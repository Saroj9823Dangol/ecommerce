import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

import { Checkbox } from "../../../components/ui/Checkbox";

const FilterPanel = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const categories = [
    { value: "shoes", label: "Shoes" },
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
    { value: "equipment", label: "Equipment" },
  ];

  const sizes = [
    { value: "xs", label: "XS" },
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
    { value: "xxl", label: "XXL" },
  ];

  const colors = [
    { value: "black", label: "Black", color: "#000000" },
    { value: "white", label: "White", color: "#FFFFFF" },
    { value: "red", label: "Red", color: "#EF4444" },
    { value: "blue", label: "Blue", color: "#3B82F6" },
    { value: "green", label: "Green", color: "#22C55E" },
    { value: "gray", label: "Gray", color: "#6B7280" },
  ];

  const brands = [
    { value: "adidas", label: "Adidas", count: 245 },
    { value: "nike", label: "Nike", count: 189 },
    { value: "puma", label: "Puma", count: 156 },
    { value: "reebok", label: "Reebok", count: 98 },
  ];

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handleCategoryChange = (categoryValue, checked) => {
    const newCategories = checked
      ? [...selectedCategories, categoryValue]
      : selectedCategories?.filter((c) => c !== categoryValue);
    setSelectedCategories(newCategories);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleSizeChange = (sizeValue, checked) => {
    const newSizes = checked
      ? [...selectedSizes, sizeValue]
      : selectedSizes?.filter((s) => s !== sizeValue);
    setSelectedSizes(newSizes);
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleColorChange = (colorValue, checked) => {
    const newColors = checked
      ? [...selectedColors, colorValue]
      : selectedColors?.filter((c) => c !== colorValue);
    setSelectedColors(newColors);
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleBrandChange = (brandValue, checked) => {
    const newBrands = checked
      ? [...selectedBrands, brandValue]
      : selectedBrands?.filter((b) => b !== brandValue);
    setSelectedBrands(newBrands);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    onFiltersChange({
      priceRange: [0, 500],
      categories: [],
      sizes: [],
      colors: [],
      brands: [],
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between font-coder">
        <h3 className="font-monument font-semibold text-lg text-foreground">
          Filters
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="font-coder font-medium text-sm text-foreground">
          Category
        </h4>
        <div className="space-y-2">
          {categories?.map((category) => (
            <Checkbox
              key={category?.value}
              label={category?.label}
              checked={selectedCategories?.includes(category?.value)}
              onChange={(e) =>
                handleCategoryChange(category?.value, e?.target?.checked)
              }
            />
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-coder font-medium text-sm text-foreground">
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <label className="block text-xs text-muted-foreground mb-1">
                Min
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange?.[0]}
                onChange={(e) => handlePriceChange(0, e?.target?.value)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-coder font-medium">
                ${priceRange?.[0]}
              </span>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-muted-foreground mb-1">
                Max
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange?.[1]}
                onChange={(e) => handlePriceChange(1, e?.target?.value)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-coder font-medium">
                ${priceRange?.[1]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-3">
        <h4 className="font-coder font-medium text-sm text-foreground">Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes?.map((size) => (
            <button
              key={size?.value}
              onClick={() =>
                handleSizeChange(
                  size?.value,
                  !selectedSizes?.includes(size?.value)
                )
              }
              className={`px-3 py-2 text-sm font-coder font-medium rounded-md border transition-colors duration-200 ${
                selectedSizes?.includes(size?.value)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-secondary"
              }`}
            >
              {size?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-3">
        <h4 className="font-coder font-medium text-sm text-foreground">
          Color
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {colors?.map((color) => (
            <button
              key={color?.value}
              onClick={() =>
                handleColorChange(
                  color?.value,
                  !selectedColors?.includes(color?.value)
                )
              }
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColors?.includes(color?.value)
                  ? "border-primary scale-110"
                  : "border-border hover:scale-105"
              }`}
              style={{ backgroundColor: color?.color }}
              title={color?.label}
            >
              {selectedColors?.includes(color?.value) && (
                <Icon
                  name="Check"
                  size={16}
                  className={
                    color?.value === "white" ? "text-black" : "text-white"
                  }
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <h4 className="font-coder font-medium text-sm text-foreground">
          Brand
        </h4>
        <div className="space-y-2">
          {brands?.map((brand) => (
            <div
              key={brand?.value}
              className="flex items-center justify-between"
            >
              <Checkbox
                label={brand?.label}
                checked={selectedBrands?.includes(brand?.value)}
                onChange={(e) =>
                  handleBrandChange(brand?.value, e?.target?.checked)
                }
              />
              <span className="text-xs text-muted-foreground">
                ({brand?.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isOpen) {
    return (
      <>
        {/* Mobile Overlay */}
        <div
          className="lg:hidden bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />

        {/* Mobile Filter Panel */}
        <div className="lg:hidden h-full bg-card border-border z-50 overflow-y-auto">
          <div className="p-6">{filterContent}</div>
        </div>
      </>
    );
  }

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
        {filterContent}
      </div>
    </div>
  );
};

export default FilterPanel;
