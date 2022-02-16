import React from 'react'

interface part {
    exerciseCount: number
}

const Total = ({ courseParts }: { courseParts: Array<part> }): JSX.Element => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
}

export default Total
