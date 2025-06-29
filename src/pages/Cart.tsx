import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useApp } from "../contexts/AppContext";
import {
  ShoppingBag,
  Minus,
  Plus,
  X,
  Loader2,
  CheckCircle,
  Package,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../data/products";
import { useToast } from "@/components/ui/use-toast";

// Define CartItem interface to match what's in AppContext
interface CartItem {
  _id: string;
  productId: string | Product;
  quantity: number;
  product?: Product;
}

const Cart = () => {
  const { cart, updateCartItem, removeCartItem, fetchCart, clearCart } =
    useApp();
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
  const [initialLoading, setInitialLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [optimisticQuantities, setOptimisticQuantities] = useState<
    Record<string, number>
  >({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Refs for debouncing
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const pendingUpdates = useRef<Record<string, number>>({});

  // Refetch cart on component mount to ensure we have fresh data
  useEffect(() => {
    const refreshCart = async () => {
      setInitialLoading(true);
      await fetchCart();
      setInitialLoading(false);
    };
    refreshCart();
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  // Debounced quantity update function
  const debouncedUpdateQuantity = useCallback(
    async (itemId: string, newQuantity: number) => {
      // Clear existing timer for this item
      if (debounceTimers.current[itemId]) {
        clearTimeout(debounceTimers.current[itemId]);
      }

      // Update optimistic state immediately for instant UI feedback
      setOptimisticQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));

      // Store the pending update
      pendingUpdates.current[itemId] = newQuantity;

      // Set up debounced API call
      debounceTimers.current[itemId] = setTimeout(async () => {
        const finalQuantity = pendingUpdates.current[itemId];
        if (finalQuantity && finalQuantity > 0) {
          setLoadingItems((prev) => new Set(prev).add(itemId));
          try {
            await updateCartItem(itemId, finalQuantity);
            // Clear optimistic state after successful update
            setOptimisticQuantities((prev) => {
              const newState = { ...prev };
              delete newState[itemId];
              return newState;
            });
          } catch (error) {
            // Revert optimistic update on error
            setOptimisticQuantities((prev) => {
              const newState = { ...prev };
              delete newState[itemId];
              return newState;
            });
            toast({
              title: "Update Failed",
              description: "Failed to update quantity. Please try again.",
              variant: "destructive",
            });
          } finally {
            setLoadingItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(itemId);
              return newSet;
            });
            // Clean up refs
            delete debounceTimers.current[itemId];
            delete pendingUpdates.current[itemId];
          }
        }
      }, 500); // 500ms debounce delay
    },
    [updateCartItem, toast]
  );

  const getProduct = (item: CartItem): Product & { _id?: string } => {
    // If productId is populated (object), return it
    if (typeof item.productId === "object" && item.productId !== null) {
      return item.productId;
    }

    // If product data is available separately, use it
    if (item.product) {
      return item.product;
    }

    // Fallback to basic product info
    return {
      id: typeof item.productId === "string" ? item.productId : "",
      _id: typeof item.productId === "string" ? item.productId : "",
      name: "Product",
      price: 0,
      image: "/placeholder.svg",
      category: "Unknown",
      description: "",
      sizes: [],
      colors: [],
    };
  };

  const subtotal =
    cart?.items.reduce((sum, item) => {
      const product = getProduct(item);
      const currentQuantity = optimisticQuantities[item._id] ?? item.quantity;
      return sum + (product.price || 0) * currentQuantity;
    }, 0) || 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleRemoveItem = async (itemId: string) => {
    setLoadingItems((prev) => new Set(prev).add(itemId));
    await removeCartItem(itemId);
    setLoadingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) return;

    setCheckoutLoading(true);
    try {
      // Generate order details
      const orderDetails = {
        orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
        orderDate: new Date().toLocaleDateString(),
        subtotal: subtotal.toFixed(2),
        shipping: shipping === 0 ? "Free" : shipping.toFixed(2),
        total: total.toFixed(2),
        items: cart.items.map((item) => {
          const product = getProduct(item);
          const currentQuantity =
            optimisticQuantities[item._id] ?? item.quantity;
          return {
            name: product.name,
            quantity: currentQuantity,
            price: product.price,
            image: product.image,
          };
        }),
        itemCount: cart.items.reduce((sum, item) => {
          const currentQuantity =
            optimisticQuantities[item._id] ?? item.quantity;
          return sum + currentQuantity;
        }, 0),
      };
      // Store order details in localStorage for confirmation page
      localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

      // Simulate order processing (API call simulation)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart (synchronous function)
      clearCart();

      // Show success toast
      toast({
        title: "Order Created Successfully!",
        description: `Order #${orderDetails.orderNumber} has been placed.`,
        variant: "success",
      });

      // Redirect to order confirmation page
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error checking out:", error);
      toast({
        title: "Checkout Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-700" />
              <h1 className="text-3xl md:text-4xl font-light text-gray-800">
                Shopping Cart
              </h1>
            </div>
            <p className="text-gray-600">Review your items and checkout</p>
          </div>

          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-gray-600 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Add some products to get started
              </p>
              <Link
                to="/collection"
                className="bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-light">
                    Cart Items (
                    {cart.items.reduce((sum, item) => {
                      const currentQuantity =
                        optimisticQuantities[item._id] ?? item.quantity;
                      return sum + currentQuantity;
                    }, 0)}
                    )
                  </h2>
                  {/* Optionally add a clear cart button here if you implement it */}
                </div>

                {cart.items.map((item) => {
                  const product = getProduct(item);
                  const currentQuantity =
                    optimisticQuantities[item._id] ?? item.quantity;

                  return (
                    <div
                      key={item._id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <Link
                        to={`/product/${product._id || item.productId}`}
                        className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={product.image || ""}
                          alt={product.name || ""}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${product._id || item.productId}`}>
                          <h3 className="font-medium text-gray-900 hover:text-rose-600 transition-colors mb-1">
                            {product.name || "Product"}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          {product.category || ""}
                        </p>
                        <p className="text-lg font-light text-gray-900">
                          ${product.price || 0}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          disabled={loadingItems.has(item._id)}
                        >
                          {loadingItems.has(item._id) ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </button>

                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              debouncedUpdateQuantity(
                                item._id,
                                currentQuantity - 1
                              )
                            }
                            className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              currentQuantity <= 1 || loadingItems.has(item._id)
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-sm border-x min-w-[40px] text-center">
                            {loadingItems.has(item._id) ? (
                              <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                            ) : (
                              currentQuantity
                            )}
                          </span>
                          <button
                            onClick={() =>
                              debouncedUpdateQuantity(
                                item._id,
                                currentQuantity + 1
                              )
                            }
                            className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loadingItems.has(item._id)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                  <h2 className="text-xl font-light mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal < 100 && (
                      <p className="text-sm text-gray-500">
                        Add ${(100 - subtotal).toFixed(2)} more for free
                        shipping
                      </p>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors mb-4"
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>

                  <Link
                    to="/collection"
                    className="block text-center text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
