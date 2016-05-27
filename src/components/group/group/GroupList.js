import React from 'react'
import Group from './Group'
import GroupService from '../../../api/group'

const GroupList = (props) => {
    const { groups } = props

    const join = (groupId) => {
        GroupService.join(groupId)
            .then(r => {
                console.log(r)
            })
    }
    const cancel = (groupId) => {
        GroupService.cancel(groupId)
            .then(r => {
                console.log(r)
            })
    }

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
