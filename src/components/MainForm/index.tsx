import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { Input } from "../Input";
import React, { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  // Cycles
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  console.log(nextCycle);

  function handleInterruptTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: prevState.tasks.map((task) => {
          if (prevState.activeTask && task.id === prevState.activeTask.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    });
  }

  function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert("Please enter a task name");
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
    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle, //conferir,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
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
        />
      </div>
      <div className="form__row">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
