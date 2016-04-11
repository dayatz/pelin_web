import React from 'react'
import Group from './Group'

const GroupList = (props) => {
    const renderGroup = props.groups.map(g => {
        return (
            <div className="col-md-6">
                <Group group={g} key={g.id} />
            </div>
        )
    })

    return (
        <div>{renderGroup}</div>
    )
}

export default GroupList
