import React from 'react'
import { connect } from 'react-redux'

import { updateProfile } from '../../actions/auth'

class MyProfile extends React.Component {
    render() {
        return (
            <div>my profile</div>
        )
    }
}

const stateToProps = state => ({
    user: state.auth.user
})

const dispatchToProps = dispatch => ({
    updateProfile: (data) => {
        dispatch(updateProfile(data))
    }
})

export default connect(stateToProps, dispatchToProps)(MyProfile)
