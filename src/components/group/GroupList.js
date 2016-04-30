import React from 'react'
import Group from './Group'

const GroupList = (props) => {
    const { groups } = props;

    // var renderGroup = [];
    // for (var id in groups) {
    //     renderGroup.push(
    //         <div style={{marginBottom: 30}} className="col-md-6" key={id}>
    //             <Group group={groups[id]} />
    //         </div>
    //     )
    // }

    const renderGroup = groups.map(group => {
        return (
            <div style={{marginBottom: 30}} className="col-md-6" key={group.id}>
                <Group group={group} />
            </div>
        )
    })

    return (
        <div>{renderGroup}</div>
    )
}

export default GroupList
