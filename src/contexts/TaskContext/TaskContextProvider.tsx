import { useEffect, useReducer, useState } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "./initialTaskState";

type TaskContextProviderProps = {
  children: React.ReactNode;
};
// Ele é o "fornecedor" do contexto.
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialTaskState);

  type ActionType = {
    type: string;
    payLoad?: number;
  };

  const [myState, dispatch] = useReducer(
    (state, action: ActionType) => {
      console.log(state, action);
      switch (action.type) {
        case "INCREMENT": {
          if (!action.payLoad) return state;
          return {
            ...state,
            secondsRemaining: state.secondsRemaining + action.payLoad,
          };
        }
        case "DECREMENT": {
          if (!action.payLoad) return state;
          return {
            ...state,
            secondsRemaining: state.secondsRemaining - action.payLoad,
          };
        }
        case "RESET": {
          return {
            ...state,
            secondsRemaining: 0,
          };
        }
      }

      return state;
    },
    {
      secondsRemaining: 0,
    },
  );

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      <h2>o estado é {myState.secondsRemaining}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT", payLoad: 10 })}>
        incrementa 10
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", payLoad: 20 })}>
        decrementa 20
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>zerar</button>
    </TaskContext.Provider>
  );
}
