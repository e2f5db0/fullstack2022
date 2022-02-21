import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';

import { NewPatientEntry, PatientEntry, PublicPatient } from '../types';
import toNewPatientEntry from '../utils';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(obj => {
        const object = toNewPatientEntry(obj) as PatientEntry;
        object.id = obj.id;
        return object;
    });
};

const getEntry = (id: string): PublicPatient | undefined => {
    const result = patients.filter(p => p.id === id)
    if (result.length > 0) {
        let patient = result[0];
        if (patient.entries) return patient;
        patient = {
            ...patient,
            entries: []
        }
        return patient;
    }
    return undefined
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
    getEntry,
    addEntry,
};