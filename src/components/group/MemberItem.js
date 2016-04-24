import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'

class MemberItem extends React.Component {
    render() {
        var renderKickButton;
        if (this.context.group.is_owner) {
            renderKickButton = (
                <FlatButton label='kick' secondary={true} />
            )
        }
        return (
            <div>
                <p>
                    {this.props.member.name}
                    {renderKickButton}
                </p>
            </div>
        )
    }
}

MemberItem.contextTypes = {
    group: React.PropTypes.object
}

export default MemberItem
