import React from 'react'
import { connect } from 'react-redux'

import MyProfileForm from '../../components/user/MyProfileForm'
import { updateProfile } from '../../actions/auth'

class MyProfile extends React.Component {
    componentDidMount() {
        this.context.setPageTitle('Edit Profil')
    }
    render() {
        return (
            <MyProfileForm user={this.props.user} />
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

MyProfile.contextTypes = {
    setPageTitle: React.PropTypes.func
}

export default connect(stateToProps, dispatchToProps)(MyProfile)
