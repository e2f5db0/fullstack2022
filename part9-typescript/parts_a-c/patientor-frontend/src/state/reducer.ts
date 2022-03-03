import { State } from "./state";
import { Diagnose, ExtendedEntry, Patient } from "../types";

export const setPatientList = (patientsList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientsList,
  };
};

export const setDiagnoses = (diagnoses: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const addEntry = (patient: Patient, newEntry: ExtendedEntry): Action => {
  const p = patient;
  p.entries.push(newEntry);
  return {
    type: "ADD_ENTRY",
    payload: p
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
    type: "ADD_ENTRY";
    payload: Patient;
  } | {
    type: "SET_PATIENT";
    payload: Patient;
  } | {
    type: "SET_DIAGNOSES";
    payload: Diagnose[];
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
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
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
      case "ADD_ENTRY":
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
