import React from 'react'
import MemberItem from './MemberItem'

const MemberList = (props) => {
    var renderMember = props.members.map(member => {
        return (
            <div key={member.id}>
                <MemberItem member={member} />
            </div>
        )
    })
    return (
        <div>{renderMember}</div>
    )
}

export default MemberList
