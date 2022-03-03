import React, { createContext, useContext, useReducer } from "react";
import { Diagnose, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
  diagnoses: { [code: string]: Diagnose };
};

const initialState: State = {
  patients: {},
  patient: {
    "id": "null",
    "name": "null",
    "dateOfBirth": "null",
    "ssn": "null",
    "gender": "null",
    "occupation": "null",
    "entries": [
      {
        "id": "null",
        "date": "null",
        "type": "Hospital",
        "specialist": "null",
        "diagnosisCodes": [
          "null"
        ],
        "description": "null",
            "discharge": {
                "date": "null",
                "criteria": "null"
            }
      }
    ],
  },
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
