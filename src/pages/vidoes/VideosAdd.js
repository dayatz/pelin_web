import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Paper from 'material-ui/lib/paper'

import VideoService from '../../api/video'

class VideosAdd extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            file: null,
            uploading: false,
            tokenIsValid: true
        }
    }

    componentWillMount() {
        var t = this

        VideoService.validateToken()
        .then(function(r){
            if (r.status == 200) {
                t.setState({ tokenIsValid: true })
            }
        })
        .catch(function(err) {
            t.setState({ tokenIsValid: false })
        })
    }

    _openFileDialog() {
        var fileInput = ReactDOM.findDOMNode(this.refs.file)
        fileInput.click()
    }
    _handleFileChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    handleSubmit(e) {
        e.preventDefault()
        const t = this

        const title = this.refs.title.getValue()
        const description = this.refs.description.getValue()
        const cat = this.refs.cat.getValue()

        var tags
        if (title && this.state.file) {
            this.setState({ uploading: true })

            var params = {
                snippet: {
                    title: title
                },
                status: {
                    privacyStatus: "public"
                }
            }

            if (description) {
                params.snippet.description = description
            }
            if (cat) {
                tags = cat.replace(/\s/g, '').split(',')
                params.snippet.tags = tags
            }

            params = JSON.stringify(params)
            var jsonBlob = new Blob([params], {"type": "application\/json"})
            var fd = new FormData()
            fd.append("snippet", jsonBlob, "file.json")
            fd.append("file", this.state.file)

            var req = new XMLHttpRequest()
            req.open('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status', true)
            req.setRequestHeader('Authorization', 'Bearer ' + VideoService.getAccessToken())

            req.onreadystatechange = function(e) {
                if (req.readyState == 4 && req.status == 200) {
                    const data = JSON.parse(req.response)

                    const v = { title }
                    if (description) {
                        v.description = description
                    }
                    if (cat) {
                        v.category = tags
                    }
                    v.youtube_id = data.id
                    VideoService.create(v)
                        .then(function(r) {
                            t.setState({ uploading: false })
                            t.context.router.push('/videos')
                        })
                        .catch(function(err){
                            console.log(err)
                        })
                }
            }
            req.send(fd)
        }
    }

    render() {
        var renderForm = 'Loading'
        if (!VideoService.getAccessToken() || !this.state.tokenIsValid) {
            renderForm = (
            <a href={VideoService.authUrl()}>
                autentikasi gugel
            </a>
            )
        } else {
            var btnlabel = 'Pilih File'
            if (this.state.file) {
                btnlabel = this.state.file.name
            }
            var btnUpLabel = this.state.uploading ? 'Uploading...': 'Upload'
            renderForm = (
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <TextField
                            disabled={this.state.uploading}
                            hintText='Judul'
                            ref='title'
                            fullWidth={true} />
                    </div>
                    <div>
                        <TextField
                            disabled={this.state.uploading}
                            hintText='Deskripsi'
                            ref='description'
                            multiLine={true} rows={2}
                            fullWidth={true} />
                    </div>
                    <div>
                        <TextField
                            disabled={this.state.uploading}
                            floatingLabelText='Kategori'
                            hintText='RPL, Multimedia, ...'
                            ref='cat'
                            fullWidth={true} />
                    </div>
                    <div>
                        <FlatButton
                            disabled={this.state.loading}
                            onClick={this._openFileDialog.bind(this)}
                            label={btnlabel}
                            style={{cursor: 'pointer'}} />
                        <input accept="video/*"
                            onChange={this._handleFileChange.bind(this)}
                            ref='file' type='file' style={{display: 'none'}} />
                    </div>
                    <div style={{marginTop: 30}}>
                        <FlatButton
                            onTouchTap={() => {
                                this.context.router.push('/videos')
                            }}
                            label='Batal' disabled={this.state.uploading}
                            secondary={true} />
                        <RaisedButton
                            style={{float:'right'}}
                            disabled={this.state.uploading}
                            label={btnUpLabel}
                            type='submit' primary={true} />
                        <div style={{clear:'both'}}></div>
                    </div>
                </form>
            )
        }

        return (
            <div className='col-md-6 col-md-offset-3'>
                <div>
                    <h5>Upload vidio</h5>
                    <i style={{color:'#757575'}}>*) video yang diupload akan tersimpan di youtube</i>
                </div>
                <Paper style={{padding: 10, marginTop:20}}>
                    {renderForm}
                </Paper>
            </div>
        )
    }
}

VideosAdd.contextTypes = {
    router: React.PropTypes.object
}

export default VideosAdd