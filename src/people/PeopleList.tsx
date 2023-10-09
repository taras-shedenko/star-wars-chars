import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SearchForm } from "./SearchForm";
import { PersonCard } from "./PersonCard";
import { Footer } from "./Footer";
import { selectPeople } from "./state";

export const PeopleList = () => {
  const people = useSelector(selectPeople);

  return (
    <>
      <SearchForm />

      {people && (
        <Row>
          {people.map((person, idx) => (
            <Col xs={12} sm={6} lg={3}>
              <PersonCard key={idx} person={person} />
            </Col>
          ))}
        </Row>
      )}

      <Footer />
    </>
  );
};
