import React from 'react'
import Snackbar from 'material-ui/lib/snackbar'
import Push from 'push.js'
import scriptLoader from 'react-async-script-loader'
import { addNotification } from '../actions/notification'
import { BASE_URL, materialLetter } from '../config/'


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
            console.log(data)
            if (!data.action_type) {
                snackbarMsg = `${data.actor.name} ${data.verb} di grup ${data.target.title}`
            } else if (data.action_type == 'post') {
                snackbarMsg = `${data.actor.name} ${data.verb} anda di grup ${data.target.title}`
            } else if (data.action_type == 'lesson') {
                snackbarMsg = `${data.actor.name} ${data.verb} ${data.action_object.title} di grup ${data.target.title}`
            } else if (data.action_type == 'assignment') {
                this.context.fetchAssignmentCount()
                snackbarMsg = `${data.actor.name} ${data.verb} ${data.action_object.title} di grup ${data.target.title}`
            }

            if (document.hidden) {
                var photo32
                var photo64
                if (data.actor.photo.hasOwnProperty('thumbnail')) {
                    photo32 = BASE_URL + `${data.actor.photo.small}`
                    photo64 = BASE_URL + `${data.actor.photo.thumbnail}`
                } else {
                    photo32 = materialLetter(data.actor.name.charAt(0))
                    photo64 = materialLetter(data.actor.name.charAt(0))
                }
                Push.create(`${data.actor.name}`, {
                    body: `${snackbarMsg}`,
                    icon: {
                        x32: photo32,
                        x64: photo64
                    }
                })
            }
            this.context.store.dispatch(addNotification(data))
            this.setState({ snackbarOpen: true, snackbarMsg })
            this.context.markNotifBadge()
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
    store: React.PropTypes.object,
    markNotifBadge: React.PropTypes.func,
    fetchAssignmentCount: React.PropTypes.func
}

export default scriptLoader('http://js.pusher.com/3.1/pusher.min.js')(NotificationComponent)
