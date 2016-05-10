import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions/user'
// import UserDetailShow from '../../components/user/UserDetailShow'

class UserDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: null,
            userId: null
        }
    }
    componentDidMount() {
        this.props.fetchUser(this.props.params.userId)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.userId != this.props.params.userId) {
            this.props.fetchUser(nextProps.params.userId)
        }
    }
    render() {
        const user = this.props.user.items[this.props.params.userId]

        if (user) {
            var renderUser = <span>{user.name}</span>
            // var renderUser = <UserDetailShow user={this.state.user} />
        } else if (!user || this.props.user.isLoading) {
            var renderUser = 'Loading...'
        }
        return (
            <div>{renderUser}</div>
        )
    }
}

const stateToProps = state => ({
    user: state.user
})

const dispatchToProps = dispatch => ({
    fetchUser: (userId) => {
        dispatch(fetchUser(userId))
    }
})

export default connect(stateToProps, dispatchToProps)(UserDetail)
