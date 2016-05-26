import React from 'react'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import FontIcon from 'material-ui/lib/font-icon'
import RaisedButton from 'material-ui/lib/raised-button'
import { Link } from 'react-router'
import {getBg, materialLetter} from '../../../config'

class Group extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            pending: this.props.group.is_pending
        }
    }

    toggleJoin() {
        this.setState({ pending: !this.state.pending })
        if (this.state.pending) {
            this.props.cancel(this.props.group.id) 
        } else {
            this.props.join(this.props.group.id)
        }
    }

    btnLabel() {
        var btn
        if (this.props.group.is_joined || this.props.group.is_owner) {
            btn =
            <RaisedButton
                fullWidth={true}
                label='Lihat' primary={true}
                onTouchTap={() => {
                    this.context.router.push(`/groups/${this.props.group.id}`)
                }} />
        } else {
            if (this.state.pending) {
                btn = <RaisedButton
                    fullWidth={true}
                    label='Batal Bergabung'
                    secondary={true}
                    onTouchTap={this.toggleJoin.bind(this)} />
            } else {
                btn = <RaisedButton fullWidth={true} label='Gabung' onTouchTap={this.toggleJoin.bind(this)} />
            }
        }
        return btn
    }
    getAvatar() {
        const src = (this.props.group.teacher.photo.hasOwnProperty('thumbnail')) ?
            this.props.group.teacher.photo.thumbnail :
            materialLetter(this.props.group.teacher.name.charAt(0).toUpperCase())
        
        return (<Avatar size={32} backgroundColor='#fff' src={src} />)
    }
    render() {
        return (
            <Paper>
                <div className='group-item__bg' style={{backgroundImage: `url(${getBg(this.props.group.title.charAt(0).toLowerCase())})`}}>
                    <p className='group-item__title'>
                        {this.props.group.title}
                    </p>
                </div>
                <div className='group-item__teacher'>
                    {this.getAvatar()}
                    <p className='group-item__teacher-name'>
                        {this.props.group.teacher.name}
                    </p>
                </div>
                <div className='group-item__info'>
                    <div className='left'>
                        <Avatar size={24} style={{ marginRight: 5, padding: 2 }}>
                            <FontIcon style={{ fontSize: 20, color: '#757575' }}
                                className='material-icons'>school</FontIcon>
                        </Avatar>
                        <span className='group-item__info-semester'>
                            {this.props.group.major} / {this.props.group.semester}
                        </span>
                    </div>
                    <div className='right'>
                        <span className='group-item__info-members'>
                            {this.props.group.members}
                        </span>
                        <Avatar size={24} style={{ marginLeft: 5, padding: 2 }}>
                            <FontIcon style={{ fontSize: 20, color: '#757575' }}
                                className='material-icons'>group</FontIcon>
                        </Avatar>
                    </div>
                    <div style={{clear:'both'}}></div>
                </div>
                {this.btnLabel()}
            </Paper>
        )
    }
}

Group.contextTypes = {
    router: React.PropTypes.object
}

export default Group
