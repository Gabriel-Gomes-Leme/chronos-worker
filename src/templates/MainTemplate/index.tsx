import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Heading } from "../../components/Heading";
import { Logo } from "../../components/Logo";
import { Menu } from "../../components/Menu";

type MainTemplateProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Heading>Menu</Heading>
        <Menu></Menu>
      </Container>
      {children}
      <Container>
        <Footer></Footer>
      </Container>
    </>
  );
}
