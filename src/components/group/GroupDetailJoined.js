import React from 'react'
import GroupService from '../../api/group'
import { myGroupLeaveAction } from '../../actions/group'
import GroupTabs from '../../components/group/GroupTabs'
import GroupActionTeacher from '../../components/group/GroupActionTeacher'
import GroupActionStudent from '../../components/group/GroupActionStudent'
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
        var groupAction;
        if (this.context.group.is_owner) {
            groupAction = <GroupActionTeacher />
        } else {
            groupAction = <GroupActionStudent />
        }
        return <div>
            <div>
                <h4 style={{float: 'left'}}>{this.context.group.title}</h4>
                <div style={{float: 'right'}}>
                    {groupAction}
                </div>
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
