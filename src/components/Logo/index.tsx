import { TimerIcon } from "lucide-react";
import styles from "./styles.module.css";

export function Logo() {
  return (
    <div className={`${styles.logo} ${styles.light}`}>
      <a href="#" title="Logo" className={styles.logoLink}>
        <TimerIcon />
        <span>Cronos</span>
      </a>
    </div>
  );
}
