import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { ExtendedEntry } from '../types';

const OccupationalHealthcareEntry = ({ entry }: { entry: ExtendedEntry }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <div className='entry'>
            <p>{entry.date}<Icon className="fax icon"></Icon></p>
            <p>{entry.description}</p>
            <ul>{entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}</ul>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default OccupationalHealthcareEntry;
