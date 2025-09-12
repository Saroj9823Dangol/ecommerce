import React from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const EmptyCart = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Ultraboost 22",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "Running Shoes",
    },
    {
      id: 2,
      name: "Stan Smith",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      category: "Lifestyle",
    },
    {
      id: 3,
      name: "Gazelle",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
      category: "Originals",
    },
  ];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Empty Cart Icon */}
      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      {/* Empty State Content */}
      <div className="max-w-md mx-auto mb-8">
        <h1 className="font-monument font-bold text-2xl text-foreground mb-3">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your cart yet. Start shopping
          to fill it up!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => (window.location.href = "/product-catalog")}
            iconName="Search"
            iconPosition="left"
          >
            Browse Products
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/home-dashboard")}
            iconName="Home"
            iconPosition="left"
          >
            Go Home
          </Button>
        </div>
      </div>
      {/* Featured Products */}
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="font-monument font-bold text-xl text-foreground mb-6">
          You might like these
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() =>
                (window.location.href = `/product-details?id=${product?.id}`)
              }
            >
              <div className="aspect-square bg-secondary overflow-hidden">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/assets/images/no_image.png";
                  }}
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {product?.category}
                </p>
                <h3 className="font-monument font-semibold text-foreground mb-2">
                  {product?.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-monument font-bold text-lg text-foreground">
                    ${product?.price}
                  </span>
                  <Button
                    size="sm"
                    iconName="Plus"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Add to cart logic would go here
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Benefits Section */}
      <div className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Truck" size={24} className="text-accent" />
          </div>
          <h3 className="font-monument font-semibold text-foreground mb-2">
            Free Shipping
          </h3>
          <p className="text-sm text-muted-foreground">On orders over $75</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="RefreshCw" size={24} className="text-accent" />
          </div>
          <h3 className="font-monument font-semibold text-foreground mb-2">
            Easy Returns
          </h3>
          <p className="text-sm text-muted-foreground">30-day return policy</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Shield" size={24} className="text-accent" />
          </div>
          <h3 className="font-monument font-semibold text-foreground mb-2">
            Secure Payment
          </h3>
          <p className="text-sm text-muted-foreground">
            Your data is protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
