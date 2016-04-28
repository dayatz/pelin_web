import React from 'react'
import FabAdd from '../../components/FabAdd'
import Assignment from './Assignment'

class AssignmentList extends React.Component {
    render() {
        var renderAssignment = this.props.assignments.map(a => {
            return (
                <div key={a.id}>
                    <Assignment assignment={a} />
                </div>
            )
        })

        var renderAddButton;
        if (this.context.group.is_owner) {
            renderAddButton = (
                <FabAdd onClick={() => {
                    this.context.router.replace(
                        `/groups/${this.context.groupId}/assignments/add`
                        )
                }} />
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
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default AssignmentList
