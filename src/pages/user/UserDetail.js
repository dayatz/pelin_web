import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions/user'
import UserDetailProfile from '../../components/user/UserDetailProfile.js'


class UserDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            userId: this.props.params.userId
        }
    }

    componentDidMount() {
        const user = this.props.user.items[this.props.params.userId]
        if (!user) this.props.fetchUser(this.props.params.userId)
        if (user) this.context.setPageTitle(user.name)
    }
    componentWillReceiveProps(nextProps) {
        const user = this.props.user.items[this.props.params.userId]
        if (nextProps.params.userId != this.props.params.userId) {
            this.props.fetchUser(nextProps.params.userId)
        }
        if (user) {
            this.context.setPageTitle(user.name)
        }
    }
    render() {
        const user = this.props.user.items[this.props.params.userId]

        if (user) {
            var renderUser = <UserDetailProfile user={user} userId={this.props.params.userId} />
        } else if (!user || this.props.user.isLoading) {
            var renderUser = 'Loading...'
        }
        return (
            <div>{renderUser}</div>
        )
    }
}

UserDetail.contextTypes = {
    setPageTitle: React.PropTypes.func
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
