import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import type { TaskActionModels } from "./taskActions";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModels>;
};

const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

// Cria um Contexto React global.
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
