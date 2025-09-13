import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Ultraboost 22 Running Shoes",
      price: 180,
      originalPrice: 200,
      image: "/assets/images/no_image.png",
      inStock: true,
      rating: 4.8,
      reviews: 1247,
      category: "Running",
      color: "Core Black",
      sizes: ["7", "8", "9", "10", "11"],
      addedDate: "2025-01-08",
    },
    {
      id: 2,
      name: "Stan Smith Classic White",
      price: 100,
      originalPrice: null,
      image: "/assets/images/no_image.png",
      inStock: true,
      rating: 4.7,
      reviews: 892,
      category: "Lifestyle",
      color: "Cloud White",
      sizes: ["6", "7", "8", "9", "10"],
      addedDate: "2025-01-07",
    },
    {
      id: 3,
      name: "Gazelle Vintage Sneakers",
      price: 90,
      originalPrice: 110,
      image: "/assets/images/no_image.png",
      inStock: false,
      rating: 4.6,
      reviews: 634,
      category: "Originals",
      color: "Noble Green",
      sizes: [],
      addedDate: "2025-01-05",
    },
    {
      id: 4,
      name: "NMD_R1 Primeknit",
      price: 140,
      originalPrice: 160,
      image: "/assets/images/no_image.png",
      inStock: true,
      rating: 4.5,
      reviews: 523,
      category: "Lifestyle",
      color: "Core Black",
      sizes: ["7", "8", "9", "10"],
      addedDate: "2025-01-03",
    },
    {
      id: 5,
      name: "Superstar Bold Platform",
      price: 120,
      originalPrice: null,
      image: "/assets/images/no_image.png",
      inStock: true,
      rating: 4.4,
      reviews: 789,
      category: "Originals",
      color: "Cloud White",
      sizes: ["6", "7", "8", "9"],
      addedDate: "2025-01-01",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems((items) => items?.filter((item) => item?.id !== itemId));
    setSelectedItems((selected) => selected?.filter((id) => id !== itemId));
  };

  const handleSelectAll = () => {
    if (selectedItems?.length === wishlistItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems?.map((item) => item?.id));
    }
  };

  const handleMoveToCart = (itemId) => {
    // Logic to move item to cart
    console.log("Moving to cart:", itemId);
    handleRemoveFromWishlist(itemId);
  };

  const handleBulkRemove = () => {
    setWishlistItems((items) =>
      items?.filter((item) => !selectedItems?.includes(item?.id))
    );
    setSelectedItems([]);
  };

  const sortedAndFilteredItems = () => {
    let filtered = wishlistItems;

    if (filterBy !== "all") {
      filtered = wishlistItems?.filter((item) => {
        if (filterBy === "instock") return item?.inStock;
        if (filterBy === "outstock") return !item?.inStock;
        if (filterBy === "sale") return item?.originalPrice;
        return true;
      });
    }

    return filtered?.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b?.addedDate) - new Date(a?.addedDate);
        case "oldest":
          return new Date(a?.addedDate) - new Date(b?.addedDate);
        case "price-low":
          return a?.price - b?.price;
        case "price-high":
          return b?.price - a?.price;
        case "name":
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={12}
          className="text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="Star"
          size={12}
          className="text-yellow-400 fill-current opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={12}
          className="text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <div className="p-6 font-coder">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          My Wishlist ({wishlistItems?.length} items)
        </h2>
        <p className="text-gray-600 font-coder">
          Save items you love and never lose track of them
        </p>
      </div>
      {wishlistItems?.length > 0 ? (
        <>
          {/* Controls */}
          <div className="mb-6 space-y-4 font-coder">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Sort & Filter */}
              <div className="flex items-center space-x-4">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e?.target?.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Items</option>
                  <option value="instock">In Stock</option>
                  <option value="outstock">Out of Stock</option>
                  <option value="sale">On Sale</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedAndFilteredItems()?.map((item) => (
              <div
                key={item?.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <label className="flex items-center cursor-pointer"></label>
                </div>

                <div className="relative h-48 bg-gray-100">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/no_image.png";
                    }}
                  />
                  {item?.originalPrice && (
                    <div className="absolute top-3 left-12 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Sale
                    </div>
                  )}
                  {!item?.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {item?.category}
                    </span>
                  </div>

                  <h3 className="font-coder font-semibold text-gray-900 mb-1 line-clamp-2">
                    <Link
                      to={`/product-details/${item?.id}`}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {item?.name}
                    </Link>
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">{item?.color}</p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex items-center">
                      {renderStars(item?.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      {item?.rating} ({item?.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="font-bold text-lg text-gray-900">
                      ${item?.price}
                    </span>
                    {item?.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item?.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 font-coder">
                    {item?.inStock ? (
                      <>
                        {/* <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleMoveToCart(item?.id)}
                        >
                          <Icon
                            name="ShoppingCart"
                            size={16}
                            className="mr-2"
                          />
                          Add to Cart
                        </Button> */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <Link to={`/product-details/${item?.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        disabled
                      >
                        Notify When Available
                      </Button>
                    )}
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-gray-500 mt-3 text-center font-coder">
                    Added on {new Date(item?.addedDate)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center font-coder">
            <Button size="lg" asChild>
              <Link to="/product-catalog">
                <Icon name="Plus" size={20} className="mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Heart" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600 font-coder mb-6 max-w-md mx-auto">
            Browse our products and add items to your wishlist to save them for
            later.
          </p>
          <Button size="lg" asChild>
            <Link to="/product-catalog">
              <Icon name="Search" size={20} className="mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
