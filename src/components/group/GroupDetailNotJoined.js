import React from 'react'
import GroupService from '../../api/group'
import RaisedButton from 'material-ui/lib/raised-button'

class GroupDetailNotJoined extends React.Component {    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pending: null
        }
    }
    componentDidMount() {
        this.setState({ pending: this.context.group.is_pending })
    }
    join() {
        GroupService.join(this.context.groupId)
            .then(r => {
                this.setState({ loading: false })
            })
    }
    cancel() {
        GroupService.cancel(this.context.groupId)
            .then(r => {
                this.setState({ loading: false })
            })
    }
    toggleJoin() {
        this.setState({ pending: !this.state.pending })
        if (this.state.pending) {
            this.cancel()
        } else {
            this.join()
        }
    }
    render() {
        const btnLabel = () => {
            return this.state.pending ? 'Batal' : 'Gabung'
        }
        return <div>
            <div>
                <h3>{this.context.group.title}</h3>
                <p>{this.context.group.description}</p>
            </div>
            <RaisedButton
                disabled={this.state.loading}
                label={btnLabel()}
                onClick={this.toggleJoin.bind(this)} />
        </div>
    }
}

GroupDetailNotJoined.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default GroupDetailNotJoined
