import React from 'react';

const PendingItem = (props) => {
    return (
        <div>
            {props.pending.student.name}
            <button onClick={() => {
                props.approve(props.pending.id)
            }}>o</button>
            <button onClick={() => {
                props.decline(props.pending.id)
            }}>x</button>
        </div>
    )
}

export default PendingItem;
