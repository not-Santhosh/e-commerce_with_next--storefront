import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"


interface userStore {
    user: UserType|null,
    setUser: (user: UserType) => void,
    clearUser: () => void,
    setCartItem: (cartItem: cart[]) => void,
    setWishList: (productId: string) => void
}

const useUser = create<userStore>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user: UserType) => {
                set({ user: user });
            },
            clearUser: () => {
                set({ user: null });
            },
            setCartItem: (cartItem: cart[]) => {
                const user = get().user;
                if (user) {
                    set({ user: { ...user, cartItems: cartItem } });
                }
            },
            setWishList: (productId: string) => {
                const user = get().user;
                if (user) {
                    set({ user: { ...user, wishlist: [...user.wishlist, productId] } });
                }
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);


export default useUser;