import React from 'react'
import scriptLoader from 'react-async-script-loader'


class Notification extends React.Component {
    initPusher() {
        const pusher = new Pusher("da45359a390da94367d7")
        const notification = pusher.subscribe(`${this.context.auth.user.id}`)
        notification.bind('new-notif', (data) => {
            console.log(data)
            this.context.showSnackbar(`${data.actor.name} ${data.verb} pada ${data.target.title}`)
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
    render() {
        return false
    }
}

Notification.contextTypes = {
    showSnackbar: React.PropTypes.func,
    auth: React.PropTypes.object
}

export default scriptLoader('http://js.pusher.com/3.1/pusher.min.js')(Notification)
