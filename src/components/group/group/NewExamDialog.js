import React from 'react'
import ReactDOM from 'react-dom'

import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import ExamService from '../../../api/exam'


class NewExamDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    _toggleLoading() {
        this.setState({ loading: !this.state.loading })
    }
    _getTitle() {
        return (this.props.edit) ? 'Edit Evaluasi': 'Buat Evaluasi Baru'
    }
    _actions() {
        return [
            <FlatButton
                label='Batal'
                onClick={this.props.toggleModal} />,
            <RaisedButton
                label='Simpan'
                onClick={() => {
                    const btn = ReactDOM.findDOMNode(this.refs.submit)
                    btn.click()
                }}
                primary={true} />
            ]
    }

    _handleSubmit(e) {
        e.preventDefault()
        const title = this.refs.title.getValue()
        const duration = this.refs.duration.getValue()

        ExamService(this.context.groupId)
            .create({title, duration})
            .then(r => {
                console.log(r.data)
            })
            .catch(rs => {
                console.log(r)
            })
    }

    render() {
        return (
            <Dialog
                contentStyle={{width: 450}}
                title={this._getTitle()}
                open={this.props.open}
                actions={this._actions()}
                modal={true} >

                <form ref="form" onSubmit={this._handleSubmit.bind(this)}>
                    <div>
                    <TextField
                        hintText='Judul evaluasi'
                        ref='title'
                        disabled={this.state.loading}
                        autoFocus={true}
                        fullWidth={true}
                        autoComplete={false}
                        />
                    </div>

                    <div>
                    <TextField
                        hintText='Durasi'
                        ref='duration'
                        disabled={this.state.loading}
                        autoComplete={false}
                        />
                    menit
                    </div>
                    <input type="submit" style={{display: 'none'}} ref='submit' />
                </form>

            </Dialog>
        )
    }
}

NewExamDialog.contextTypes = {
    groupId: React.PropTypes.string
}

export default NewExamDialog
