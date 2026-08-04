import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { MainTemplate } from "../../templates/MainTemplate";
import { DefaultButton } from "../../components/DefaultButton";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settingss() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push("Digite apenas números para TODOS os campos");
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push("Digite valores entre 1 e 99 para foco");
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push("Digite valores entre 1 e 30 para descanso curto");
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push("Digite valores entre 1 e 60 para descanso longo");
    }
    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success("Configurações salvas com sucesso!");
  }
  useEffect(() => {
    document.title = "Histórico - Chronos Pomodoro";
  }, []);

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>Configurações</Heading>
        </Container>
        <Container>
          <p className="text-center">
            Modifique as configurações para tempo de foco, descanso curto e
            descanso longo
          </p>
        </Container>
        <Container>
          <form onSubmit={handleSaveSettings} action="" className="form">
            <div className="form__row">
              <Input
                type="number"
                id="workTime"
                label="Foco"
                ref={workTimeInput}
                defaultValue={state.config.workTime}
              />
            </div>
            <div className="form__row">
              <Input
                type="number"
                id="shortBreakTime"
                label="Descanso curto"
                ref={shortBreakTimeInput}
                defaultValue={state.config.shortBreakTime}
              />
            </div>
            <div className="form__row">
              <Input
                type="number"
                id="longBreakTime"
                label="Descanso longo"
                ref={longBreakTimeInput}
                defaultValue={state.config.longBreakTime}
              />
            </div>
            <div className="form__row">
              <DefaultButton
                icon={<SaveIcon />}
                aria-label="Salvar configurações"
                title="Salvar configurações"
              />
            </div>
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}
