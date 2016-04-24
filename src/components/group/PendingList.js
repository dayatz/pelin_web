import React from 'react';
import PendingItem from './PendingItem'

const PendingList = (props) => {
    const renderPending = props.pendings.map(pending => {
        return (
            <div key={pending.id}>
                <PendingItem pending={pending} />
            </div>
        )
    })
    return (
        <div>{renderPending}</div>
    )
}

export default PendingList;
