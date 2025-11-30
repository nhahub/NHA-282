import { create } from "zustand";
import zukeeper from "zukeeper";

const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (err) {
    console.error("Error saving cart to localStorage", err);
  }
};

const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Error loading cart from localStorage", err);
    return [];
  }
};

const useCartStore = create(
  zukeeper((set, get) => ({
    cart: loadCartFromStorage(),
    addToCart: (newItem) => {
      const itemExists = get().cart.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (itemExists) {
        if (typeof itemExists.quantity === "number") {
          itemExists.quantity += newItem.quantity;
        }
        set((state) => {
          const newCart = [...state.cart];
          saveCartToStorage(newCart);
          return { cart: newCart };
        });
      } else {
        set((state) => {
          const newCart = [...state.cart, { ...newItem }];
          saveCartToStorage(newCart);
          return { cart: newCart };
        });
      }
    },
    removeFromCart: ({ id, size, color }) => {
      set((state) => {
        const newCart = state.cart.filter(
          (item) =>
            !(item.id === id && item.size === size && item.color === color)
        );
        saveCartToStorage(newCart);
        return { cart: newCart };
      });
    },
    clearCart: () => {
      set(() => {
        const newCart = [];
        saveCartToStorage(newCart);
        return { cart: newCart };
      });
    },
    increaseQuantity: (id) => {
      const itemExists = get().cart.find((item) => item.id === id);
      if (itemExists) {
        set((state) => {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }
          const newCart = [...state.cart];
          saveCartToStorage(newCart);
          return { cart: newCart };
        });
      }
    },
    decreaseQuantity: (id) => {
      const itemExists = get().cart.find((item) => item.id === id);
      if (itemExists && itemExists.quantity > 1) {
        set((state) => {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity--;
          }
          const newCart = [...state.cart];
          saveCartToStorage(newCart);
          return { cart: newCart };
        });
      }
    },
  }))
);

export { useCartStore };
