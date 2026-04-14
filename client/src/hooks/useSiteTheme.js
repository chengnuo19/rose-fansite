import { useEffect, useState } from "react";

const STORAGE_KEY = "rose-fansite-theme";

export function useSiteTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "nightstage";
    }

    return window.localStorage.getItem(STORAGE_KEY) || "nightstage";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}
