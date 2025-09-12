import React from "react";

import Button from "../../../components/ui/Button";

const OrderPagination = ({
  currentPage,
  totalPages,
  totalOrders,
  ordersPerPage,
  onPageChange,
}) => {
  const startOrder = (currentPage - 1) * ordersPerPage + 1;
  const endOrder = Math.min(currentPage * ordersPerPage, totalOrders);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, "...");
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 font-coder">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium text-gray-900">{startOrder}</span> to{" "}
          <span className="font-medium text-gray-900">{endOrder}</span> of{" "}
          <span className="font-medium text-gray-900">{totalOrders}</span>{" "}
          orders
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {getVisiblePages()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden px-3 py-2 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>

        {/* Quick Jump */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span className="text-gray-600">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e?.target?.value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <span className="text-gray-600">of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPagination;
