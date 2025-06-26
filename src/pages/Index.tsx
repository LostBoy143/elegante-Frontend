
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestCollections from '../components/LatestCollections';
import AnimatedProductColumns from '../components/AnimatedProductColumns';
import BestSellers from '../components/BestSellers';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerTestimonials from '../components/CustomerTestimonials';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <LatestCollections />
      <AnimatedProductColumns />
      <BestSellers />
      <WhyChooseUs />
      <CustomerTestimonials />
      <Footer />
    </div>
  );
};

export default Index;
