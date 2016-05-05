import React from 'react'
import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import GroupService from '../../api/group'
import { addMyGroupAction, addGroupAction, updateGroupAction } from '../../actions/group'

class GroupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            major: 'S1 TI',
            title: null,
            description: null,
            semester: null,

            loading: false,
            editing: false
        }
    }

    componentWillMount() {
        if (this.props.group) {
            const { group } = this.props
            console.log(group)
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
        const semester = this.refs.semester.getValue()
        const major = this.state.major

        if (title && semester && major) {
            this.setState({ loading: true });
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
                    const group = r.data;
                    this.context.store
                        .dispatch(addGroupAction(group));
                    this.context.store
                        .dispatch(addMyGroupAction(group.id));
                    this.context.router.push(`/groups/${group.id}`);
                })
            }
        }
    }

    _handleDropDown(event, index, value) {
        this.setState({ major: value })
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
                ref='title' />
            <TextField id='description'
                hintText='Deskripsi grup'
                autoComplete='off'
                disabled={this.state.loading}
                defaultValue={this.state.description}
                ref='description'
                multiLine={true}
                rows={2} />
            <br />
            <DropDownMenu value={this.state.major} onChange={this._handleDropDown.bind(this)}>
                <MenuItem value='S1 TI' primaryText='S1 TI' />
                <MenuItem value='D3 TI' primaryText='D3 TI' />
                <MenuItem value='D3 MI' primaryText='D3 MI' />
            </DropDownMenu>
            <TextField id='semester'
                ref='semester'
                defaultValue={this.state.semester}
                hintText='Semester' />
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
