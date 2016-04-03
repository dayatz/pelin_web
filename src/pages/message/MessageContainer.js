import React from 'react'

class MessageContainer extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default MessageContainer
