import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useApp } from "../contexts/AppContext";
import { Heart, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, isAuthenticated, fetchWishlist } = useApp();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWishlist = async () => {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      setLoading(true);
      await fetchWishlist();
      setLoading(false);
    };

    loadWishlist();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">
                Loading your wishlist...
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
              <h1 className="text-3xl md:text-4xl font-light text-gray-800">
                My Wishlist
              </h1>
            </div>
            <p className="text-gray-600">Items you've saved for later</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-gray-600 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Save items you love to your wishlist
              </p>
              <Link
                to="/collection"
                className="bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  {wishlistItems.length} item
                  {wishlistItems.length !== 1 ? "s" : ""} in your wishlist
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((product) => {
                  // Ensure proper data structure for ProductCard
                  const productData = {
                    id: product.id || (product as any)._id,
                    name: product.name || "Product Name",
                    price: product.price || 0,
                    originalPrice: product.originalPrice,
                    image: product.image || "/placeholder.svg",
                    category: product.category || "Unknown",
                    isNew: product.isNew || false,
                    isSale: product.isSale || false,
                    description: product.description || "",
                    colors: product.colors || [],
                    sizes: product.sizes || [],
                    createdAt: product.createdAt,
                  };

                  return <ProductCard key={productData.id} {...productData} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
