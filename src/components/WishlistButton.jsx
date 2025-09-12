import React, { useState } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';

const WishlistButton = ({ 
  productId, 
  size = 'md', 
  variant = 'ghost', 
  className = '',
  showLabel = false,
  initialWishlisted = false 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsWishlisted(!isWishlisted);
      
      // You can add toast notification here
      console.log(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
      
    } catch (error) {
      console.error('Wishlist toggle error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'w-8 h-8',
          icon: 16,
          text: 'text-xs'
        };
      case 'lg':
        return {
          button: 'w-12 h-12',
          icon: 24,
          text: 'text-base'
        };
      default:
        return {
          button: 'w-10 h-10',
          icon: 20,
          text: 'text-sm'
        };
    }
  };

  const sizeConfig = getSizeConfig();

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`${sizeConfig?.button} ${className} ${
        isWishlisted 
          ? 'text-red-600 hover:text-red-700' :'text-gray-500 hover:text-red-600'
      } transition-all duration-200 ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isLoading ? (
        <div className="animate-spin">
          <Icon name="Loader2" size={sizeConfig?.icon} />
        </div>
      ) : (
        <Icon 
          name="Heart" 
          size={sizeConfig?.icon} 
          className={`${isWishlisted ? 'fill-current' : ''} transition-all duration-200`}
        />
      )}
      {showLabel && (
        <span className={`ml-2 font-medium ${sizeConfig?.text}`}>
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </span>
      )}
    </Button>
  );
};

export default WishlistButton;