import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  const offers = [
    {
      id: 1,
      title: "Flash Sale",
      subtitle: "Up to 50% Off",
      description:
        "Limited time offer on selected running shoes. Don't miss out on these incredible deals!",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
      ctaText: "Shop Flash Sale",
      ctaLink: "/product-catalog?sale=flash",
      bgColor: "bg-red-500",
      textColor: "text-white",
      isLimited: true,
    },
    {
      id: 2,
      title: "New Member Exclusive",
      subtitle: "Extra 20% Off",
      description:
        "Join our community and get exclusive access to member-only discounts and early releases.",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
      ctaText: "Join Now",
      ctaLink: "/register",
      bgColor: "bg-blue-600",
      textColor: "text-white",
      isLimited: false,
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On Orders Over $75",
      description:
        "Get free standard shipping on all orders over $75. No code needed, discount applied at checkout.",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop",
      ctaText: "Shop Now",
      ctaLink: "/product-catalog",
      bgColor: "bg-green-600",
      textColor: "text-white",
      isLimited: false,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => String(time)?.padStart(2, "0");

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-coder font-bold mb-4">
            <Icon name="Zap" size={16} />
            Special Offers
          </div>
          <h2 className="text-3xl lg:text-4xl font-monument font-bold text-white mb-4">
            Limited Time Deals
          </h2>
          <p className="text-lg font-coder text-gray-300 max-w-2xl mx-auto">
            Don't miss out on these exclusive offers. Save big on your favorite
            products while supplies last.
          </p>
        </div>

        {/* Main Flash Sale Banner */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-500 p-8 lg:p-12">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop"
                alt="Flash Sale Background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-coder font-semibold">
                    <Icon name="Clock" size={16} />
                    Limited Time Only
                  </div>

                  <h3 className="text-4xl lg:text-5xl font-monument font-bold">
                    Flash Sale
                  </h3>

                  <p className="text-xl lg:text-2xl font-monument font-semibold">
                    Up to 50% Off Running Shoes
                  </p>

                  <p className="text-lg opacity-90 font-coder">
                    Get incredible discounts on our best-selling running shoes.
                    Perfect for your fitness journey.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      variant="default"
                      size="lg"
                      className="bg-white text-red-600 hover:bg-gray-100 font-coder font-bold"
                      asChild
                    >
                      <Link to="/product-catalog?sale=flash">
                        Shop Flash Sale
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="text-center lg:text-right">
                <p className="text-white/80 font-coder mb-4">Sale ends in:</p>
                <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                  {[
                    { label: "Days", value: timeLeft?.days },
                    { label: "Hours", value: timeLeft?.hours },
                    { label: "Min", value: timeLeft?.minutes },
                    { label: "Sec", value: timeLeft?.seconds },
                  ]?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                    >
                      <div className="text-2xl lg:text-3xl font-monument font-bold text-white">
                        {formatTime(item?.value)}
                      </div>
                      <div className="text-xs font-coder text-white/80 uppercase tracking-wide">
                        {item?.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offers?.slice(1)?.map((offer) => (
            <div
              key={offer?.id}
              className={`relative overflow-hidden rounded-xl ${offer?.bgColor} p-8`}
            >
              <div className="absolute inset-0 opacity-10">
                <Image
                  src={offer?.image}
                  alt={offer?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={`relative z-10 ${offer?.textColor}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-monument font-bold">
                    {offer?.title}
                  </h3>

                  <p className="text-lg lg:text-xl font-monument font-semibold">
                    {offer?.subtitle}
                  </p>

                  <p className="opacity-90 font-coder">{offer?.description}</p>

                  <Button
                    variant="outline"
                    size="default"
                    className="border-white text-white hover:bg-white hover:text-gray-900 font-coder font-semibold"
                    asChild
                  >
                    <Link to={offer?.ctaLink}>
                      {offer?.ctaText}
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <Icon name="Mail" size={32} className="mx-auto text-gray-600" />
              <h3 className="text-2xl font-monument font-bold text-gray-900">
                Never Miss a Deal
              </h3>
              <p className="text-gray-600 font-coder">
                Subscribe to our newsletter and be the first to know about
                exclusive offers and new arrivals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg font-coder focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Button
                  variant="default"
                  size="default"
                  className="font-coder font-semibold"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
