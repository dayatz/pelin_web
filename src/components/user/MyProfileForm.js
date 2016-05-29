import React from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'

import UserService from '../../api/user'
import { updateProfileAction } from '../../actions/auth.js'

class MyProfileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: null,
            photoPreview: null,
            loading: false
        }
    }
    onSubmit(e) {
        e.preventDefault()
        if (confirm('Simpan profil ?')) {
            this.setState({ loading: true })

            const name = this.refs.name.getValue()
            const email = this.refs.email.getValue()
            const phone = this.refs.phone.getValue()
            const password = this.refs.password.getValue()

            const data = new FormData()
            data.append('name', name)
            data.append('email', email)
            data.append('phone', phone)
            if (password) {
                data.append('name', name)
            }
            if (this.state.photo) {
                data.append('photo', this.state.photo)
            }

            UserService.update(data)
            .then(r => {
                UserService.saveUser(r.data)
                this.context.store.dispatch(updateProfileAction(r.data))
                this.context.showSnackbar('Berhasil menyimpan profil')
                this.context.router.push('/')
            })
        }
    }

    _openFileDialog() {
        var fileInput = ReactDOM.findDOMNode(this.refs.file)
        fileInput.click()
    }
    _handleFileChange(e) {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.setState({
                photo: file,
                photoPreview: reader.result
            })
        }
    }
    render() {
        const { user } = this.props

        var photo = user.photo.medium
        if (this.state.photoPreview) {
            photo = this.state.photoPreview
        }

        return (
        <form onSubmit={this.onSubmit.bind(this)}>
            <div>
                <img height='200' width='200' src={photo} /><br />
                <FlatButton
                    disabled={this.state.loading}
                    onClick={this._openFileDialog.bind(this)}
                    label='Pilih Photo'
                    style={{cursor: 'pointer'}} />
                <input
                    onChange={this._handleFileChange.bind(this)}
                    ref='file' type='file' multiple
                    style={{display: 'none'}} />
            </div>
            <div>
                <TextField 
                    hintText='Nama Lengkap'
                    fullWidth={true}
                    ref='name' id='name'
                    defaultValue={user.name} />
            </div>
            
            <div>
            <TextField
                hintText='Email'
                fullWidth={true}
                type='email'
                id='email'
                ref='email'
                defaultValue={user.email} />
            </div>
            <div>
            <TextField
                hintText='HP'
                fullWidth={true}
                ref='phone'
                id='phone'
                defaultValue={user.phone} />
            </div>
            <div>
            <TextField
                hintText='Password baru'
                fullWidth={true}
                type='password'
                ref='password'
                id='password' />
            </div>
            <div>
            <RaisedButton
                style={{marginTop: 15}}
                fullWidth={true}
                type='submit'
                label='Simpan'
                primary={true} />
            </div>
        </form>
        )
    }
}

MyProfileForm.contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object,
    showSnackbar: React.PropTypes.func
}

export default MyProfileForm
