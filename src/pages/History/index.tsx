import { ArrowDownUp, TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import style from "./style.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    },
  );
  useEffect(() => {
    setSortTaskOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        field: prevState.field,
        direction: prevState.direction,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);
  useEffect(() => {
    document.title = "Histórico - Chronos Pomodoro";
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";
    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field: field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm("Tem certeza?", (confirmation) =>
      setConfirmClearHistory(confirmation),
    );
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>History</span>
            {hasTasks && (
              <span className={style.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color="red"
                  aria-label="Apagar todo o histórico"
                  title="Apagar todo o histórico"
                  onClick={handleResetHistory}
                />
              </span>
            )}
          </Heading>
        </Container>
        <Container>
          {hasTasks && (
            <div className={style.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSortTasks({ field: "name" })}
                      className={style.thSort}
                    >
                      Tarefa <ArrowDownUp></ArrowDownUp>
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "duration" })}
                      className={style.thSort}
                    >
                      Duração <ArrowDownUp></ArrowDownUp>
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "startDate" })}
                      className={style.thSort}
                    >
                      Data <ArrowDownUp></ArrowDownUp>
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>

                <tbody>
                  {sortTasksOptions.tasks.map((task) => {
                    const taskTypeDictionary = {
                      workTime: "Foco",
                      shortBreakTime: "Descanso curto",
                      longBreakTime: "Descanso longo",
                    };
                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration}min</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!hasTasks && (
            <p className="text-center">Você não possui tarefas criadas</p>
          )}
        </Container>
      </MainTemplate>
    </>
  );
}
