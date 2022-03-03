import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { Button } from "semantic-ui-react";

import { useStateValue, addEntry, setPatientState } from "../state";

import { ExtendedEntry, Patient } from '../types';

import { EntryFormValues } from '../AddEntryModal/AddEntryFormOccupational';
import AddEntryModalOccupational from '../AddEntryModal/AddEntryModalOccupational';
import AddEntryModalHospital from '../AddEntryModal/AddEntryModalHospital';

import HospitalEntry from './HospitalEntry';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';

import { apiBaseUrl } from "../constants";
import AddEntryModalHealthCheck from '../AddEntryModal/AddEntryModalHealthCheck';

const SinglePatient = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();
    const [modalOpen1, setModalOpen1] = React.useState<boolean>(false);
    const [modalOpen2, setModalOpen2] = React.useState<boolean>(false);
    const [modalOpen3, setModalOpen3] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    React.useEffect(() => {
        try {
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
                .then((res) => {
                    dispatch(setPatientState(res.data));
                })
                .catch((e) => console.error(e));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, id]);

    const openModal1 = (): void => setModalOpen1(true);
    const openModal2 = (): void => setModalOpen2(true);
    const openModal3 = (): void => setModalOpen3(true);

    const closeModal1 = (): void => {
        setModalOpen1(false);
        setError(undefined);
    };
    const closeModal2 = (): void => {
        setModalOpen2(false);
        setError(undefined);
    };
    const closeModal3 = (): void => {
        setModalOpen3(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<ExtendedEntry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(patient, newEntry));
            closeModal1();
        } catch (e) {
            // do nothing
        }
    };

    return (
        <div>
            <h1>{patient?.name}{patient?.gender === 'male' &&
                <Icon className="mars icon"></Icon>}{patient?.gender === 'female' &&
                    <Icon className="venus icon"></Icon>}</h1>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h2>entries</h2>
            <ul>
                {patient?.entries.map(e => {
                    switch (e.type) {
                        case "Hospital":
                            return <HospitalEntry key={e.id} entry={e} />;
                        case "OccupationalHealthcare":
                            return <OccupationalHealthcare key={e.id} entry={e} />;
                        case "HealthCheck":
                            return <HealthCheck key={e.id} entry={e} />;
                        default: assertNever(e);
                    }
                })}
            </ul>
            <AddEntryModalOccupational
                modalOpen={modalOpen1}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal1}
            />
            <Button onClick={() => openModal1()}>New Occupational Entry</Button>
            <AddEntryModalHospital
                modalOpen={modalOpen2}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal2}
            />
            <Button onClick={() => openModal2()}>New Hospital Entry</Button>
            <AddEntryModalHealthCheck
                modalOpen={modalOpen3}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal3}
            />
            <Button onClick={() => openModal3()}>New Health Check Entry</Button>
        </div>
    );
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default SinglePatient;
