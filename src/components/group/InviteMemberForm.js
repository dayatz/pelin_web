import React from 'react'
import TextField from 'material-ui/lib/text-field'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'

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
        this.props.onInviteFormSubmit(nim, this.clean.bind(this));
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
                    disabled={this.state.loading}
                    onChange={this.onChange.bind(this)} />
                <FloatingActionButton
                    mini={true}
                    secondary={true}
                    disabled={this.state.loading}
                    type='submit'>
                    <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
            </form>
        )
    }
}

export default InviteMemberForm
