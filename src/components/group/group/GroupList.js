import React from 'react'
import Group from './Group'
import GroupService from '../../../api/group'

export default function GroupList(props) {

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
    for (var id in props.groups) {
        renderGroup.push(
            <div style={{marginBottom: 30}} className="col-md-4" key={id}>
                <Group group={props.groups[id]} join={join} cancel={cancel} />
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