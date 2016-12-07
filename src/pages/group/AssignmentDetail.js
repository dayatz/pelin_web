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
            <div className='col-md-6 col-md-offset-3'>
                <AssignmentInfo assignment={this.context.assignment} />
                {renderAssignmentUser}
            </div>
            <div style={{clear: 'both'}}></div>
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
