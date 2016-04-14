import React from 'react'
import Group from './Group'

const GroupList = (props) => {
    const renderGroup = props.groups.map(group => {
        return (
            <div className="col-md-6" key={group.id}>
                <Group group={group} />
            </div>
        )
    })

    return (
        <div>{renderGroup}</div>
    )
}

export default GroupList
