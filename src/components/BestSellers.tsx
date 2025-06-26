
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const BestSellers = () => {
  // Get products 5-25 for best sellers (20 products)
  const bestSellerProducts = products.slice(4, 24);

  return (
    <section className="py-8 md:py-16 bg-rose-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Best Sellers" 
          subtitle="These timeless pieces have captured the hearts of our customers. Discover what makes them so special."
        />
        
        <div className="relative mt-12">
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
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-[280px] sm:basis-[300px] lg:basis-[320px] flex-shrink-0">
                  <div className="h-full">
                    <ProductCard {...product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom styled navigation buttons */}
            <CarouselPrevious className="hidden md:flex -left-6 lg:-left-12 h-12 w-12 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-lg transition-all duration-300" />
            <CarouselNext className="hidden md:flex -right-6 lg:-right-12 h-12 w-12 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-lg transition-all duration-300" />
          </Carousel>
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
