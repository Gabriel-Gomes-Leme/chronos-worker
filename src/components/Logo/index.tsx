import { TimerIcon } from "lucide-react";
import styles from "./styles.module.css";
import { RouterLink } from "../RouterLink";

export function Logo() {
  return (
    <div className={`${styles.logo} ${styles.light}`}>
      <RouterLink href="#" title="Logo" className={styles.logoLink}>
        <TimerIcon />
        <span>Cronos</span>
      </RouterLink>
    </div>
  );
}
