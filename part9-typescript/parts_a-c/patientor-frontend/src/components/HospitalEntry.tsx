import React from 'react';
import { useStateValue } from '../state';
import { ExtendedEntry } from '../types';
import { Icon } from 'semantic-ui-react';

const HospitalEntry = ({ entry }: { entry: ExtendedEntry }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <div className='entry'>
            <p>{entry.date} <Icon className="hospital icon"></Icon></p>
            <p>{entry.description}</p>
            <ul>{entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}</ul>
            <p>Diagnose by {entry.specialist}</p>
        </div>
    );
};

export default HospitalEntry;
