import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useState } from "react";

export function Menu() {
  type avaliableThemes = "light" | "dark";
  const [theme, setTheme] = useState<avaliableThemes>("dark");

  function handleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.log("tema alterado");
  }

  return (
    <nav className={`${styles.menu}`}>
      <a href="#" className={styles.menuLink} aria-label="Home" title="Home">
        <HouseIcon />
      </a>
      <a
        href="#"
        title="Histórico"
        aria-label="Histórico"
        className={styles.menuLink}
      >
        <HistoryIcon />
      </a>
      <a
        href="#"
        title="Configurações"
        aria-label="Configurações"
        className={styles.menuLink}
      >
        <SettingsIcon />
      </a>
      <a
        href="#"
        title="Mudar Tema"
        aria-label="Mudar tema"
        className={styles.menuLink}
        onClick={handleTheme}
      >
        <SunIcon />
      </a>
    </nav>
  );
}
