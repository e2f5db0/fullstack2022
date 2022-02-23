import { State } from "./state";
import { Patient } from "../types";

export const setPatientList = (patientsList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientsList,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const setPatientState = (patientData: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patientData
  };
};

export type Action =
  {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  } | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "SET_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: {
          ...action.payload
        },
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
