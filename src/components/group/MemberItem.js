import React from 'react'
import { fetchMembers } from '../../actions/member'
import MemberService from '../../api/member'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'

class MemberItem extends React.Component {
    kick() {
        this.props.kick(this.props.member.student.nim);
    }
    render() {
        var renderKickButton;
        if (this.context.group.is_owner) {
            renderKickButton = (
                <FlatButton
                    secondary={true}
                    onClick={this.kick.bind(this)}>
                    <FontIcon className='material-icons'>clear</FontIcon>
                </FlatButton>
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
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    store: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

export default MemberItem
