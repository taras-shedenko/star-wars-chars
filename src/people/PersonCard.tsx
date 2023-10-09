import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { type PersonInfo } from "../common/types";

interface PersonCardProps {
  person: PersonInfo;
}

export const PersonCard = ({ person }: PersonCardProps) => (
  <Card className="mt-3 cursor-pointer">
    <Card.Header>{person.name}</Card.Header>
    <ListGroup>
      <ListGroup.Item>{`Gender: ${person.gender}`}</ListGroup.Item>
      <ListGroup.Item>{`Height: ${person.height}`}</ListGroup.Item>
      <ListGroup.Item>{`Mass: ${person.mass}`}</ListGroup.Item>
      <ListGroup.Item>{`Skin Color: ${person.skin_color}`}</ListGroup.Item>
      <ListGroup.Item>{`Hair Color: ${person.hair_color}`}</ListGroup.Item>
      <ListGroup.Item>{`Eye Color: ${person.eye_color}`}</ListGroup.Item>
      <ListGroup.Item>{`Birth Year: ${person.birth_year}`}</ListGroup.Item>
    </ListGroup>
  </Card>
);
