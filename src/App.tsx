import "./styles/theme.css";
import "./styles/global.css";
import { Heading } from "./components/Heading";
export function App() {
  return (
    <>
      <Heading />
      <Heading attr={123} attr2="String">
        Olá mundoooooooooooooooooooooo
      </Heading>
      <Heading>Foul tanished, In the search, of elden ring</Heading>
      <h2>Bem vindo ao meu app</h2>
    </>
  );
}
