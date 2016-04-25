import React from 'react'
import MemberItem from './MemberItem'

const MemberList = (props) => {
    var renderMember = props.members.map(member => {
        return (
            <div key={member.id}>
                <MemberItem kick={props.kick} member={member} />
            </div>
        )
    })
    return (
        <div>{renderMember}</div>
    )
}

export default MemberList
