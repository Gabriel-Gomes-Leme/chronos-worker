import { Container } from "./components/Container";
import { Heading } from "./components/Heading";
import { Logo } from "./components/Logo";

import "./styles/theme.css";
import "./styles/global.css";
import { Menu } from "./components/Menu";
import { CountDown } from "./components/CountDown";
import { Input } from "./components/Input";
import { Cycles } from "./components/Cycles";
import { DefaultButton } from "./components/DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Heading>Menu</Heading>
        <Menu></Menu>
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
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
      </Container>
      <Container>
        <Footer></Footer>
      </Container>
    </>
  );
}
