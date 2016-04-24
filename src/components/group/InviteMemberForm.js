import React from 'react'
import MemberService from '../../api/member'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import Snackbar from 'material-ui/lib/snackbar'

class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nim: '',
            loading: false,
            openSnackbar: false,
            msg: ''
        }
    }
    onChange(e) {
        this.setState({ nim: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        const nim = this.state.nim;
        MemberService(this.context.groupId)
            .invite(nim)
            .then(r => {
                if (r.status == 201) {
                    this.setState({ msg: `${this.state.nim} berhasil ditambahkan.` })
                } else {
                    this.setState({ msg: 'Tunggu konfirmasi dari dosen.' })
                }
                this.setState({ openSnackbar: true });
                this.clean();
            })
            .catch(error => {
                if (error.status == 400) {
                    if (error.data.error.indexOf('Already') > -1) {
                        this.setState({ msg: `NIM ${this.state.nim} sudah menjadi member.` })
                    } else {
                        this.setState({ msg: 'Tunggu konfirmasi dosen.' });
                        this.clean();
                    }
                } else if (error.status == 404) {
                    this.setState({ msg: `NIM ${this.state.nim} tidak ditemukan.` });
                }
                this.setState({ openSnackbar: true });
            })
    }
    clean() {
        this.setState({ nim: '', loading: false })
    }
    closeSnackbar() {
        this.setState({ openSnackbar: false });
    }
    render() {
        return (
            <div>
            <Snackbar
                open={this.state.openSnackbar}
                message={this.state.msg}
                onRequestClose={this.closeSnackbar.bind(this)}
                autoHideDuration={3000}
                />

            <form onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    id='nim'
                    value={this.state.nim}
                    placeholder='Masukkan nim'
                    autoComplete='off'
                    disable={this.state.loading}
                    onChange={this.onChange.bind(this)} />
                <FlatButton
                    disable={this.state.loading}
                    type='submit' label='invite' />
            </form>
            </div>
        )
    }
}

InviteMemberForm.contextTypes = {
    groupId: React.PropTypes.string
}

export default InviteMemberForm
