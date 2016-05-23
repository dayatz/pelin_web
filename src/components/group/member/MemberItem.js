import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'
import Paper from 'material-ui/lib/paper'

import materialLetter from '../../../config/materialLetter'


class MemberItem extends React.Component {
    kick() {
        if (confirm(`Hapus ${this.props.member.name} dari grup?`)) {
            this.props.kick(this.props.member)
        }
    }
    renderKickButton() {
        if (this.context.group.is_owner) {
            return (
                <RaisedButton
                    fullWidth={true}
                    backgroundColor='#FF5252'
                    onTouchTap={this.kick.bind(this)}
                    icon={
                        <FontIcon className='material-icons'>clear</FontIcon>
                    }
                    labelColor='#fff' />
            )
        }
        return
    }
    getName() {
        return (this.props.member.name.length > 12) ?
            this.props.member.name.substring(0, 12) + '...' :
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
            <Paper style={{cursor: 'pointer'}}>
                <div onClick={() => {
                    this.props.openProfile(this.props.member.student.nim)
                }}>
                    <img src={photo} style={{ width: '100%' }} />
                    <div style={{padding: 5}}>
                        <p style={{margin: 0}} title={this.props.member.name}>{this.getName()}</p>
                        <p style={{margin: 0, fontSize: 12, color: '#757575'}}>{this.props.member.student.nim}</p>
                    </div>
                </div>
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
