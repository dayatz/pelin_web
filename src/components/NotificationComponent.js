import React from 'react'
import Snackbar from 'material-ui/lib/snackbar'
import Push from 'push.js'
import scriptLoader from 'react-async-script-loader'
import { addNotification } from '../actions/notification'


class NotificationComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snackbarOpen: false,
            snackbarMsg: ''
        }
    }
    initPusher() {
        const pusher = new Pusher("da45359a390da94367d7")
        const notification = pusher.subscribe(`${this.context.auth.user.id}`)

        var snackbarMsg
        notification.bind('new-notif', (data) => {
            if (!data.action_type) {
                snackbarMsg = `${data.actor.name} ${data.verb} di grup ${data.target.title}`
            } else if (data.action_type == 'post') {
                snackbarMsg = `${data.actor.name} ${data.verb} anda di grup ${data.target.title}`
            } else if (data.action_type == 'lesson') {
                snackbarMsg = `${data.actor.name} ${data.verb} ${data.action_object.title} di grup ${data.target.title}`
            } else if (data.action_type == 'assignment') {
                snackbarMsg = `${data.actor.name} ${data.verb} ${data.action_object.title} di grup ${data.target.title}`
            }

            if (!document.hidden) {
                this.context.store.dispatch(addNotification(data))
            } else {
                Push.create(`${data.actor.name}`, {
                    body: `${snackbarMsg}`,
                    icon: {
                        x32: '${data.actor.photo.thumbnail}'
                    }
                })
            }
            this.setState({ snackbarOpen: true, snackbarMsg })
        })
    }
    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed} = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.initPusher()
        }
    }
    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.initPusher()
            }
        }
    }

    handleAction(x) {
        this.setState({ snackbarOpen: false })
        alert(x)
    }
    render() {
        return (
            <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMsg}
                onRequestClose={() => {
                    this.setState({ snackbarOpen: false })
                }}
                action='Lihat'
                onActionTouchTap={() => {
                    this.handleAction(10)
                }}
                autoHideDuration={7000}
                />
        )
    }
}

NotificationComponent.contextTypes = {
    auth: React.PropTypes.object,
    store: React.PropTypes.object
}

export default scriptLoader('http://js.pusher.com/3.1/pusher.min.js')(NotificationComponent)
