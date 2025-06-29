import React, { useMemo, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useApp } from "../contexts/AppContext";
import { Search } from "lucide-react";

const SearchResults = () => {
  const { searchQuery } = useApp();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get API URL from environment
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://elegante-backend.onrender.com/api";

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (response.ok) {
          const data = await response.json();
          // Map _id to id for frontend compatibility
          const mappedProducts = data.map((product: any) => ({
            ...product,
            id: product._id || product.id,
          }));
          setAllProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    );
  }, [searchQuery, allProducts]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-8 h-8 text-gray-700" />
              <h1 className="text-3xl md:text-4xl font-light text-gray-800">
                Search Results
              </h1>
            </div>
            <p className="text-gray-600">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : "Enter a search term to find products"}
            </p>
          </div>

          {!searchQuery ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-gray-600 mb-4">
                Start your search
              </h2>
              <p className="text-gray-500">
                Use the search bar above to find products
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-300 mx-auto mb-4"></div>
              <h2 className="text-2xl font-light text-gray-600 mb-4">
                Searching...
              </h2>
              <p className="text-gray-500">
                Please wait while we search for products
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-gray-600 mb-4">
                No results found
              </h2>
              <p className="text-gray-500 mb-8">
                We couldn't find any products matching "{searchQuery}"
              </p>
              <div className="text-gray-500">
                <p className="mb-2">Try:</p>
                <ul className="text-sm space-y-1">
                  <li>• Checking your spelling</li>
                  <li>• Using fewer keywords</li>
                  <li>• Searching for more general terms</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Found {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
