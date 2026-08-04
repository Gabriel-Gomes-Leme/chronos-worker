import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { RouterLink } from "../RouterLink";

export function Menu() {
  type avaliableThemes = "light" | "dark";
  const [theme, setTheme] = useState<avaliableThemes>(() => {
    const storageTheme =
      (localStorage.getItem("theme") as avaliableThemes) || "dark";
    return storageTheme;
  });

  function handleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "light" ? "dark" : "light";
      return nextTheme;
    });
  }

  const currentIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={`${styles.menu}`}>
      <RouterLink
        href="/"
        className={styles.menuLink}
        aria-label="Home"
        title="Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href="/history"
        title="Histórico"
        aria-label="Histórico"
        className={styles.menuLink}
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href="/settings"
        title="Configurações"
        aria-label="Configurações"
        className={styles.menuLink}
      >
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href="#"
        title="Mudar Tema"
        aria-label="Mudar tema"
        className={styles.menuLink}
        onClick={handleTheme}
      >
        {currentIcon[theme]}
      </RouterLink>
    </nav>
  );
}
