import React from 'react'
import GroupService from '../../api/group'
import { myGroupLeaveAction } from '../../actions/group'
import GroupTabs from '../../components/group/GroupTabs'
import Paper from 'material-ui/lib/paper'


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
        return <div>
            <h4>{this.context.group.title}</h4>
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
    router: React.PropTypes.object
}

export default GroupDetailJoined
