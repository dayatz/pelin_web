import React from 'react'
import { fetchMembers } from '../../actions/member'
import MemberService from '../../api/member'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'
import Snackbar from 'material-ui/lib/snackbar'

class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nim: '',
            loading: false
        }
    }
    onChange(e) {
        this.setState({ nim: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const nim = this.state.nim;
        MemberService(this.context.groupId)
            .invite(nim)
            .then(r => {
                if (r.status == 201) {
                    this.context.showSnackbar(`${this.state.nim} berhasil ditambahkan.`);
                    this.context.store.dispatch(fetchMembers(this.context.groupId));
                } else {
                    this.context.showSnackbar('Tunggu konfirmasi dari dosen.');
                }
                this.clean();
            })
            .catch(error => {
                if (error.status == 400) {
                    if (error.data.error.indexOf('Already') > -1) {
                        this.context.showSnackbar(`${this.state.nim} sudah menjadi member.`)
                    } else {
                        this.context.showSnackbar('Tunggu konfirmasi dosen.');
                        this.clean();
                    }
                } else if (error.status == 404) {
                    this.context.showSnackbar(`${this.state.nim} tidak ditemukan.`);
                }
            })
    }
    clean() {
        this.setState({ nim: '', loading: false })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    id='nim'
                    value={this.state.nim}
                    placeholder='Masukkan nim'
                    autoComplete='off'
                    disable={this.state.loading}
                    onChange={this.onChange.bind(this)} />
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    disable={this.state.loading}
                    type='submit'>
                    <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
            </form>
        )
    }
}

InviteMemberForm.contextTypes = {
    groupId: React.PropTypes.string,
    showSnackbar: React.PropTypes.func,
    store: React.PropTypes.object
}

export default InviteMemberForm
