import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      review: `The Ultraboost 22 has completely transformed my running experience. The comfort and energy return is incredible - I can run longer distances without fatigue. The quality is outstanding and they look great too!`,
      product: "Ultraboost 22",
      verified: true,
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, CA",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      review: `I've been wearing Stan Smiths for years, and this latest version is the best yet. Perfect for both casual wear and light workouts. The leather quality is exceptional and they're incredibly versatile.`,
      product: "Stan Smith Classic",
      verified: true,
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      review: `Amazing customer service and fast shipping! My NMD R1s arrived in perfect condition and fit exactly as expected. The style is on point and they're so comfortable for all-day wear.`,
      product: "NMD R1",
      verified: true,
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Miami, FL",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      review: `The training shoes I ordered exceeded my expectations. Great support during workouts and the build quality is top-notch. Definitely worth the investment for serious athletes.`,
      product: "Alphaboost Training",
      verified: true,
      date: "1 week ago",
    },
    {
      id: 5,
      name: "Jessica Park",
      location: "Seattle, WA",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      review: `Love the retro vibe of the Gazelle sneakers! They're stylish, comfortable, and go with everything in my wardrobe. The ordering process was smooth and delivery was super quick.`,
      product: "Gazelle Vintage",
      verified: true,
      date: "2 months ago",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const currentReview = testimonials?.[currentTestimonial];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-coder font-semibold mb-4">
            <Icon name="MessageCircle" size={16} />
            Customer Reviews
          </div>
          <h2 className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg font-coder text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to
            say about their Adidas experience.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full fill-current text-gray-900"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(currentReview?.rating)}
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-xl lg:text-2xl font-coder text-gray-900 text-center leading-relaxed mb-8">
                "{currentReview?.review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <Image
                    src={currentReview?.avatar}
                    alt={currentReview?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {currentReview?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h4 className="font-coder font-bold text-gray-900">
                    {currentReview?.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-coder">
                    {currentReview?.location}
                  </p>
                  <p className="text-xs text-gray-500 font-coder">
                    Purchased {currentReview?.product} • {currentReview?.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-3">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-black scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
              4.8
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderStars(5)}
            </div>
            <p className="text-gray-600 font-coder text-sm">Average Rating</p>
          </div>

          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
              12K+
            </div>
            <p className="text-gray-600 font-coder text-sm">Total Reviews</p>
          </div>

          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
              96%
            </div>
            <p className="text-gray-600 font-coder text-sm">Recommend Us</p>
          </div>

          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-monument font-bold text-gray-900 mb-2">
              24h
            </div>
            <p className="text-gray-600 font-coder text-sm">Response Time</p>
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.slice(0, 3)?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center gap-1 mb-3">
                {renderStars(testimonial?.rating)}
              </div>

              <p className="text-gray-900 font-coder mb-4 line-clamp-3">
                "{testimonial?.review}"
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-monument font-semibold text-sm text-gray-900">
                    {testimonial?.name}
                  </h5>
                  <p className="text-xs text-gray-500 font-coder">
                    {testimonial?.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
