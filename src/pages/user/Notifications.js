import React from 'react'
import { connect } from 'react-redux'
import { fetchNotification } from '../../actions/notification'

class Notifications extends React.Component {
    componentDidMount() {
        this.props.fetchNotification()
    }
    render() {
        const notification = this.props.notification
        var renderItems
        if (notification.isLoading && !notification.items.length) {
            renderItems = 'Loading'
        } else if (!notification.isLoading && notification.items.length) {
            renderItems = 'got notifications'
        } else if (notification.isError) {
            renderItems = 'notif error'
        }
        return (
            <div>{renderItems}</div>
        )
    }
}

const stateToProps = state => ({
    notification: state.notification
})

const dispatchToProps = dispatch => ({
    fetchNotification: () => {
        dispatch(fetchNotification())
    }
})

export default connect(stateToProps, dispatchToProps)(Notifications)
