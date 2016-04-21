import React from 'react'
import { connect } from 'react-redux'

class AssignmentContainer extends React.Component {
    componentDidMount() {
        console.log('[AssignmentContainer] mounted');
    }
    render () {
        return <div>
            {this.props.children}
            {/*<span>AssignmentContainer</span>*/}
        </div>
    }
}

AssignmentContainer.contextTypes = {
    groupId: React.PropTypes.string
}

export default AssignmentContainer;
