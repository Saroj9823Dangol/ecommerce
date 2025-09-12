import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  viewMode,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  loading = false,
}) => {
  if (loading) {
    return (
      <div
        className={`${
          viewMode === "grid"
            ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [&>*]:break-inside-avoid"
            : "flex flex-col space-y-4"
        }`}
      >
        {Array.from({ length: 12 })?.map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-secondary rounded-lg overflow-hidden">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-muted-foreground">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
        <h3 className="font-monument font-semibold text-xl text-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any products matching your current filters. Try
          adjusting your search criteria or browse our categories.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => window.location?.reload()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            Reset Filters
          </button>
          <button
            onClick={() => (window.location.href = "/home-dashboard")}
            className="px-6 py-2 border border-border text-foreground rounded-md hover:bg-secondary transition-colors duration-200"
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        viewMode === "grid"
          ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [&>*]:break-inside-avoid"
          : "flex flex-col space-y-4"
      }`}
    >
      {products?.map((product) => (
        <div
          key={product?.id}
          className={viewMode === "grid" ? "mb-6" : "w-full"}
        >
          <ProductCard
            product={product}
            viewMode={viewMode}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onToggleCompare={onToggleCompare}
            onQuickView={onQuickView}
            className={viewMode === "list" ? "w-full" : ""}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
