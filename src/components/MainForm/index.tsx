import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { Input } from "../Input";
import React, { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name;

  // Cycles
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  console.log(nextCycle);

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn("Por favor, insira um nome para a tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      interruptDate: null,
      completeDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };
    // const secondsRemaining = newTask.duration * 60;

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success("Tarefa iniciada!");
  }
  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error("Tarefa interrompida");
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateTask} className="form" action="">
      <div className="form__row">
        <Input
          type="text"
          id="task"
          label="task"
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className="form__row">
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className="form__row">
          <Cycles />
        </div>
      )}
      {!state.activeTask && (
        <DefaultButton
          type="submit"
          icon={<PlayCircleIcon />}
          color="green"
          aria-label="Iniciar nova tarefa"
          title="Iniciar nova tarefa"
          key="botao_submit"
        />
      )}
      {!!state.activeTask && (
        <DefaultButton
          type="button"
          icon={<StopCircleIcon />}
          color="red"
          aria-label="Interromper nova tarefa"
          title="Interromper nova tarefa"
          onClick={handleInterruptTask}
          key="botao_interrupt"
        />
      )}
    </form>
  );
}
