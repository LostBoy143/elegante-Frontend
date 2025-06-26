
import React from 'react';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              Elegante
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed font-light">
              Discover timeless elegance with our curated collection of premium women's fashion. 
              Where sophistication meets contemporary design.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 cursor-pointer transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 cursor-pointer transition-colors">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 cursor-pointer transition-colors">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Care Instructions
                </a>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-medium mb-6 uppercase tracking-wider">Collections</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Outerwear
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors font-light">
                  Sale Items
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6 uppercase tracking-wider">Get in Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm font-light">123 Fashion Avenue, Style District, NY 10001</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-light break-all">hello@elegante.com</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 uppercase tracking-wider">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3 font-light">Subscribe for exclusive offers and style updates</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg sm:rounded-r-none bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 text-sm min-w-0"
                />
                <button className="bg-rose-500 px-6 py-2 rounded-lg sm:rounded-l-none hover:bg-rose-600 transition-colors text-sm font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-light text-center md:text-left">
              © 2024 Elegante. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-2 font-light">Crafted with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span className="text-gray-400 text-sm ml-2 font-light">for fashion lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
