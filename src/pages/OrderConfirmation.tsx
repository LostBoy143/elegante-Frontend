import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Calendar,
  MapPin,
  CreditCard,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  subtotal: string;
  shipping: string;
  total: string;
  items: OrderItem[];
  itemCount: number;
}

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
      // Clear the order from localStorage after loading
      localStorage.removeItem("lastOrder");
    } else {
      // If no order details, redirect to cart
      navigate("/cart");
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [navigate]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 text-lg mb-2">
                Thank you for your purchase. Your order has been successfully
                placed.
              </p>
              <p className="text-gray-500">
                Order #{orderDetails.orderNumber} • {orderDetails.itemCount}{" "}
                item{orderDetails.itemCount !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Details */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-medium text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <span className="text-gray-600">Order Number</span>
                      <span className="font-medium text-gray-800">
                        #{orderDetails.orderNumber}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <span className="text-gray-600">Order Date</span>
                      <span className="font-medium text-gray-800">
                        {orderDetails.orderDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium text-gray-800">
                        Credit Card (**** 1234)
                      </span>
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${orderDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {orderDetails.shipping === "Free"
                          ? "Free"
                          : `$${orderDetails.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-medium pt-2 border-t border-gray-200">
                      <span className="text-gray-800">Total</span>
                      <span className="text-gray-800">
                        ${orderDetails.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Package className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="font-medium text-gray-800">
                        Shipping Info
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Standard Delivery
                    </p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {estimatedDelivery}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-6 h-6 text-green-600 mr-3" />
                      <h3 className="font-medium text-gray-800">
                        Delivery Address
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">John Doe</p>
                    <p className="text-sm text-gray-600 mb-1">
                      123 Fashion Street
                    </p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-6">
                  Items Ordered
                </h2>
                <div className="space-y-4 mb-6">
                  {orderDetails.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Steps */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    What's Next?
                  </h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• We'll send you a confirmation email shortly</p>
                    <p>• Your order will be processed within 24 hours</p>
                    <p>• You'll receive tracking details once shipped</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/collection"
                className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors text-center"
              >
                Continue Shopping
              </Link>
              <Link
                to="/profile"
                className="border border-gray-300 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors text-center"
              >
                View Profile
              </Link>
            </div>

            {/* Contact Support */}
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                Need help with your order?
              </p>
              <Link
                to="/contact"
                className="text-rose-600 hover:text-rose-700 text-sm font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
