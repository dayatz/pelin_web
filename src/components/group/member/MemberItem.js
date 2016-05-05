import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'

class MemberItem extends React.Component {
    kick() {
        this.props.kick(this.props.member)
    }
    renderKickButton() {
        if (this.context.group.is_owner) {
            return (
                <FlatButton
                    secondary={true}
                    onClick={this.kick.bind(this)}>
                    <FontIcon className='material-icons'>clear</FontIcon>
                </FlatButton>
            )
        }
        return
    }
    render() {
        return (
            <div>
                <p>
                    {this.props.member.name}
                    {this.renderKickButton()}
                </p>
            </div>
        )
    }
}

MemberItem.contextTypes = {
    group: React.PropTypes.object
}

export default MemberItem
