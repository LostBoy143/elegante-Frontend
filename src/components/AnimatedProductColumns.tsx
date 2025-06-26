
import React from 'react';

const AnimatedProductColumns = () => {
  const products = [
    // Column 1 products
    [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-c0a7e82dcd2a?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop"
    ],
    // Column 2 products (middle - slower)
    [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-c0a7e82dcd2a?w=300&h=400&fit=crop"
    ],
    // Column 3 products
    [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop"
    ]
  ];

  return (
    <section className="py-8 md:py-12 bg-rose-50/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
            Featured Gallery
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto text-sm md:text-base">
            Explore our curated selection of premium pieces
          </p>
        </div>
        
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] flex gap-2 md:gap-4 justify-center max-w-6xl mx-auto">
          {/* Column 1 */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-[32%]">
            <div className="animate-[slideDown_25s_linear_infinite] flex flex-col gap-2 md:gap-3">
              {[...products[0], ...products[0]].map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Middle - Slower) */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-[32%]">
            <div className="animate-[slideUp_35s_linear_infinite] flex flex-col gap-2 md:gap-3">
              {[...products[1], ...products[1]].map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 relative overflow-hidden rounded-lg max-w-[32%]">
            <div className="animate-[slideDown_25s_linear_infinite] flex flex-col gap-2 md:gap-3">
              {[...products[2], ...products[2]].map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <button className="bg-gray-900 text-white px-8 py-3 md:py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all duration-300">
            Explore More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnimatedProductColumns;
