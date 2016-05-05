import React from 'react'
import Group from './Group'

const GroupList = (props) => {
    const { groups } = props

    var renderGroup = []
    for (var id in groups) {
        renderGroup.push(
            <div style={{marginBottom: 30}} className="col-md-6" key={id}>
                <Group group={groups[id]} />
            </div>
        )
    }

    return (
        <div>{renderGroup}</div>
    )
}

export default GroupList
