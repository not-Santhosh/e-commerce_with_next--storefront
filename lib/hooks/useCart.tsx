import { create } from "zustand";
import toast, { Toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import useUser from "./useUser";

interface cartItem {
    item: ProductType,
    quantity: number,
    color?: string,
    size?: string,
}

interface cartStore {
    cartItem: cartItem[],
    addItem: (item:cartItem) => void,
    removeItem: (_id:string) => void,
    increaseQuantity: (idToIncrease: string) => void,
    decreaseQuantity: (idToDecrease: string) => void,
    clearCart: () => void
}

const useCart = create(persist<cartStore>(
    (set, get) => ({
        cartItem: [],
        addItem: (data: cartItem) => {
            const {item, quantity, color, size} = data
            const currentItems = get().cartItem;
            const isExisting = currentItems.filter((cartItem) => cartItem.item._id === item._id);
            console.log({isExisting});            

            if (isExisting.length > 0) {
                return toast("Item already in cart")
            }

            set({cartItem: [...currentItems, {item, quantity, color, size}]});
            return toast("Item added to cart");
        },
        removeItem: (_id: string) => {
            const currentItems = get().cartItem;
            const newitems = currentItems.filter((item) => item.item._id !== _id);
            set({cartItem: newitems});
            return toast("Item removed from cart");
        },
        increaseQuantity: (idToIncrease: string) => {
            const newCartItems = get().cartItem.map((item) => (
                item.item._id === idToIncrease ? {...item, quantity: item.quantity + 1} : item
            ));
            set({cartItem: newCartItems});
            return toast("Quantity updated successfully");
        },
        decreaseQuantity: (idToDecrease: string) => {
            const newCartItems = get().cartItem.map((item) => (
                item.item._id === idToDecrease ? {...item, quantity: item.quantity - 1} : item
            ));
            set({cartItem: newCartItems});
            return toast("Quantity updated successfully");
        },
        clearCart: () => {
            set({cartItem: []});
            return toast("Cart cleared successfully");
        }
    }), 
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
))

export default useCart;