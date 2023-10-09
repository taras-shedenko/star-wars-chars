import type { Action, Reducer } from "redux";
import type { ThunkAction } from "redux-thunk";
import { fetchJson, fetchPeople as fetchPeopleApi } from "../common/rest";
import type { PersonInfo } from "../common/types";
import type { RootState } from "../store";

const PEOPLE_FETCH_REQUEST = "people/fetch_request";
const PEOPLE_FETCH_SUCCESS = "people/fetch_success";
const PEOPLE_FETCH_FAILURE = "people/fetch_failure";

type PeopleFetchRequestAction = Action<typeof PEOPLE_FETCH_REQUEST>;

type PeopleFetchSuccessAction = Action<typeof PEOPLE_FETCH_SUCCESS> & {
  payload: {
    people: PersonInfo[];
    nextUrl: string | null;
    prevUrl: string | null;
  };
};

type PeopleFetchFailureAction = Action<typeof PEOPLE_FETCH_FAILURE> & {
  payload: string;
};

type PeopleFetchAction =
  | PeopleFetchRequestAction
  | PeopleFetchSuccessAction
  | PeopleFetchFailureAction;

export interface PeopleState {
  list: PersonInfo[] | null;
  nextUrl: string | null;
  prevUrl: string | null;
  status: string;
  error: string | null;
}

const initialPeopleState: PeopleState = {
  list: null,
  nextUrl: null,
  prevUrl: null,
  status: "",
  error: null,
};

export const peopleReducer: Reducer<PeopleState, PeopleFetchAction> = (
  state = initialPeopleState,
  action
) => {
  switch (action.type) {
    case PEOPLE_FETCH_REQUEST:
      return {
        ...state,
        status: "REQUEST",
        error: null,
      };
    case PEOPLE_FETCH_SUCCESS:
      return {
        ...state,
        list: action.payload.people,
        nextUrl: action.payload.nextUrl,
        prevUrl: action.payload.prevUrl,
        status: "SUCCESS",
      };
    case PEOPLE_FETCH_FAILURE:
      return {
        ...state,
        status: "FAILURE",
        list: null,
        nextUrl: null,
        prevUrl: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const peopleFetchRequest = (): PeopleFetchRequestAction => ({
  type: PEOPLE_FETCH_REQUEST,
});

const peopleFetchSuccess = (
  people: PersonInfo[],
  nextUrl: string | null,
  prevUrl: string | null
): PeopleFetchSuccessAction => ({
  type: PEOPLE_FETCH_SUCCESS,
  payload: { people, nextUrl, prevUrl },
});

const peopleFetchFailure = (error: string): PeopleFetchFailureAction => ({
  type: PEOPLE_FETCH_FAILURE,
  payload: error,
});

export const fetchPeople =
  (query: string): ThunkAction<void, RootState, unknown, PeopleFetchAction> =>
  async (dispatch) => {
    dispatch(peopleFetchRequest());

    try {
      const res = await fetchPeopleApi(query);
      dispatch(peopleFetchSuccess(res.results, res.next, res.previous));
    } catch (e) {
      dispatch(peopleFetchFailure(String(e)));
    }
  };

export const fetchNext =
  (): ThunkAction<void, RootState, unknown, PeopleFetchAction> =>
  async (dispatch, getState) => {
    const nextUrl = selectNextUrl(getState());

    if (nextUrl) {
      dispatch(peopleFetchRequest());

      try {
        const res = await fetchJson(nextUrl);
        dispatch(peopleFetchSuccess(res.results, res.next, res.previous));
      } catch (e) {
        dispatch(peopleFetchFailure(String(e)));
      }
    }
  };

export const fetchPrev =
  (): ThunkAction<void, RootState, unknown, PeopleFetchAction> =>
  async (dispatch, getState) => {
    const prevUrl = selectPrevUrl(getState());

    if (prevUrl) {
      dispatch(peopleFetchRequest());

      try {
        const res = await fetchJson(prevUrl);
        dispatch(peopleFetchSuccess(res.results, res.next, res.previous));
      } catch (e) {
        dispatch(peopleFetchFailure(String(e)));
      }
    }
  };

export const selectPeople = (state: RootState) => state.people.list;

export const selectIsLoading = (state: RootState) =>
  state.people.status === "REQUEST";

export const selectNextUrl = (state: RootState) => state.people.nextUrl;

export const selectPrevUrl = (state: RootState) => state.people.prevUrl;
