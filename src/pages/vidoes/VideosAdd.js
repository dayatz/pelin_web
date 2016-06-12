import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'

import VideoService from '../../api/video'

export default class VideosAdd extends React.Component {
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

        if (title && this.state.file) {
            this.setState({ uploading: true })

            var params = JSON.stringify({
                "snippet": {
                    "title": title,
                    "description": description
                },
                "status": {
                    "privacyStatus": "public"
                }
            })
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
                    v.youtube_id = data.id
                    VideoService.create(v)
                        .then(function(r) {
                            t.setState({ uploading: false })
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
                    <div><TextField hintText='Judul' ref='title' /></div>
                    <div><TextField hintText='Deskripsi' ref='description' multiLine={true} rows={2} /></div>
                    <div><TextField floatingLabelText='Kategori' hintText='RPL,Multimedia,...' ref='cat' /></div>
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
                    <RaisedButton
                        disabled={this.state.uploading}
                        label={btnUpLabel}
                        type='submit' primary={true} />
                </form>
            )
        }


        return (
            <div>{renderForm}</div>
        )
    }
}
