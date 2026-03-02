import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { Input } from "../Input";

export function MainForm() {
  return (
    <form className="form" action="">
      <div className="form__row">
        <Input type="text" id="task" label="task" />
      </div>
      <div className="form__row">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="form__row">
        <Cycles />
      </div>
      <DefaultButton icon={<PlayCircleIcon />} color="green" />
      <DefaultButton icon={<StopCircleIcon />} color="red" />
    </form>
  );
}
