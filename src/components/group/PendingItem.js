import React from 'react';

const PendingItem = (props) => {

    return (
        <div>
            {props.pending.student.name}
            <button>o</button>
            <button>x</button>
        </div>
    )
}

export default PendingItem;
