import React from 'react'

class UserDetail extends React.Component {
    render() {
        let userId = this.props.params.userId

        return (
            <div>user detail: {userId}</div>
        )
    }
}

export default UserDetail
