import { useState } from "react";
import type { Action } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Search } from "react-bootstrap-icons";
import { fetchPeople, selectIsLoading } from "./state";
import type { RootState } from "../store";

export const SearchForm = () => {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [query, setQuery] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isLoading) dispatch(fetchPeople(query));
      }}
    >
      <InputGroup>
        <Form.Control
          value={query}
          onChange={(arg) => setQuery(arg.target.value)}
          placeholder="Who are you looking for?"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            <Search />
          )}
        </Button>
      </InputGroup>
    </Form>
  );
};
