import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 65 },
    { stars: 4, count: 15, percentage: 22 },
    { stars: 3, count: 5, percentage: 7 },
    { stars: 2, count: 3, percentage: 4 },
    { stars: 1, count: 1, percentage: 2 },
  ];

  const filteredReviews = reviews?.filter((review) => {
    if (filterRating !== "all" && review?.rating !== parseInt(filterRating)) {
      return false;
    }
    if (showOnlyVerified && !review?.verified) {
      return false;
    }
    return true;
  });

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b?.rating - a?.rating;
      case "lowest":
        return a?.rating - b?.rating;
      case "helpful":
        return b?.helpful - a?.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={size}
        className={
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="font-monument font-bold text-4xl text-foreground">
                {averageRating}
              </span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(averageRating), 20)}
              </div>
            </div>
            <p className="font-coder text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution?.map((item) => (
              <div key={item?.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="font-coder text-sm">{item?.stars}</span>
                  <Icon
                    name="Star"
                    size={12}
                    className="text-yellow-400 fill-current"
                  />
                </div>
                <div className="flex-1 bg-secondary rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
                <span className="font-coder text-sm text-muted-foreground w-8">
                  {item?.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Rating Filter */}
          <div className="flex items-center space-x-2">
            <span className="font-coder text-sm text-muted-foreground">
              Filter:
            </span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e?.target?.value)}
              className="border border-border rounded-md px-3 py-1 text-sm font-coder bg-background"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Verified Only */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyVerified}
              onChange={(e) => setShowOnlyVerified(e?.target?.checked)}
              className="rounded border-border"
            />
            <span className="font-coder text-sm text-muted-foreground">
              Verified only
            </span>
          </label>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="font-coder text-sm text-muted-foreground">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="border border-border rounded-md px-3 py-1 text-sm font-coder bg-background"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews?.map((review) => (
          <div
            key={review?.id}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <span className="font-coder font-semibold text-sm">
                    {review?.author?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-coder font-semibold text-sm">
                      {review?.author}
                    </h4>
                    {review?.verified && (
                      <span className="bg-success/10 text-success px-2 py-0.5 rounded text-xs font-coder">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="font-coder text-xs text-muted-foreground">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-coder font-semibold text-sm mb-2">
                {review?.title}
              </h5>
              <p className="font-coder text-sm text-muted-foreground leading-relaxed">
                {review?.content}
              </p>
            </div>

            {review?.images && review?.images?.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md border border-border"
                    onError={(e) => {
                      e.target.src = "/assets/images/no_image.png";
                    }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <Icon name="ThumbsUp" size={16} />
                  <span className="font-coder text-sm">
                    Helpful ({review?.helpful})
                  </span>
                </button>
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <Icon name="MessageCircle" size={16} />
                  <span className="font-coder text-sm">Reply</span>
                </button>
              </div>

              {review?.size && (
                <span className="font-coder text-xs text-muted-foreground">
                  Size purchased: {review?.size}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {sortedReviews?.length < totalReviews && (
        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
      {/* Write Review Button */}
      <div className="text-center pt-6 border-t border-border">
        <Button iconName="Edit" iconPosition="left">
          Write a Review
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;
