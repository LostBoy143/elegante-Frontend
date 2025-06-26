
import React from 'react';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Collection",
      description: "Discover masculine styles and contemporary fashion",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      itemCount: "500+ Items"
    },
    {
      id: 2,
      name: "Women's Collection",
      description: "Elegant and trendy outfits for every occasion",
      image: "https://images.unsplash.com/photo-1494790108755-2616c6d611b4?w=600&h=800&fit=crop",
      itemCount: "750+ Items"
    },
    {
      id: 3,
      name: "Kids' Collection",
      description: "Comfortable and playful clothes for little ones",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=800&fit=crop",
      itemCount: "300+ Items"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect style for everyone in your family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer transform hover:scale-105 transition-all duration-500 ${
                index === 1 ? 'md:scale-110' : ''
              }`}
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium mb-2 opacity-80">
                      {category.itemCount}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {category.description}
                    </p>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-gray-100">
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-3xl transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
