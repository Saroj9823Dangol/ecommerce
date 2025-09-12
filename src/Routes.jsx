import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import HomeDashboard from './pages/home-dashboard';
import ProductCatalog from './pages/product-catalog';
import ProductDetails from './pages/product-details';
import OrderHistory from './pages/order-history';
import CheckoutProcess from './pages/checkout-process';
import UserDashboard from './pages/user-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/checkout-process" element={<CheckoutProcess />} />
        
        {/* User Dashboard Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/profile" element={<UserDashboard />} />
        <Route path="/user-dashboard/orders" element={<UserDashboard />} />
        <Route path="/user-dashboard/wishlist" element={<UserDashboard />} />
        <Route path="/user-dashboard/addresses" element={<UserDashboard />} />
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;