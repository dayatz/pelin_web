import React from 'react';
import GroupService from '../../api/group'
import { addGroupAction, addMyGroupAction } from '../../actions/group'
import FabAdd from '../../components/FabAdd'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'

class NewGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            openModal: false,
            title: ''
        }
    }
    openModal() {
        this.setState({ openModal: true })
    }
    closeModal() {
        this.setState({
            loading: false,
            openModal: false,
            title: ''
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
        // const title = this.state.title;
        const title = this.refs.title.getValue()
        const description = this.refs.description.getValue()
        if (title) {
            this.setState({ loading: true });
            const data = { title:title }
            if (description) {
                const data = { title: title, description: description }
            }
            GroupService.create(data)
                .then(r => {
                    const group = r.data;
                    this.context.store
                        .dispatch(addGroupAction(group));
                    this.context.store
                        .dispatch(addMyGroupAction(group.id));
                    this.context.router.push(`/groups/${group.id}`);
                    this.closeModal();
                })
        }
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
                            <br />
                        <TextField id='description'
                            hintText='Deskripsi grup'
                            autoComplete='off'
                            disabled={this.state.loading}
                            ref='description'
                            multiLine={true}
                            rows={2} />
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
