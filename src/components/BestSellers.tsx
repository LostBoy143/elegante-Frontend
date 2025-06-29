import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const apiUrl = import.meta.env.VITE_API_URL;

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        // Sort by price descending as a placeholder for best sellers
        const sorted = data
          .slice()
          .sort((a, b) => b.price - a.price)
          .map((p) => ({ ...p, id: p._id }));
        setProducts(sorted);
        setLoading(false);
      });
  }, []);

  const bestSellerProducts = products.slice(0, 20);

  return (
    <section className="py-8 md:py-16 bg-rose-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Best Sellers"
          subtitle="These timeless pieces have captured the hearts of our customers. Discover what makes them so special."
        />

        <div className="relative mt-12">
          {loading ? (
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-64 w-72 rounded"
                />
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {bestSellerProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-2 md:pl-4 basis-[280px] sm:basis-[300px] lg:basis-[320px] flex-shrink-0"
                  >
                    <div className="h-full">
                      <ProductCard {...product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Custom styled navigation buttons */}
              <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6 lg:-left-12 h-10 w-10 md:h-12 md:w-12 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-lg transition-all duration-300 z-10" />
              <CarouselNext className="hidden sm:flex -right-4 md:-right-6 lg:-right-12 h-10 w-10 md:h-12 md:w-12 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-lg transition-all duration-300 z-10" />
            </Carousel>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/collection"
            className="bg-gray-900 text-white px-10 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
          >
            Explore More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
