
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const LatestCollections = () => {
  // Get first 4 products for latest collections
  const latestProducts = products.slice(0, 4);

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Latest Collections" 
          subtitle="Discover our newest arrivals where elegance meets contemporary design. Each piece is carefully selected to elevate your wardrobe."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {latestProducts.map((product) => (
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
