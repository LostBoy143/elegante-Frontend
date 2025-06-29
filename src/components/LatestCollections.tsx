import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";

const apiUrl = import.meta.env.VITE_API_URL;

const LatestCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        // Sort by createdAt (newest first), fallback to original order if not present
        const sorted = data
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
          )
          .map((p) => ({ ...p, id: p._id }));
        setProducts(sorted);
        setLoading(false);
      });
  }, []);

  const latestProducts = products.slice(0, 4);

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Latest Collections"
          subtitle="Discover our newest arrivals where elegance meets contemporary design. Each piece is carefully selected to elevate your wardrobe."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-64 rounded"
                />
              ))
            : latestProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
        </div>

        <div className="text-center">
          <Link
            to="/collection"
            className="bg-gray-900 text-white px-8 py-3 md:py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all duration-300 inline-block"
          >
            Explore More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestCollections;
