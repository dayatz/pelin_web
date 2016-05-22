import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import FontIcon from 'material-ui/lib/font-icon'
import Paper from 'material-ui/lib/paper'

import materialLetter from '../../../config/materialLetter'


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
    getName() {
        return (this.props.member.name.length > 15) ?
            this.props.member.name.substring(0, 15) + '...' :
            this.props.member.name
    }
    render() {
        if (this.props.member.photo.hasOwnProperty('medium')) {
            var photo = this.props.member.photo.medium
        } else {
            const char = this.props.member.name.charAt(0).toUpperCase()
            var photo = materialLetter(char)
        }
        return (
            <div className='col-md-2'>
            <Paper>
                <img src={photo} style={{ width: '100%' }} />
                <p title={this.props.member.name}>{this.getName()}</p>
                <p>{this.props.member.student.nim}</p>
                {this.renderKickButton()}
            </Paper>
            </div>
        )
    }
}

MemberItem.contextTypes = {
    group: React.PropTypes.object
}

export default MemberItem
