import type { Action } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import {
  fetchNext,
  fetchPrev,
  selectIsLoading,
  selectNextUrl,
  selectPrevUrl,
} from "./state";
import type { RootState } from "../store";

export const Footer = () => {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const nextUrl = useSelector(selectNextUrl);
  const prevUrl = useSelector(selectPrevUrl);

  return (
    <Row className="my-3">
      <Col className="d-flex justify-content-start">
        {prevUrl && (
          <Button onClick={() => dispatch(fetchPrev())} disabled={isLoading}>
            <ArrowLeft />
          </Button>
        )}
      </Col>

      <Col className="d-flex justify-content-end">
        {nextUrl && (
          <Button onClick={() => dispatch(fetchNext())} disabled={isLoading}>
            <ArrowRight />
          </Button>
        )}
      </Col>
    </Row>
  );
};
