import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { categories, sortOptions } from "../data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import type { Product } from "../data/products";

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(`${apiUrl}/products`);
      const data = await response.json();
      const mapped = data.map((product) => ({
        ...product,
        id: product._id,
      }));
      setProducts(mapped);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // console.log(products);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, products]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4 text-center pb-6">
          <h1 className="text-3xl md:text-5xl font-light text-gray-800 mb-4 tracking-wide uppercase">
            Our Collection
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Discover our complete range of premium women's fashion pieces,
            carefully curated for the modern woman.
          </p>
        </div>
      </section>

      {/* Filter and Sort Bar - No gap, directly connected */}
      <section className="sticky top-16 md:top-16 z-40 bg-white border-b border-gray-200 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              Filter & Sort
            </button>

            {/* Desktop Filters */}
            <div
              className={`${
                isFilterOpen ? "block" : "hidden"
              } md:block w-full md:w-auto`}
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm uppercase tracking-wider font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px] text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length}{" "}
            products
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-64 rounded"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;
