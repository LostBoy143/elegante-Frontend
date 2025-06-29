import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const Profile = () => {
  const { user, isAuthenticated, logout } = useApp();

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                  Welcome to Elegante
                </h1>
                <p className="text-gray-600 text-lg">
                  Please sign in to access your profile
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-3 border border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </Link>
              </div>
              <div className="mt-12 text-center">
                <p className="text-gray-500 mb-4">
                  Benefits of creating an account:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Heart className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-800">Save Wishlist</p>
                    <p className="text-gray-600">
                      Keep track of your favorite items
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Package className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-800">Order History</p>
                    <p className="text-gray-600">
                      View and track your purchases
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Settings className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-800">
                      Personalized Experience
                    </p>
                    <p className="text-gray-600">
                      Get recommendations just for you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <User className="w-8 h-8 text-gray-700" />
              <h1 className="text-3xl md:text-4xl font-light text-gray-800">
                My Profile
              </h1>
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
                <h2 className="text-xl font-light text-gray-800 mb-2">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Member since{" "}
                  {user?.createdAt ? formatDate(user.createdAt) : "Recently"}
                </p>
                <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors mb-3">
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
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
                    <h3 className="text-lg font-medium text-gray-800">
                      My Orders
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    View and track your orders
                  </p>
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    0
                  </div>
                  <p className="text-sm text-gray-500">Total orders</p>
                </div>
                {/* Wishlist */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">
                      Wishlist
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">Your saved items</p>
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    0
                  </div>
                  <p className="text-sm text-gray-500">Saved items</p>
                </div>
                {/* Addresses */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">
                      Addresses
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Manage shipping addresses
                  </p>
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    0
                  </div>
                  <p className="text-sm text-gray-500">Saved addresses</p>
                </div>
                {/* Payment Methods */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-800">
                      Payment Methods
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">Manage payment options</p>
                  <div className="text-2xl font-light text-gray-900 mb-2">
                    0
                  </div>
                  <p className="text-sm text-gray-500">Saved cards</p>
                </div>
              </div>
              {/* Account Settings */}
              <div className="mt-8 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-800">
                    Account Settings
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Email notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
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
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
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
