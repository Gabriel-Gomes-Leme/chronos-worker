import styles from "./styles.module.css";

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <a href="" title="Entenda a técnica">
          Entenda como funciona a técnica Pomodoro
        </a>
        <a href="" title="Entenda a técnica">
          Chronos Pomodoro &copy; {new Date().getFullYear()}
        </a>
      </footer>
    </>
  );
}
