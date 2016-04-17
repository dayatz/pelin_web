import React from 'react'

const Assignment = (props) => {
    console.log('[Assignment] rendering');
    return (
        <div>
            <span>{props.assignment.title}</span>
        </div>
    )
}

export default Assignment
