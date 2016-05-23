import React from 'react'
import MemberItem from './MemberItem'

const MemberList = (props, context) => {
    var openProfile = (nim) => {
        context.router.push(`/users/${nim}`)
    }
    var renderMember = props.members.map(member => {
        return (
            <div key={member.id}>
                <MemberItem openProfile={openProfile} kick={props.kick} member={member} />
            </div>
        )
    })
    return (
        <div>{renderMember}</div>
    )
}

MemberList.contextTypes = {
    router: React.PropTypes.object
}

export default MemberList
