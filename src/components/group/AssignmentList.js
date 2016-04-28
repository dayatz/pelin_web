import React from 'react'
import FabAdd from '../../components/FabAdd'
import Assignment from './Assignment'

class AssignmentList extends React.Component {
    render() {
        const renderAssignment = this.props.assignments.map(a => {
            return (
                <div key={a.id}>
                    <Assignment assignment={a} />
                </div>
            )
        })

        var renderAddButton;
        if (this.context.group.is_owner) {
            renderAddButton = (
                <FabAdd onClick={() => { console.log('add') }} />
            )
        }

        return (
            <div>
                <div>{renderAddButton}</div>
                <div>{renderAssignment}</div>
            </div>
        )
    }
}

AssignmentList.contextTypes = {
    group: React.PropTypes.object,
    router: React.PropTypes.object
}

export default AssignmentList
