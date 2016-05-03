import React from 'react'

class AssignmentContainer extends React.Component {
    render () {
        return <div>
            {this.props.children}
        </div>
    }
}

AssignmentContainer.contextTypes = {
    groupId: React.PropTypes.string
}

export default AssignmentContainer;
