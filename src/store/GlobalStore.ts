import { create } from "zustand";

interface DateOfProjectToCreate{
    date: {
        from: string;
        to: string;
    };
    setDate: (newDate: { from: string; to: string }) => void;
}

export const UseGlobalStore = create<DateOfProjectToCreate>((set) => ({
    date: {
        from: "",
        to: ""
    },
    setDate: (data: { from: string; to: string; }) => {
        set({ date: data });
    },
}));