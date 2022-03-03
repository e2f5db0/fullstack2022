import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <div className='entry'>
            <p>{entry.date}<Icon className="fax icon"></Icon></p>
            <p>{entry.description}</p>
            <p>Employer: {entry.employerName}</p>
            <p>Diagnose by {entry.specialist}</p>
            <p>Entries</p>
            <ul>{entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}</ul>
            <p></p>
            <p>Sick leave {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
        </div>
    );
};

export default OccupationalHealthcare;