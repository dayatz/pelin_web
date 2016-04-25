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
    approve(id) {
        MemberService(this.context.groupId)
            .approve(id)
            .then(r => {
                console.log(r)
            })
    }
    decline(id) {
        MemberService(this.context.groupId)
            .decline(id)
            .then(r => {
                console.log(r);
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
    groupId: React.PropTypes.string
}

export default PendingList;
