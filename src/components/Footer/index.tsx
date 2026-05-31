import styles from "./styles.module.css";
import { RouterLink } from "../RouterLink";

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <RouterLink href="/about-pomodoro/" title="Entenda a técnica">
          Entenda como funciona a técnica Pomodoro
        </RouterLink>
        <RouterLink href="/" title="Entenda a técnica">
          Chronos Pomodoro &copy; {new Date().getFullYear()}
        </RouterLink>
      </footer>
    </>
  );
}
