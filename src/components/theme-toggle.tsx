"use client";

import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import useGlobalStore from "@/global-stores";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useGlobalStore();

  const handleClick = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as any;
    setTheme(savedTheme);
  }, []);

  return (
    <Button onClick={handleClick}>
      {theme === "dark" ? (
        <MoonIcon />
      ) : (
        <SunIcon className="text-yellow-500" />
      )}
    </Button>
  );
};

export default ThemeToggle;
