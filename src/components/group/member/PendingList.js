import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import PendingItem from './PendingItem'
import MemberService from '../../../api/member'
import { fetchMembers, approveAll, addMember, pendingApprove } from '../../../actions/member'

class PendingList extends React.Component {
    approveAll() {
        MemberService(this.context.groupId)
            .approveAll()
            .then(r => {
                this.context.store.dispatch(approveAll(this.context.groupId))
                this.context.store.dispatch(fetchMembers(this.context.groupId))
                this.context.showSnackbar('Berhasil ditambahkan ke grup.')
            })
    }
    approve(pending) {
        MemberService(this.context.groupId)
            .approve(pending.id)
            .then(r => {
                const groupId = this.context.groupId
                this.context.store.dispatch(pendingApprove(groupId, pending.id))
                this.context.store.dispatch(
                    addMember(this.context.groupId, pending.user)
                )
            })
    }
    decline(pending) {
        MemberService(this.context.groupId)
            .decline(pending.id)
            .then(r => {
                const groupId = this.context.groupId
                this.context.store.dispatch(pendingApprove(groupId, pending.id))
            })
    }
    render() {
        const renderPending = this.props.pendings.map(pending => {
            return (
                <PendingItem
                    key={pending.id}
                    pending={pending}
                    approve={this.approve.bind(this)}
                    decline={this.decline.bind(this)} />
            )
        })
        return (
            <div style={{position: 'relative'}}>
                <p>Permintaan Bergabung ({this.props.pendings.length})</p>
                <RaisedButton
                    style={{position: 'absolute', top: 0, right: 0}}
                    onTouchTap={this.approveAll.bind(this)}
                    label='Terima Semua' />
                <div className='pending-list'>
                    {renderPending}
                    <div style={{clear:'both'}}></div>
                </div>
                <hr />
            </div>
        )
    }
}

PendingList.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

export default PendingList
