"use client";

import { create } from "zustand";

type Theme = "light" | "dark";

type GlobalState = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

const useGlobalStore = create<GlobalState>((set) => ({
  theme: "light",
  setTheme: (newTheme: Theme) => {
    const body = document.querySelector("body");

    const prevTheme = localStorage.getItem("theme") as Theme;
    body?.classList.remove(prevTheme);
    set({ theme: newTheme });
    body?.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  },
}));

export default useGlobalStore;
