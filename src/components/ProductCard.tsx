import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { Product } from "../data/products";
import { useToast } from "@/components/ui/use-toast";

const ProductCard: React.FC<Product> = (product) => {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isAuthenticated,
  } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (inWishlist) {
      await removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        variant: "default",
      });
    } else {
      await addToWishlist(product.id);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
        variant: "success",
      });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await addToCart(product.id);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden w-full max-w-xs mx-auto block"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/4] bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-gray-900 text-white px-2 py-1 text-xs font-medium uppercase tracking-wider">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-rose-500 text-white px-2 py-1 text-xs font-medium uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white rounded-full"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              inWishlist
                ? "text-rose-500 fill-rose-500"
                : "text-gray-600 hover:text-rose-500"
            }`}
          />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 left-2 right-2 bg-gray-900/90 backdrop-blur-sm text-white py-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-900 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">
          {product.category}
        </div>

        <h3 className="text-sm font-light text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-light text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-light">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {product.isSale && product.originalPrice && (
            <span className="text-xs font-medium text-rose-500 uppercase tracking-wider">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % Off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
