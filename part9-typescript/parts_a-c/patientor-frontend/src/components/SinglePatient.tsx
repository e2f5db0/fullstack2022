import React from 'react';
import { Icon } from 'semantic-ui-react';

import { useStateValue } from "../state";
import { ExtendedEntry } from '../types';
import HealthCheck from './HealthCheck';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const SinglePatient = () => {
    const [{ patient }] = useStateValue();
    return (
        <div>
            <h1>{patient?.name}{patient?.gender === 'male' &&
                <Icon className="mars icon"></Icon>}{patient?.gender === 'female' &&
                    <Icon className="venus icon"></Icon>}</h1>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h2>entries</h2>
            <ul>
                {patient?.entries.map(e => entryDetails(e))}
            </ul>
        </div>
    );
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const entryDetails = (entry: ExtendedEntry) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        default: assertNever(entry);
    }
};

export default SinglePatient;
