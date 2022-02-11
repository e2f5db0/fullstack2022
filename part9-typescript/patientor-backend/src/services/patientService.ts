import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';

import { NewPatientEntry, PatientEntry } from '../types';
import toNewPatientEntry from '../utils';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(obj => {
        const object = toNewPatientEntry(obj) as PatientEntry;
        object.id = obj.id;
        return object;
    });
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry
    }
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry
};