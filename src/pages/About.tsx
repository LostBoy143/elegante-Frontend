
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, Award, Users, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Fashion",
      description: "We believe fashion is a form of self-expression that should make every woman feel confident and beautiful."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Every piece in our collection is carefully selected for its superior quality, craftsmanship, and timeless appeal."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We're committed to providing exceptional service and experiences."
    },
    {
      icon: Globe,
      title: "Global Inspiration",
      description: "We draw inspiration from fashion capitals around the world to bring you truly international style."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6 tracking-wide uppercase">
            About Elegante
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Founded on the belief that every woman deserves to feel elegant and confident, 
            Elegante curates premium fashion pieces that transcend trends and celebrate timeless style.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6 uppercase tracking-wide">
                Our Story
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                  alt="Fashion atelier" 
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Elegante was born from a simple vision: to make luxury fashion accessible to the modern woman. 
                  Our founder, inspired by the timeless elegance of European fashion houses, set out to create 
                  a brand that celebrates both classic sophistication and contemporary style.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Since our founding, we've grown from a small boutique to a globally recognized brand, 
                  but our commitment to quality, craftsmanship, and customer satisfaction remains unchanged. 
                  Every piece we offer is a testament to our dedication to excellence.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, Elegante serves women worldwide who appreciate the finer things in life and 
                  understand that true style is timeless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6 uppercase tracking-wide">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
              These core principles guide everything we do and shape the Elegante experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center bg-white p-8 rounded-lg shadow-sm">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-light text-gray-800 mb-2">500+</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Curated Pieces</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-gray-800 mb-2">10K+</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-gray-800 mb-2">50+</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-gray-800 mb-2">5</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
