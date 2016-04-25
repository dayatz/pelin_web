import React from 'react'
import MemberService from '../../api/member'
import { fetchMembers, approveAll, addMember, pendingApprove } from '../../actions/member'
import PendingItem from './PendingItem'

class PendingList extends React.Component {
    approveAll() {
        MemberService(this.context.groupId)
            .approveAll()
            .then(r => {
                this.context.store.dispatch(approveAll(this.context.groupId));
                this.context.store.dispatch(fetchMembers(this.context.groupId));
                this.context.showSnackbar('Berhasil ditambahkan ke grup.');
            })
    }
    approve(pending) {
        MemberService(this.context.groupId)
            .approve(pending.id)
            .then(r => {
                const groupId = this.context.groupId;
                this.context.store.dispatch(pendingApprove(groupId, pending.id));
                this.context.store.dispatch(
                    addMember(this.context.groupId, pending.user)
                );
            })
    }
    decline(pending) {
        MemberService(this.context.groupId)
            .decline(pending.id)
            .then(r => {
                const groupId = this.context.groupId;
                this.context.store.dispatch(pendingApprove(groupId, pending.id));
            })
    }
    render() {
        const renderPending = this.props.pendings.map(pending => {
            return (
                <div key={pending.id}>
                    <PendingItem
                        pending={pending}
                        approve={this.approve.bind(this)}
                        decline={this.decline.bind(this)} />
                </div>
            )
        })
        return (
            <div>
                <button onClick={this.approveAll.bind(this)}>approve all</button>
                <div>{renderPending}</div>
            </div>
        )
    }
}

PendingList.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

export default PendingList;
