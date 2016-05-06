import React from 'react'

class AssignmentInfo extends React.Component {
    render() {
        const { assignment } = this.props
        return (
        <div>
                <p>{assignment.title}</p>
                <p>{assignment.description}</p>
                <p>{assignment.due_date}</p>
                <hr />
        </div>
        )
    }
}

export default AssignmentInfo
