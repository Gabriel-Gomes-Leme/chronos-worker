import styles from "./styles.module.css";

type InputProps = {
  type: "text" | "number" | "search";
  id: string;
  label?: string;
} & React.ComponentProps<"input">;

export function Input({ type, id, label, ...rest }: InputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder="Task"
        {...rest}
        defaultValue="Valor preenchido"
      />
    </>
  );
}
