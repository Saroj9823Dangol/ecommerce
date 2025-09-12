import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "ULTRABOOST 22",
      subtitle: "FEEL THE ENERGY RETURN",
      description:
        "Experience the ultimate comfort with our most responsive cushioning yet. Perfect for your daily runs and urban adventures.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop",
      ctaText: "Shop Now",
      ctaLink: "/product-catalog?category=running",
      bgGradient: "from-black via-gray-900 to-black",
    },
    {
      id: 2,
      title: "STAN SMITH COLLECTION",
      subtitle: "TIMELESS CLASSIC",
      description:
        "The iconic tennis shoe that transcends generations. Clean, simple, and effortlessly stylish for every occasion.",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=800&fit=crop",
      ctaText: "Explore Collection",
      ctaLink: "/product-catalog?category=lifestyle",
      bgGradient: "from-white via-gray-50 to-gray-100",
    },
    {
      id: 3,
      title: "WINTER COLLECTION 2025",
      subtitle: "STAY WARM, STAY ACTIVE",
      description:
        "Discover our latest winter gear designed to keep you moving through the coldest months with style and performance.",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop",
      ctaText: "Shop Winter",
      ctaLink: "/product-catalog?season=winter",
      bgGradient: "from-gray-900 via-blue-900 to-black",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [heroSlides?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length
    );
  };

  const currentHero = heroSlides?.[currentSlide];
  const isLightSlide = currentSlide === 1;

  return (
    <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transition-transform duration-1000 ease-in-out">
        <Image
          src={currentHero?.image}
          alt={currentHero?.title}
          className="w-full h-full object-cover scale-110"
        />
        {/* Gradient Overlays for better text contrast */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentHero?.bgGradient} opacity-70`}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <div
              className={`space-y-8 ${
                isLightSlide ? "text-gray-900" : "text-white"
              } animate-fade-in`}
            >
              {/* Subtitle with modern styling */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-px ${
                      isLightSlide ? "bg-gray-900" : "bg-white"
                    } opacity-60`}
                  ></div>
                  <p className="text-sm lg:text-base font-coder font-semibold tracking-[0.2em] uppercase opacity-90 font-flame">
                    {currentHero?.subtitle}
                  </p>
                </div>

                {/* Main Title with enhanced typography */}
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-monument font-black leading-[0.9] tracking-tight">
                  {currentHero?.title}
                </h1>
              </div>

              {/* Description with better spacing */}
              <p className="text-lg lg:text-xl xl:text-2xl font-coder leading-relaxed opacity-90 max-w-2xl font-light">
                {currentHero?.description}
              </p>

              {/* Modern CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  className={`${
                    isLightSlide
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-white text-black hover:bg-gray-100"
                  } font-coder font-bold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}
                  asChild
                >
                  <Link to={currentHero?.ctaLink}>
                    {currentHero?.ctaText}
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className={`${
                    isLightSlide
                      ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-black"
                  } font-coder font-semibold text-base px-8 py-4 rounded-full backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                  asChild
                >
                  <Link to="/product-catalog">Explore All</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="absolute inset-x-4 lg:inset-x-8 top-1/2 transform -translate-y-1/2 z-20 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 pointer-events-auto group"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 pointer-events-auto group"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          {heroSlides?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2 bg-white rounded-full"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-accent transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroSlides?.length) * 100}%`,
          }}
        />
      </div>

      {/* Slide Counter with modern design */}
      <div className="absolute bottom-8 right-4 lg:right-8 z-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white/90 font-coder text-sm font-medium">
            {String(currentSlide + 1)?.padStart(2, "0")} /{" "}
            {String(heroSlides?.length)?.padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
