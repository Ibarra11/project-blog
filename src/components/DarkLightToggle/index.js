"use client";
import React from "react";
import Cookies from "js-cookie";
import { Moon, Sun } from "react-feather";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function DarkLightToggle({ theme, className }) {
  const [colorTheme, setColorTheme] = React.useState(theme);

  function toggleTheme() {
    const nextTheme = colorTheme === "light" ? "dark" : "light";
    const tokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    Cookies.set("theme", nextTheme, { expires: 1000 });
    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(tokens).forEach(([entry, value]) =>
      root.style.setProperty(entry, value)
    );
    setColorTheme(nextTheme);
  }
  return (
    <button onClick={toggleTheme} className={className}>
      {colorTheme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
