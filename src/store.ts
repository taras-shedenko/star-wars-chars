import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { type PeopleState, peopleReducer } from "./people";

export interface RootState {
  people: PeopleState;
}

const rootReducer = combineReducers<RootState>({ people: peopleReducer });

const storeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, storeEnhancer);
