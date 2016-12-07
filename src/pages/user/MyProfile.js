import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'

import MyProfileForm from '../../components/user/MyProfileForm'
import { updateProfile } from '../../actions/auth'

class MyProfile extends React.Component {
    componentDidMount() {
        this.context.setPageTitle('Edit Profil')
    }
    render() {
        return (
            <Paper className='paper' style={{padding: 30}}>
                <div className='col-md-6 col-md-offset-3'>
                    <MyProfileForm user={this.props.user} />
                </div>
                <div style={{clear:'both'}}></div>
            </Paper>
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
