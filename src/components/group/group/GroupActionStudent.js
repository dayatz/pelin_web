import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import GroupService from '../../../api/group'
import { myGroupLeaveAction } from '../../../actions/group'

class GroupActionStudent extends React.Component {
    leave() {
        if (confirm('Apakah anda yakin ingin keluar dari grup ?')) {
            GroupService.leave(this.context.groupId)
                .then(r => {
                    this.context.store.dispatch(
                        myGroupLeaveAction(this.context.groupId))
                    this.context.router.replace('/')
                })
        }
    }

    render() {
        return (
        <RaisedButton
            onClick={this.leave.bind(this)}
            secondary={true}
            label='Tinggalkan' />
        )
    }
}

GroupActionStudent.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    router: React.PropTypes.object
}

export default GroupActionStudent
