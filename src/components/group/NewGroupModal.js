import React from 'react';
import GroupService from '../../api/group'
import { addGroupAction, addMyGroupAction } from '../../actions/group'
import FabAdd from '../../components/FabAdd'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

class NewGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            openModal: false,
            major: 'S1 TI'
        }
    }
    openModal() {
        this.setState({ openModal: true })
    }
    closeModal() {
        this.setState({
            loading: false,
            openModal: false
        })
    }
    onChange(e) {
        this.setState({ title: e.target.value });
    }
    actions() {
        return [
            <FlatButton
                label='Batal'
                disabled={this.state.loading}
                onClick={this.closeModal.bind(this)} />,

            <RaisedButton
                label='Buat'
                primary={true}
                disabled={this.state.loading}
                onClick={this.submit.bind(this)} />
        ]
    }

    submit() {
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
            GroupService.create(data)
                .then(r => {
                    const group = r.data;
                    this.context.store
                        .dispatch(addGroupAction(group));
                    this.context.store
                        .dispatch(addMyGroupAction(group.id));
                    this.closeModal();
                    this.context.router.push(`/groups/${group.id}`);
                })
        }
    }

    _handleDropDown(event, index, value) {
        this.setState({ major: value })
    }

    render() {
        return (
            <div>
                <FabAdd onClick={this.openModal.bind(this)} />

                <Dialog
                    actions={this.actions()}
                    title='Buat grup baru'
                    modal={true}
                    open={this.state.openModal}
                    >
                        <TextField id='new-group'
                            hintText='Nama grup'
                            autoComplete='off'
                            disabled={this.state.loading}
                            autoFocus={this.state.openModal}
                            ref='title' />
                        <TextField id='description'
                            hintText='Deskripsi grup'
                            autoComplete='off'
                            disabled={this.state.loading}
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
                            hintText='Semester' />

                </Dialog>
            </div>
        )
    }
}

NewGroupModal.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object
}

export default NewGroupModal;
