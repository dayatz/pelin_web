import React from 'react'
import _ from 'lodash'
import TextField from 'material-ui/lib/text-field'
import Popover from 'material-ui/lib/popover/popover'
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top'
import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import UserService from '../../api/user'


class NewConversationForm extends React.Component {
    constructor(props) {
      super(props)

      this.changeNim = _.debounce(this.changeNim, 300)
      this.state = {
        popoverOpen: false,
        nim: null,
        users: []
      }
    }
    submit(e) {
        e.preventDefault()
        const userId = this.refs.userId.getValue()
        const text = this.refs.text.getValue()
        this.props.handleSubmit(userId, text)
        this.props.toggle()
    }
    // onFocus(e) {
    //     this.setState({ popoverOpen: true, anchorEl: e.currentTarget })
    // }
    handleRequestClose = () => {
        this.setState({
          popoverOpen: false,
        });
    }

    changeNim(nim) {
        if (nim) {
            this.setState({ nim, popoverOpen: true })
            UserService.search(nim)
                .then(r => {
                    if (r.data.length) {
                        this.setState({ users: r.data })
                    }
                })
        }
    }
    onChange(e) {
        const nim = e.target.value
        if (nim) {
            this.setState({ popoverOpen: false })
        }
        this.changeNim(nim)
    }
    selectUserItem(e, o, i) {
        this.refs.userId.input.value = o.props.value
        this.setState({ popoverOpen: false })
    }

    render() {
    var usersMenuItem = this.state.users.map(u => {
        if (u.student) {
            return <MenuItem primaryText={u.name} key={u.id} secondaryText={u.student.nim} value={u.student.nim} />
        }
        return <MenuItem value={u.teacher.username} primaryText={u.name} key={u.id} />
    })
    return (
        <form onSubmit={this.submit.bind(this)} ref='form'>
            <TextField
                fullWidth={true}
                autoFocus={this.props.openModal}
                id='userId'
                ref='userId'
                hintText='Masukkan NIM atau Username'
                autoComplete='off'
                onChange={this.onChange.bind(this)} />
            <Popover
              open={this.state.popoverOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationFromTop} >
              <Menu disableAutoFocus={true} onItemTouchTap={this.selectUserItem.bind(this)}>
                {usersMenuItem}
              </Menu>
            </Popover>

            <br />
            <TextField
                fullWidth={true}
                id='text'
                ref='text'
                hintText='Pesan'
                multiLine={true}
                autoComplete='off'
                rows={2} />
        </form>
    )
    }
}

export default NewConversationForm
