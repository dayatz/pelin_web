import React from 'react'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'

import GroupService from '../../api/group'
import GroupList from '../group/group/GroupList'
import Loading from '../Loading'
import { materialLetter } from '../../config'

class UserDetailProfile extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            groups: null,
            loading: true
        }
    }
    componentDidMount() {
        this.getUserGroups(this.props.userId)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.email != this.props.user.email) {
            this.getUserGroups(nextProps.userId)
        }
    }
    getUserGroups(id) {
        const { user } = this.props
        if (user.hasOwnProperty('name')) {
            this.setState({ loading: true })
            GroupService
                .userGroup(id)
                .then(r => {
                    this.setState({
                        loading: false,
                        groups: r.data
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ loading: false, groups: null })
                })
        }
    }
    getUserId() {
        const { user } = this.props
        return (user.is_teacher) ?
            user.teacher.nik : user.student.nim
    }
    render() {
        const { user } = this.props

        var src, srcLink
        if (user.photo.hasOwnProperty('medium')) {
            src = user.photo.medium
            srcLink = user.photo.full
        } else {
            src = srcLink = materialLetter(user.name.charAt(0).toUpperCase())
        }

        var userPhone = (user.phone) ? <span> | {user.phone}</span> : null

        var renderGroups = (this.state.loading && !this.state.groups ) ?
            <Loading /> : 
            <div>
                <p className='user__group-list__title'>Group</p>
                <div style={{padding: '0 15px'}}>
                    <GroupList groups={this.state.groups} />
                </div>
            </div>

        return (
            <div>
                <Paper className='user__paper'>
                    <div className='user__info-wrapper'>
                        <a href={srcLink} target='_blank'>
                            <Avatar backgroundColor='#fff' size={120} src={src} className='user__avatar' />
                        </a>
                        <p style={{fontSize: 22}} className='user__name'>{user.name}</p>
                        <p className='user__id'>{this.getUserId()}</p>
                        <p style={{marginTop: 10, color: '#757575'}}>
                            <span>{user.email}</span>{userPhone}
                        </p>
                    </div>
                    {renderGroups}
                </Paper>
            </div>
        )
    }

}

export default UserDetailProfile