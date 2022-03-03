import React from 'react';
import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';
import { Icon } from 'semantic-ui-react';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <div className='entry'>
            <p>{entry.date} <Icon className="heart icon"></Icon></p>
            <p>{entry.description}</p>
            <ul>{entry.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d].name}</li>)}</ul>
            <p>Diagnose by {entry.specialist}</p>
            {entry.healthCheckRating && <p>Health check rating: {entry.healthCheckRating}</p>}
        </div>
    );
};

export default HealthCheck;
