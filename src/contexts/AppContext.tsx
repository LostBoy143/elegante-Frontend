import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

// Add User type
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface CartItem {
  _id: string;
  productId: string | Product;
  quantity: number;
  product?: Product;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
}

interface AppContextType {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cartItems: (Product & { quantity: number })[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cart: Cart | null;
  fetchCart: () => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeCartItem: (itemId: string) => Promise<void>;

  // Wishlist
  wishlistItems: Product[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  fetchWishlist: () => Promise<void>;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);

  // Get API URL from environment
  const apiUrl =
    import.meta.env.VITE_API_URL || "https://elegante-backend.onrender.com/api";

  // Auth state
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );
  const isAuthenticated = !!user;
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlistItems([]);
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        // Map _id to id for frontend compatibility
        const mappedData = data.map((product: Product & { _id?: string }) => ({
          ...product,
          id: product._id || product.id,
        }));
        setWishlistItems(mappedData);
      } else {
        console.error("Failed to fetch wishlist:", res.status, res.statusText);
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlistItems([]);
    }
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${apiUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 1. Login and get token
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      const token = data.token;
      localStorage.setItem("token", token);

      // 2. Fetch user profile
      const userRes = await fetch(`${apiUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      if (!userRes.ok)
        throw new Error(userData.message || "Failed to fetch user");
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Fetch cart and wishlist after login
      await fetchCart();
      await fetchWishlist();
      return true;
    } catch (err) {
      return false;
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (res.ok) {
        const data = await res.json();
        // Merge the response with existing product data to preserve populated fields
        setCart((prevCart) => {
          if (!prevCart || !data) return data;

          return {
            ...data,
            items: data.items.map((newItem: CartItem) => {
              const existingItem = prevCart.items.find(
                (item) => item._id === newItem._id
              );
              return {
                ...newItem,
                // Preserve the populated productId if it exists
                productId:
                  existingItem && typeof existingItem.productId === "object"
                    ? existingItem.productId
                    : newItem.productId,
              };
            }),
          };
        });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // First, fetch the full product data to add optimistically
    try {
      const productRes = await fetch(`${apiUrl}/products/${productId}`);
      if (productRes.ok) {
        const productData = await productRes.json();
        const fullProduct = {
          ...productData,
          id: productData._id || productData.id,
        };

        // Optimistic update - add full product immediately
        setWishlistItems((prev) => {
          if (prev.find((item) => item.id === productId)) return prev; // Already in wishlist
          return [...prev, fullProduct];
        });
      }

      // Then make the API call to sync with backend
      const res = await fetch(`${apiUrl}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      // Don't update state from API response - optimistic update is already done
      // Only fetch fresh data if API call failed
      if (!res.ok) {
        await fetchWishlist(); // Revert to server state
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      // Revert optimistic update by fetching fresh data
      await fetchWishlist();
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Optimistic update - remove item immediately
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));

    try {
      const res = await fetch(`${apiUrl}/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Don't update state from API response - optimistic update is already done
      // Only fetch fresh data if API call failed
      if (!res.ok) {
        await fetchWishlist(); // Revert to server state
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      // Revert optimistic update by fetching fresh data
      await fetchWishlist();
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // Update quantity of a cart item
  const updateCartItem = async (itemId: string, quantity: number) => {
    // Optimistic update - update UI immediately
    setCart((prevCart) => {
      if (!prevCart) return prevCart;
      return {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        ),
      };
    });

    // Then make API call
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${apiUrl}/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (res.ok) {
        const data = await res.json();
        // Merge the response with existing product data to preserve populated fields
        setCart((prevCart) => {
          if (!prevCart || !data) return data;

          return {
            ...data,
            items: data.items.map((newItem: CartItem) => {
              const existingItem = prevCart.items.find(
                (item) => item._id === newItem._id
              );
              return {
                ...newItem,
                // Preserve the populated productId if it exists
                productId:
                  existingItem && typeof existingItem.productId === "object"
                    ? existingItem.productId
                    : newItem.productId,
              };
            }),
          };
        });
      } else {
        // If API call fails, revert the optimistic update
        await fetchCart();
      }
    } catch (error) {
      // If API call fails, revert the optimistic update
      await fetchCart();
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId: string) => {
    // Optimistic update - remove item immediately
    setCart((prevCart) => {
      if (!prevCart) return prevCart;
      return {
        ...prevCart,
        items: prevCart.items.filter((item) => item._id !== itemId),
      };
    });

    // Then make API call
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${apiUrl}/cart/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        // Merge the response with existing product data
        setCart((prevCart) => {
          if (!prevCart || !data) return data;

          return {
            ...data,
            items: data.items.map((newItem: CartItem) => {
              const existingItem = prevCart.items.find(
                (item) => item._id === newItem._id
              );
              return {
                ...newItem,
                // Preserve the populated productId if it exists
                productId:
                  existingItem && typeof existingItem.productId === "object"
                    ? existingItem.productId
                    : newItem.productId,
              };
            }),
          };
        });
      } else {
        // If API call fails, revert the optimistic update
        await fetchCart();
      }
    } catch (error) {
      // If API call fails, revert the optimistic update
      await fetchCart();
    }
  };

  // Fetch cart and wishlist on app load if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    }
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        user,
        isAuthenticated,
        logout,
        login,
        cart,
        fetchCart,
        updateCartItem,
        removeCartItem,
        fetchWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
