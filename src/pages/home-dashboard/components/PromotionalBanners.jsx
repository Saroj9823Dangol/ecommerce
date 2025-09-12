import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const PromotionalBanners = () => {
  const banners = [
    {
      id: 1,
      title: "Winter Collection 2025",
      subtitle: "Stay Warm, Stay Active",
      description:
        "Discover our latest winter gear designed to keep you moving through the coldest months.",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=500&fit=crop",
      ctaText: "Explore Winter Gear",
      ctaLink: "/product-catalog?season=winter",
      bgGradient: "from-blue-900 to-blue-700",
      textColor: "text-white",
      size: "large",
    },
    {
      id: 2,
      title: "Sustainability Initiative",
      subtitle: "Made with Recycled Materials",
      description:
        "Join us in creating a better future with our eco-friendly footwear collection.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
      ctaText: "Shop Sustainable",
      ctaLink: "/product-catalog?sustainable=true",
      bgGradient: "from-green-800 to-green-600",
      textColor: "text-white",
      size: "medium",
    },
    {
      id: 3,
      title: "Performance Plus",
      subtitle: "Professional Athletes Choice",
      description:
        "Gear trusted by professional athletes worldwide for peak performance.",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop",
      ctaText: "Shop Pro Gear",
      ctaLink: "/product-catalog?category=professional",
      bgGradient: "from-gray-900 to-gray-700",
      textColor: "text-white",
      size: "medium",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Large Banner */}
        <div className="mb-12">
          <div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banners?.[0]?.bgGradient} min-h-[400px] lg:min-h-[500px]`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banners?.[0]?.image}
                alt={banners?.[0]?.title}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full px-8 lg:px-12 py-12">
                <div className="max-w-2xl">
                  <div className={`space-y-6 ${banners?.[0]?.textColor}`}>
                    <div className="space-y-2">
                      <p className="text-sm lg:text-base font-coder font-medium tracking-wider uppercase opacity-90">
                        {banners?.[0]?.subtitle}
                      </p>
                      <h2 className="text-4xl lg:text-6xl font-monument font-bold leading-tight">
                        {banners?.[0]?.title}
                      </h2>
                    </div>

                    <p className="text-lg lg:text-xl font-coder leading-relaxed opacity-90 max-w-lg">
                      {banners?.[0]?.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100 font-coder font-semibold"
                        asChild
                      >
                        <Link to={banners?.[0]?.ctaLink}>
                          {banners?.[0]?.ctaText}
                          <Icon name="ArrowRight" size={18} className="ml-2" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-black font-coder font-semibold"
                        asChild
                      >
                        <Link to="/product-catalog">View All Products</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/30 rounded-full"></div>
            <div className="absolute bottom-8 right-16 w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="absolute top-1/2 right-32 w-4 h-4 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* Medium Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {banners?.slice(1)?.map((banner) => (
            <div
              key={banner?.id}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${banner?.bgGradient} min-h-[300px]`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={banner?.image}
                  alt={banner?.title}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="p-8">
                  <div className={`space-y-4 ${banner?.textColor}`}>
                    <div className="space-y-2">
                      <p className="text-sm font-coder font-medium tracking-wider uppercase opacity-90">
                        {banner?.subtitle}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-monument font-bold leading-tight">
                        {banner?.title}
                      </h3>
                    </div>

                    <p className="font-coder opacity-90 max-w-sm">
                      {banner?.description}
                    </p>

                    <Button
                      variant="outline"
                      size="default"
                      className="border-white text-white hover:bg-white hover:text-gray-900 font-coder font-semibold mt-4"
                      asChild
                    >
                      <Link to={banner?.ctaLink}>
                        {banner?.ctaText}
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Truck" size={24} className="text-white" />
            </div>
            <h4 className="font-monument font-bold text-lg text-gray-900 mb-2">
              Free Shipping
            </h4>
            <p className="text-gray-600 font-coder text-sm">
              Free standard shipping on all orders over $75. No minimum purchase
              required for members.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="RotateCcw" size={24} className="text-white" />
            </div>
            <h4 className="font-monument font-bold text-lg text-gray-900 mb-2">
              Easy Returns
            </h4>
            <p className="text-gray-600 font-coder text-sm">
              30-day return policy. If you're not satisfied, return your
              purchase for a full refund.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <h4 className="font-monument font-bold text-lg text-gray-900 mb-2">
              Quality Guarantee
            </h4>
            <p className="text-gray-600 font-coder text-sm">
              All products come with our quality guarantee. We stand behind
              every item we sell.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
