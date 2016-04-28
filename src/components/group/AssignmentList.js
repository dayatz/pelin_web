import React from 'react'
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

        return (
            <div>
                <div>{renderAssignment}</div>
            </div>
        )
    }
}

AssignmentList.contextTypes = {
    groupId: React.PropTypes.string
}

export default AssignmentList
