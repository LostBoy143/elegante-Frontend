
import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express shipping worldwide with tracking"
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Your payment information is always protected"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our team is always here to help you"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4 tracking-wide uppercase">
              Why Choose Us
              <div className="absolute -right-8 md:-right-12 top-1/2 transform -translate-y-1/2 w-6 md:w-8 h-px bg-gray-400"></div>
            </h2>
          </div>
          <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Experience the difference with our premium service and commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-rose-100 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 text-sm md:text-base uppercase tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
