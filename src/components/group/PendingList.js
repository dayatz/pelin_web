import React from 'react'
import MemberService from '../../api/member'
import PendingItem from './PendingItem'

class PendingList extends React.Component {
    approveAll() {
        MemberService(this.context.groupId)
            .approveAll()
            .then(r => {
                console.log(r)
            })
    }
    approve(pending) {
        MemberService(this.context.groupId)
            .approve(pending.id)
            .then(r => {
                const groupId = this.context.groupId;
                this.context.store.dispatch({
                    type: 'PENDING_APPROVE',
                    groupId,
                    id: pending.id
                });
                this.context.store.dispatch({
                    type: 'ADD_MEMBER',
                    groupId,
                    item: pending.user
                });
            })
    }
    decline(pending) {
        MemberService(this.context.groupId)
            .decline(pending.id)
            .then(r => {
                const groupId = this.context.groupId;
                this.context.store.dispatch({
                    type: 'PENDING_APPROVE',
                    groupId,
                    id: pending.id
                });
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
    store: React.PropTypes.object
}

export default PendingList;
