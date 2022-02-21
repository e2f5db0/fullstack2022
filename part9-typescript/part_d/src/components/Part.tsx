import React from 'react'
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
    let element = <div></div>;
    switch (part.type) {
        case "normal":
            element = <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>{part.description}</p>
            </div>
            break;
        case "groupProject":
            element = <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>project exercises {part.groupProjectCount}</p>
            </div>
            break;
        case "submission":
            element = <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>{part.description}</p>
                <p>{part.exerciseSubmissionLink}</p>
            </div>
            break;
        case "special":
            element = <div>
                <p><b>{part.name} {part.exerciseCount}</b></p>
                <p>{part.description}</p>
                <p>{part.requirements}</p>
            </div>
            break;
        default:
            return assertNever(part);
    }
    return element
}

export default Part
