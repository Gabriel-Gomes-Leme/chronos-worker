import type { TaskModel } from "./TaskModel";

export type TaskStateModel = {
  tasks: TaskModel[]; // histórico, mainform
  secondsRemaining: number; // countdown, histórico, mainForm, Button
  formattedSecondsRemaining: string; // título da pagina, countDown
  activeTask: TaskModel | null;
  currentCycle: number; // Home
  config: {
    // precisa para iniciar uma nova task: mainForm
    workTime: number;
    longBreakTime: number;
    shortBreakTime: number;
  };
};
