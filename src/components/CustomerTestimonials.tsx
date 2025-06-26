
import React from 'react';

const CustomerTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      review: "Absolutely stunning quality! The attention to detail in every piece is remarkable. I've never felt more confident and elegant.",
      rating: 5
    },
    {
      name: "Emma Williams",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      review: "The fabrics are luxurious and the fit is perfect. Fast shipping and excellent customer service. Highly recommend!",
      rating: 5
    },
    {
      name: "Isabella Martinez",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      review: "These pieces have become my wardrobe staples. The quality is exceptional and the designs are timeless and sophisticated.",
      rating: 5
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-wide uppercase">
              What Our Customers Say
              <div className="absolute -right-8 md:-right-12 top-1/2 transform -translate-y-1/2 w-6 md:w-8 h-px bg-gray-400"></div>
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Discover why women worldwide trust us for their premium fashion needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm md:text-base">★</span>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed italic">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
