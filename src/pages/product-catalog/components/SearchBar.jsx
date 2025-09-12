import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  placeholder = "Search products...",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const mockSuggestions = [
    "Ultraboost 22 Running Shoes",
    "Stan Smith Classic Sneakers",
    "Gazelle Vintage Shoes",
    "Superstar Original",
    "NMD R1 Primeknit",
    "Forum Low Shoes",
    "Continental 80 Shoes",
    "Samba Classic",
    "Campus 80s",
    "ZX 2K Boost",
  ];

  const mockRecentSearches = [
    "running shoes",
    "white sneakers",
    "adidas originals",
    "basketball shoes",
  ];

  useEffect(() => {
    setRecentSearches(mockRecentSearches);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);

    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter((item) =>
        item?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery?.length === 0 && recentSearches?.length > 0) {
      setShowSuggestions(true);
    } else if (searchQuery?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    setIsSearchFocused(false);
    onSearchSubmit(suggestion);
  };

  const handleRecentSearchClick = (search) => {
    onSearchChange(search);
    setShowSuggestions(false);
    setIsSearchFocused(false);
    onSearchSubmit(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (searchToRemove) => {
    setRecentSearches((prev) =>
      prev?.filter((search) => search !== searchToRemove)
    );
  };

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Add to recent searches if not already present
      if (!recentSearches?.includes(searchQuery?.trim())) {
        setRecentSearches((prev) => [
          searchQuery?.trim(),
          ...prev?.slice(0, 3),
        ]);
      }
      setShowSuggestions(false);
      setIsSearchFocused(false);
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <div
      className="relative w-full max-w-2xl mx-auto mb-6 font-coder"
      ref={searchRef}
    >
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`w-full pl-12 pr-12 py-4 bg-card border-2 rounded-lg text-base font-coder placeholder:text-muted-foreground focus:outline-none transition-all duration-200 ${
              isSearchFocused
                ? "border-ring shadow-lg"
                : "border-border hover:border-ring/50"
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </form>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {searchQuery?.length === 0 && recentSearches?.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-coder font-medium text-sm text-foreground">
                  Recent Searches
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>
              <div className="space-y-1">
                {recentSearches?.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <button
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center space-x-3 flex-1 px-2 py-2 text-left text-sm font-coder hover:bg-secondary rounded transition-colors duration-200"
                    >
                      <Icon
                        name="Clock"
                        size={16}
                        className="text-muted-foreground"
                      />
                      <span>{search}</span>
                    </button>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="p-1 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions?.length > 0 && (
            <div className="p-2">
              {searchQuery?.length > 0 && (
                <div className="px-2 py-1 text-xs font-coder font-medium text-muted-foreground uppercase tracking-wide">
                  Suggestions
                </div>
              )}
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left text-sm font-coder hover:bg-secondary rounded transition-colors duration-200"
                >
                  <Icon
                    name="Search"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchQuery?.length > 0 && suggestions?.length === 0 && (
            <div className="p-4 text-center">
              <Icon
                name="Search"
                size={32}
                className="mx-auto text-muted-foreground mb-2"
              />
              <p className="text-sm text-muted-foreground">
                No suggestions found for "{searchQuery}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for shoes, clothing, or accessories
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
