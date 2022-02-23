import React from 'react';
import { Icon } from 'semantic-ui-react';

import { useStateValue } from "../state";

const SinglePatient = () => {
    const [{ patient }] = useStateValue();
    return (
        <div>
            <h1>{patient?.name}{patient?.gender === 'male' &&
                <Icon className="mars icon"></Icon>}{patient?.gender === 'female' &&
                    <Icon className="venus icon"></Icon>}</h1>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
        </div>
    );
};

export default SinglePatient;
