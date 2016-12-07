import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Paper from 'material-ui/lib/paper'
import FontIcon from 'material-ui/lib/font-icon'
import Dropzone from 'react-dropzone'
import LessonService from '../../../api/lesson'
import {splitText} from '../../../config'
import prettysize from 'prettysize'

class NewLessonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            sending: false
        }
    }
    backButton() {
        this.context.router.replace(`/groups/${this.context.groupId}/lessons`)
    }
    onSubmit(e) {
        e.preventDefault()
        const title = this.refs.title.getValue()
        const description = this.refs.description.getValue()

        if (title && this.state.files.length) {
            this.setState({ sending: true })
            var lesson = new FormData()
            this.state.files.map(file => {
                lesson.append('files', file)
            })
            lesson.append('title', title)
            if (description) {
                lesson.append('description', description)
            }

            LessonService(this.context.groupId)
                .create(lesson)
                .then(r => {
                    const lesson = r.data
                    console.log(lesson)
                    this.setState({ sending: false })
                    this.context.router.replace(`/groups/${this.context.groupId}/lessons`)
                })
        }
    }
    onDrop(files) {
        this.setState({ files })
    }
    render() {
        var renderUploader
        if (this.state.files.length) {
            renderUploader = this.state.files.map(file => {
                return (
                    <li className='lesson-item__file-item' key={file.name}>
                        <span style={{float: 'left', fontSize: 13}}>
                            {splitText(25, file.name)}
                        </span>
                        <span style={{ float: 'right', fontSize: 13 }}>{prettysize(file.size)}</span>
                        <div style={{clear: 'both'}}></div>
                    </li>
                )
            })
            renderUploader = <div>{renderUploader}</div>
        } else {
            renderUploader = (
                <div>
                    <p className='lesson-form__icon'>
                        <FontIcon className='material-icons'>cloud_upload</FontIcon>
                    </p>
                    <p className='lesson-form__dropzone-text'>Pilih file, atau drag drop.</p>
                </div>
            )
        }

        return (
            <Paper className='lesson-form'>
                <h4 className='lesson-form__title'>Upload Materi</h4>
                <form onSubmit={this.onSubmit.bind(this)} className='lesson-form__form'>
                    <div className='lesson-form__left'>
                        <Dropzone onDrop={this.onDrop.bind(this)}
                            className='lesson-form__dropzone'>
                            {renderUploader}
                        </Dropzone>
                    </div>

                    <div className='lesson-form__right'>
                        <div>
                            <TextField
                                hintText='Nama materi'
                                id='title'
                                autoFocus={true}
                                autoComplete='off'
                                fullWidth={true}
                                disabled={this.state.sending}
                                ref='title' />
                        </div>
                        <div>
                            <TextField
                                hintText='Catatan tambahan'
                                id='description'
                                ref='description'
                                autoComplete='off'
                                multiLine={true}
                                fullWidth={true}
                                disabled={this.state.sending}
                                rows={3} />
                        </div>

                        <FlatButton secondary={true}
                            disabled={this.state.sending}
                            label='Batal' onClick={this.backButton.bind(this)} />
                        <RaisedButton style={{float: 'right'}}
                            disabled={this.state.sending}
                            type='submit' primary={true} label='Upload' />
                    </div>
                    <div style={{clear: 'both'}}></div>
                </form>
            </Paper>
        )
    }
}

NewLessonForm.contextTypes = {
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default NewLessonForm
