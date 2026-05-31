import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos</span>,
    shortBreakTime: (
      <span>descanse por {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: (
      <span>
        O próximo descanso será longo: {state.config.longBreakTime} minutos
      </span>
    ),
  };
  const tipsForNoActiveTask = {
    workTime: <span>O próximo ciclo é de {state.config.workTime} minutos</span>,
    shortBreakTime: (
      <span>O próximo descanso é de {state.config.shortBreakTime} minutos</span>
    ),
    longBreakTime: (
      <span>
        O próximo descanso longo será de: {state.config.longBreakTime} minutos
      </span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
