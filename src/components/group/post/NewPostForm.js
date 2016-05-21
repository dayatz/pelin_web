import React from 'react'
import ReactDOM from 'react-dom'
import autosize from 'autosize'
import TextareaAutosize from 'react-autosize-textarea'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Paper from 'material-ui/lib/paper'


import PostService from '../../../api/post'

class NewPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            file: null,
            sending: false,
            zDepth: 1
        }
    }
    componentDidMount() {
        var txt = document.getElementById('new-post')
        var t = this
        autosize(txt)
        txt.addEventListener('autosize:resized', () => {
            setTimeout(() => {
                t.relayout()
            }, 150)
        })
    }
    relayout() {
        this.context.masonry.masonry.layout()
    }
    onChange(e) {
        this.setState({ value: e.target.value })
    }
    clean() {
        this.setState({
            sending: false,
            value: '',
            file: null
        })
    }
    onSubmit(e) {
        e.preventDefault()
        this.setState({ sending: true })

        const text = this.state.value.trim()
        if (text) {
            var post = new FormData()
            post.append('text', text)
            if (this.state.file) {
                post.append('file', this.state.file)
            }
            PostService(this.context.groupId)
            .create(post)
            .then(r => {
                this.context.store.dispatch({
                    type: 'POST_ADD',
                    item: r.data,
                    groupId: this.context.groupId
                })
                this.clean()
            })
        }
    }
    _handleFileChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    _openFileDialog() {
        var fileInput = ReactDOM.findDOMNode(this.refs.file)
        fileInput.click()
    }

    render() {
        var btnlabel = 'File'
        if (this.state.file) {
            if (this.state.file.name.length >= 10) {
                var ext = this.state.file.name.split('.')[1]
                btnlabel = this.state.file.name.substring(0,5) + '...' + ext
            } else {
                btnlabel = this.state.file.name
            }
        }
        return (
            <Paper zDepth={this.state.zDepth} className='post-form' id='new-post-form'>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <TextField
                            style={{ fontSize: 14 }}
                            fullWidth={true} ref='text'
                            value={this.state.value}
                            disabled={this.state.sending}
                            multiLine={true} rows={2}
                            autoFocus={true}
                            hintText='Posting sesuatu...'
                            autoComplete='off' id='new-post'
                            onFocus={() => {
                                this.setState({ zDepth: 2 })
                            }}
                            onBlur={() => {
                                this.setState({ zDepth: 1 })
                            }}
                            onChange={this.onChange.bind(this)}>
                        </TextField>
                    </div>

                    <div>
                        <FlatButton
                            primary={true}
                            disabled={this.state.sending}
                            onClick={this._openFileDialog.bind(this)}
                            label={btnlabel}
                            style={{cursor: 'pointer'}} />
                            <input
                                onChange={this._handleFileChange.bind(this)}
                                ref='file' type='file' multiple
                                style={{display: 'none'}} />
                        <RaisedButton
                            style={{ float: 'right' }}
                            type='submit' label='Kirim'
                            primary={true}
                            disabled={this.state.sending || !this.state.value} />
                    </div>
                </form>
            </Paper>
        )
    }
}

NewPostForm.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    masonry: React.PropTypes.object
}

export default NewPostForm
