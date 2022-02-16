import { Gender, NewPatientEntry } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, gender, occupation, ssn }: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        ssn: parseString(ssn)
    }
    return newEntry;
}

const parseString = (str: unknown): string => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing fields');
    }
    return str;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

export default toNewPatientEntry;