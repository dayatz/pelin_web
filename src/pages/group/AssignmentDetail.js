import React from 'react'
import AssignmentInfo from '../../components/group/assignment/AssignmentInfo'
import AssignmentDetailStudent from '../../components/group/assignment/AssignmentDetailStudent'
import AssignmentDetailTeacher from '../../components/group/assignment/AssignmentDetailTeacher'


class AssignmentDetail extends React.Component {
    render () {
        var renderAssignmentUser
        if (this.context.group.is_owner) {
            renderAssignmentUser = <AssignmentDetailTeacher />
        } else {
            renderAssignmentUser = <AssignmentDetailStudent />
        }

        return (
            <div>
                <AssignmentInfo assignment={this.context.assignment} />
                {renderAssignmentUser}
            </div>
        )
    }
}

AssignmentDetail.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    assignment: React.PropTypes.object
}

export default AssignmentDetail
