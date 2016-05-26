import React from 'react'
import Group from './Group'

const GroupList = (props) => {
    const { groups, join, cancel } = props

    var renderGroup = []
    for (var id in groups) {
        renderGroup.push(
            <div style={{marginBottom: 30}} className="col-md-4" key={id}>
                <Group group={groups[id]} join={join} cancel={cancel} />
            </div>
        )
    }

    return (
        <div>
            {renderGroup}
            <div style={{clear:'both'}}></div>
        </div>
    )
}

export default GroupList
