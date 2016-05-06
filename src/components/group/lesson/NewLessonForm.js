import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Dropzone from 'react-dropzone'
import LessonService from '../../../api/lesson'

class NewLessonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            loading: false
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
            this.setState({ loading: true })
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
                    this.setState({ loading: false })
                    this.context.router.replace(`/groups/${this.context.groupId}/lessons`)
                })
        }
    }
    onDrop(files) {
        this.setState({ files })
    }
    render() {
        var renderPreview
        if (this.state.files.length) {
            renderPreview = this.state.files.map(file => {
                return <div key={file.name} style={{width: 100, border: '1px solid #eee', padding: 5}}>
                    <p>{file.name}</p>
                    <p>{file.size}</p>
                </div>
            })
        }
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                <div>
                    <TextField
                        hintText='Nama materi'
                        id='title'
                        autoFocus={true}
                        autoComplete='off'
                        ref='title' />
                </div>
                <div>
                    <TextField
                        hintText='Keterangan'
                        id='description'
                        ref='description'
                        autoComplete='off'
                        multiLine={true}
                        rows={2} />
                </div>
                <div>
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Pilih file, atau drag  drop ke sini</p>
                        {renderPreview}
                    </Dropzone>
                </div>
                    <RaisedButton label='Batal' onClick={this.backButton.bind(this)} />
                    <RaisedButton type='submit' primary={true} label='Tambah' />
                </form>
            </div>
        )
    }
}

NewLessonForm.contextTypes = {
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default NewLessonForm
