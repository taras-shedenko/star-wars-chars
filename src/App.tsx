import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { PeopleList } from "./people";

export const App = () => {
  return (
    <Container fluid="xl">
      <Navbar>
        <Navbar.Brand>Star Wars Character Explorer</Navbar.Brand>
      </Navbar>
      <PeopleList />
    </Container>
  );
};
