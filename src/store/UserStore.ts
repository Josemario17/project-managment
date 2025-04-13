import { create } from "zustand";
import Cookies from "js-cookie";

interface UserStore {
    userData: {
        name: string;
        email: string;
        id: string;
    } | null;
    
    isAuthenticated: boolean;
    setUserData: (data: { name: string; email: string; id: string }) => void;
}

const getDataByCookies = () => {
    const userData = Cookies.get("user_data");
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}

export const useUserStore = create<UserStore>((set) => ({
    userData: getDataByCookies()?.user || null,
    isAuthenticated: getDataByCookies() !== null,
    setUserData: (data) => {
        set({ userData: data, isAuthenticated: data !== null });
    },
}));