import React from 'react'
import GroupService from '../../api/group'
import { myGroupLeaveAction } from '../../actions/group'
import GroupTabs from '../../components/group/GroupTabs'
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'


class GroupDetailJoined extends React.Component {
    leave() {
        if (confirm('Apakah anda yakin ingin keluar dari grup ?')) {
            GroupService.leave(this.context.groupId)
                .then(r => {
                    this.context.store.dispatch(myGroupLeaveAction(this.context.groupId))
                    this.context.router.replace('/')
                })
        }
    }
    render() {
        var buttonStatus;
        if (!this.context.group.is_owner) {
            buttonStatus = <RaisedButton onClick={this.leave.bind(this)} label='Leave' />
        }
        return <div>
            <div>
                <h4 style={{float: 'left'}}>{this.context.group.title}</h4>
                <div style={{float: 'right'}}>{buttonStatus}</div>
                <div style={{clear: 'both'}}></div>
            </div>
            <Paper style={{minHeight: 500}}>
                <div>
                    <GroupTabs location={this.props.location} />
                    {this.props.children}
                </div>
            </Paper>
        </div>
    }
}

GroupDetailJoined.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    router: React.PropTypes.object,
    store: React.PropTypes.object
}

export default GroupDetailJoined
