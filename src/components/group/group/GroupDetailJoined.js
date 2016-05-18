import React from 'react'
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'

import GroupTabs from './GroupTabs'
import GroupActionTeacher from './GroupActionTeacher'
import GroupActionStudent from './GroupActionStudent'
import GroupModal from './GroupModal'

import GroupService from '../../../api/group'
import { myGroupLeaveAction } from '../../../actions/group'


class GroupDetailJoined extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openEditModal: false
        }
    }
    leave() {
        if (confirm('Apakah anda yakin ingin keluar dari grup ?')) {
            GroupService.leave(this.context.groupId)
                .then(r => {
                    this.context.store.dispatch(myGroupLeaveAction(this.context.groupId))
                    this.context.router.replace('/')
                })
        }
    }

    _toggleEditModal() {
        this.setState({ openEditModal: !this.state.openEditModal })
    }
    render() {
        var groupAction
        if (this.context.group.is_owner) {
            groupAction = (
            <div>
                <GroupModal
                    toggleModal={this._toggleEditModal.bind(this)}
                    open={this.state.openEditModal} />
                <GroupActionTeacher
                    toggleModal={this._toggleEditModal.bind(this)} />
            </div>
            )
        } else {
            groupAction = <GroupActionStudent />
        }
        return (
        <div>
            <div className="group-action">
                {groupAction}
            </div>
            <Paper style={{minHeight: 500}} zDepth={1}>
                <div>
                    <GroupTabs location={this.props.location} />
                    <div style={{padding: 30}}>{this.props.children}</div>
                </div>
            </Paper>
        </div>
        )
    }
}

GroupDetailJoined.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    router: React.PropTypes.object,
    store: React.PropTypes.object
}

export default GroupDetailJoined
