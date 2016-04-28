import React from 'react'
import ReactDOM from 'react-dom'
import { assignmentAddAction } from '../../actions/assignment'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import FlatButton from 'material-ui/lib/flat-button'
import CustomDatePicker from '../../components/CustomDatePicker'
import AssignmentService from '../../api/assignment.js'


class NewAssignmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            files: [],
            date: null,
            time: null
        }
    }
    _openFileDialog() {
        var fileInput = ReactDOM.findDOMNode(this.refs.file)
        fileInput.click()
    }
    _handleFileChange(e) {
        console.log(e.target.files)
        this.setState({ files: e.target.files })
    }
    _handleDateChange(event, date) {
        this.setState({ date })
    }
    _handleTimeChange(err, time) {
        this.setState({ time })
    }

    handleSubmit(e) {
        e.preventDefault()
        const title = this.refs.title.getValue()
        const description = this.refs.description.getValue()

        const date = this.state.date
        const time = this.state.time

        if (title && date && time) {
            this.setState({ loading: true })

            date.setHours(time.getHours())
            date.setMinutes(time.getMinutes())
        
            var data = new FormData()
            data.append('title', title)
            data.append('due_date', date.toISOString())

            if (description) {
                data.append('description', description)
            }
            if (this.state.files.length) {
                for (var i = 0; i < this.state.files.length; i++) {
                    data.append('files', this.state.files[i])
                }
            }

            AssignmentService(this.context.groupId)
                .create(data)
                .then(r => {
                    this.setState({ loading: false })
                    this.context.store.dispatch(assignmentAddAction(this.context.groupId, r.data))
                    this.context.router.replace(`groups/${this.context.groupId}/assignments`)
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ loading: false })
                })
        }

    }
    
    render() {
        if (this.state.files.length == 1) {
            var btnlabel = this.state.files[0].name
        } else if (this.state.files.length > 1) {
            var btnlabel = this.state.files.length + ' file'
        } else {
            var btnlabel = 'Pilih File'
        }

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <TextField
                        disabled={this.state.loading}
                        hintText='Judul tugas'
                        id='title' ref='title'
                        autoComplete='off' />
                </div>

                <div>
                    <TextField
                        disabled={this.state.loading}
                        ref='description' id='description'
                        hintText='Deskripsi tugas'
                        multiLine={true} rows={3}
                        autoComplete='off' />
                </div>

                <div>
                    <p>Batas pengumpulan</p>
                    <CustomDatePicker
                        disabled={this.state.loading}
                        value={this.state.date}
                        onChange={this._handleDateChange.bind(this)}
                        style={{float: 'left'}} />
                    <TimePicker
                        disabled={this.state.loading}
                        value={this.state.time}
                        onChange={this._handleTimeChange.bind(this)}
                        format='24hr' hintText='Jam' />
                </div>

                <div>
                    <FlatButton
                        disabled={this.state.loading}
                        onClick={this._openFileDialog.bind(this)}
                        label={btnlabel}
                        style={{cursor: 'pointer'}} />
                    <input
                        onChange={this._handleFileChange.bind(this)}
                        ref='file' type='file' multiple
                        style={{display: 'none'}} />
                </div>

                <RaisedButton
                    label='Batal'
                    disabled={this.state.loading}
                    onClick={() => {
                        this.context.router.replace(
                            `/groups/${this.context.groupId}/assignments`
                            )
                    }} />
                <RaisedButton
                    type='submit' primary={true}
                    label='Buat' disabled={this.state.loading} />
            </form>
        )
    }
}

NewAssignmentForm.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object,
    router: React.PropTypes.object
}

export default NewAssignmentForm
