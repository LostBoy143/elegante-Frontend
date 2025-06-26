
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Package, Heart, Settings, MapPin, CreditCard } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="w-8 h-8 text-gray-700" />
              <h1 className="text-3xl md:text-4xl font-light text-gray-800">My Profile</h1>
            </div>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-light text-gray-800 mb-2">Sarah Johnson</h2>
                <p className="text-gray-600 mb-4">sarah.johnson@example.com</p>
                <p className="text-sm text-gray-500 mb-6">Member since January 2024</p>
                <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Account Options */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Orders */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">My Orders</h3>
                  </div>
                  <p className="text-gray-600 mb-4">View and track your orders</p>
                  <div className="text-2xl font-light text-gray-900 mb-2">12</div>
                  <p className="text-sm text-gray-500">Total orders</p>
                </div>

                {/* Wishlist */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">Wishlist</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Your saved items</p>
                  <div className="text-2xl font-light text-gray-900 mb-2">5</div>
                  <p className="text-sm text-gray-500">Saved items</p>
                </div>

                {/* Addresses */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">Addresses</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Manage shipping addresses</p>
                  <div className="text-2xl font-light text-gray-900 mb-2">2</div>
                  <p className="text-sm text-gray-500">Saved addresses</p>
                </div>

                {/* Payment Methods */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">Payment Methods</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Manage payment options</p>
                  <div className="text-2xl font-light text-gray-900 mb-2">1</div>
                  <p className="text-sm text-gray-500">Saved cards</p>
                </div>
              </div>

              {/* Account Settings */}
              <div className="mt-8 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-800">Account Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Email notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">SMS notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Marketing emails</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="text-red-600 hover:text-red-700 text-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
