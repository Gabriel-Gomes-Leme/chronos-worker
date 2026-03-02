import { useContext } from "react";
import { TaskContext } from "./TaskContext";

// Hook personalizado para acessar o contexto.
export function useTaskContext() {
  return useContext(TaskContext);
}
