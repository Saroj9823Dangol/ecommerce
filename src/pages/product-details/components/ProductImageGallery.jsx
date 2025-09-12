import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images?.length - 1 : prev - 1
    );
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images?.length - 1 ? 0 : prev + 1
    );
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square">
        <div
          className="relative w-full h-full cursor-zoom-in"
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <Image
            src={images?.[selectedImageIndex]}
            alt={`${productName} - View ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition?.x}% ${zoomPosition?.y}%`,
                  }
                : {}
            }
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200"
        >
          <Icon name="ChevronLeft" size={20} className="text-foreground" />
        </button>

        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200"
        >
          <Icon name="ChevronRight" size={20} className="text-foreground" />
        </button>

        {/* Zoom Indicator */}
        {!isZoomed && (
          <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2">
            <Icon name="ZoomIn" size={16} className="text-foreground" />
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-coder">
          {selectedImageIndex + 1} / {images?.length}
        </div>
      </div>
      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
              selectedImageIndex === index
                ? "border-primary"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      {/* 360 View Button */}
      <button className="w-full py-3 border border-border rounded-md hover:bg-secondary transition-colors duration-200 flex items-center justify-center space-x-2">
        <Icon name="RotateCcw" size={18} />
        <span className="font-coder font-medium text-sm">360° View</span>
      </button>
    </div>
  );
};

export default ProductImageGallery;
