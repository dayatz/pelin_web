import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class InviteMemberForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nim: '',
            loading: false
        }
    }
    onChange(e) {
        this.setState({ nim: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const nim = this.state.nim

        if (nim) {
            this.setState({ loading: true })
            this.props.onInviteFormSubmit(nim, this.clean.bind(this))
        }
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
                    hintText='Masukkan nim'
                    autoFocus={this.props.open}
                    autoComplete='off'
                    disabled={this.state.loading}
                    onChange={this.onChange.bind(this)} />
                <RaisedButton
                    label='OK'
                    disabled={this.state.loading}
                    type='submit'
                    secondary={true} />
            </form>
        )
    }
}

export default InviteMemberForm
