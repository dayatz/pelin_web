import React from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import FlatButton from 'material-ui/lib/flat-button'
import CustomDatePicker from '../../components/CustomDatePicker'


class NewAssignmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
        date.setHours(time.getHours())
        date.setMinutes(time.getMinutes())

        data = new FormData()
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
                <TextField hintText='Judul tugas' id='title' ref='title' />
                </div>

                <div>
                <TextField ref='description' id='description' hintText='Deskripsi tugas' multiLine={true} rows={3} />
                </div>

                <div>
                    <p>Batas pengumpulan</p>
                    <CustomDatePicker
                        value={this.state.date}
                        onChange={this._handleDateChange.bind(this)}
                        style={{float: 'left'}} />
                    <TimePicker
                        value={this.state.time}
                        onChange={this._handleTimeChange.bind(this)}
                        format='24hr' hintText='Jam' />
                </div>

                <div>
                    <FlatButton
                        onClick={this._openFileDialog.bind(this)}
                        label={btnlabel}
                        style={{cursor: 'pointer'}} />
                    <input
                        onChange={this._handleFileChange.bind(this)}
                        ref='file' type='file' multiple
                        style={{display: 'none'}} />
                </div>

                <RaisedButton label='Batal' />
                <RaisedButton type='submit' primary={true} label='Buat' />
            </form>
        )
    }
}

export default NewAssignmentForm
