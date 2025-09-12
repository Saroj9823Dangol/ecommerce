import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const EmptyOrderState = ({ hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={32} className="text-gray-400" />
          </div>
          <h3 className="font-monument font-semibold text-xl text-gray-900 mb-3">
            No Orders Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any orders matching your current filters. Try
            adjusting your search criteria or clearing the filters to see all
            orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
            <Button variant="default" asChild>
              <Link to="/product-catalog">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12">
      <div className="text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Package" size={40} className="text-gray-400" />
        </div>
        <h3 className="font-monument font-semibold text-2xl text-gray-900 mb-4">
          No Orders Yet
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          You haven't placed any orders yet. Start shopping to see your order
          history here. Discover our latest collection of premium athletic wear
          and footwear.
        </p>

        <div className="space-y-4">
          <Button variant="default" size="lg" asChild>
            <Link to="/product-catalog" className="inline-flex items-center">
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Start Shopping
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/home-dashboard">View Featured Products</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/product-catalog?category=bestsellers">
                Browse Best Sellers
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="font-monument font-semibold text-sm text-gray-900 mb-4">
            Popular Categories
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/product-catalog?category=shoes"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Shoes
            </Link>
            <Link
              to="/product-catalog?category=clothing"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Clothing
            </Link>
            <Link
              to="/product-catalog?category=accessories"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Accessories
            </Link>
            <Link
              to="/product-catalog?category=sale"
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
            >
              Sale Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrderState;
