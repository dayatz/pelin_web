import React from 'react'

import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import GroupService from '../../../api/group'
import { addMyGroupAction, addGroupAction, updateGroupAction } from '../../../actions/group'

class GroupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            major: 'S1 TI',
            title: null,
            description: null,
            semester: '1',

            loading: false,
            editing: false
        }
    }

    componentWillMount() {
        if (this.props.group) {
            const { group } = this.props
            this.setState({
                editing: true,
                major: group.major,
                title: group.title,
                description: group.description,
                semester: group.semester
            })
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const title = this.refs.title.getValue()
        const description = this.refs.description.getValue()
        const semester = this.state.semester
        const major = this.state.major

        if (title && semester && major) {
            this.setState({ loading: true })
            var data = { title, semester, major }
            if (description) {
                data['description'] = description
            }

            if (this.state.editing) {
                GroupService.update(this.context.groupId, data)
                .then(r => {
                    const group = r.data
                    this.context.store
                        .dispatch(updateGroupAction(group.id, group))
                    this.props.toggleModal()
                })
            } else {
                GroupService.create(data)
                .then(r => {
                    const group = r.data
                    this.context.store
                        .dispatch(addGroupAction(group))
                    this.context.store
                        .dispatch(addMyGroupAction(group.id))
                    this.context.router.push(`/groups/${group.id}`)
                })
            }
        }
    }

    _handleMajor(event, index, value) {
        this.setState({ major: value })
    }
    _handleSemester(e, i, v) {
        this.setState({ semester: v })
    }

    render() {
        return (
        <form onSubmit={this.onSubmit.bind(this)} ref='form'>
            <TextField id='title'
                hintText='Nama grup'
                autoComplete='off'
                autoFocus={true}
                disabled={this.state.loading}
                defaultValue={this.state.title}
                ref='title'
                fullWidth={true} />
            <TextField id='description'
                hintText='Deskripsi grup'
                autoComplete='off'
                disabled={this.state.loading}
                defaultValue={this.state.description}
                ref='description'
                multiLine={true}
                rows={2}
                fullWidth={true} />
            <br />
            <DropDownMenu value={this.state.major} onChange={this._handleMajor.bind(this)} fullWidth={true}>
                <MenuItem value='S1 TI' primaryText='S1 TI' />
                <MenuItem value='D3 TI' primaryText='D3 TI' />
                <MenuItem value='D3 MI' primaryText='D3 MI' />
            </DropDownMenu>
            <DropDownMenu value={this.state.semester} onChange={this._handleSemester.bind(this)} fullWidth={true} >
                <MenuItem value='1' primaryText='I' />
                <MenuItem value='2' primaryText='II' />
                <MenuItem value='3' primaryText='III' />
                <MenuItem value='4' primaryText='IV' />
                <MenuItem value='5' primaryText='V' />
                <MenuItem value='6' primaryText='VI' />
                <MenuItem value='7' primaryText='VII' />
                <MenuItem value='8' primaryText='VIII' />
            </DropDownMenu>
            <button type='submit' style={{ display: 'none' }} ref='btnSubmit' />
        </form>
        )
    }
}

GroupForm.contextTypes = {
    groupId: React.PropTypes.string,
    router: React.PropTypes.object,
    store: React.PropTypes.object
}

export default GroupForm
