import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
import { ExtendedEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.post('/', (_req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(_req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (_req, res) => {
    const id = _req.params['id'];
    const patient = patientService.getEntry(id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(404)
    }
});

router.post('/:id/entries', (_req, res) => {
    const id = _req.params['id'];
    const patient = patientService.getEntry(id);
    if (!patient) {
        res.status(404)
    } else {
        try {
            const entry = _req.body
            patient.entries?.push(typeGuard(entry))
            res.send(entry)
        } catch (error) {
            console.error(error)
            res.send(`error occured: ${error}`)
        }
    }
})

const typeGuard = (entry: ExtendedEntry): ExtendedEntry => entry;

export default router;