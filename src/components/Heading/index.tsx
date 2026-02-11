import styles from "./styles.module.css";

type HeadingProps = {
  children: React.ReactNode;
};

export function Heading(props: HeadingProps) {
  const { children } = props;
  console.log(props);
  return <h1 className={`${styles.heading} ${styles.light}`}>{children}</h1>;
}
