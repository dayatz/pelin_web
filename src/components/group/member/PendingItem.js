import React from 'react'

const PendingItem = (props) => {
    return (
        <div>
            {props.pending.user.name}
            <button onClick={() => {
                props.approve(props.pending)
            }}>o</button>
            <button onClick={() => {
                props.decline(props.pending)
            }}>x</button>
        </div>
    )
}

export default PendingItem
