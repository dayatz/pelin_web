import React from 'react'
import ReactDOM from 'react-dom'

import Paper from 'material-ui/lib/paper'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'

import {QuestionService} from '../../api/exam'
import Loading from '../../components/Loading'
import FabAdd from '../../components/FabAdd'


class ExamQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            questions: [],
            openModal: false,
            saving: false
        }
    }
    componentDidMount() {
         this.loadQuestions()
    }
    loadQuestions() {
        QuestionService(this.context.groupId, this.context.examId)
           .all()
           .then(r => {
               this.setState({loading: false, questions: r.data})
           })
           .catch(er => {
               console.log(er)
               this.setState({loading: false, questions: []})
           })
    }
    _toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    _saveQuestion() {
        const btn = ReactDOM.findDOMNode(this.refs.submit)
        btn.click()
    }
    _onSubmit(e) {
        e.preventDefault()
        this.setState({saving: true})

        const text = this.refs.text.getValue()
        const answer_a = this.refs.answer_a.getValue()
        const answer_b = this.refs.answer_b.getValue()
        const answer_c = this.refs.answer_c.getValue()
        const answer_d = this.refs.answer_d.getValue()
        const answer_key = this.refs.answer_key.getSelectedValue()

        QuestionService(this.context.groupId, this.context.examId)
            .create({text, answer_key, answer_a, answer_b, answer_c, answer_d})
            .then(r => {
                this.loadQuestions()
                this.setState({saving: false})
                this._toggleModal()
            })
            .catch(er => {
                console.log(er)
            })
    }
    _handleDelete(id) {
        if (confirm('Hapus pertanyaan ini ?')) {
            QuestionService(this.context.groupId, this.context.examId)
                .delete(id)
                .then(r => {
                    this.loadQuestions()
                })
                .catch(er => {
                    console.log(er)
                })
        }
    }

    render() {
        var renderQuestions
        if (this.state.loading) {
            renderQuestions = <Loading />
        } else if (!this.state.loading && this.state.questions.length) {
            const style = (k, a) => {
                console.log(k, a)
                if (k == a) {
                    return {borderLeft: '3px solid #009688', paddingLeft: 3}
                }
            }
            renderQuestions = this.state.questions.map(q => {
                return (
                <Paper key={q.id} style={{padding: 16, marginBottom: 6}}>
                    <p>{q.text}</p>

                    <p><span style={style(q.answer_key, 'a')}>A. </span>{q.answer_a}</p>
                    <p><span style={style(q.answer_key, 'b')}>B. </span>{q.answer_b}</p>
                    <p><span style={style(q.answer_key, 'c')}>C. </span>{q.answer_c}</p>
                    <p><span style={style(q.answer_key, 'd')}>D. </span>{q.answer_d}</p>

                    <RaisedButton
                        label='Hapus'
                        onTouchTap={() => {
                            this._handleDelete(q.id)
                        }} />
                </Paper>
                )
            })
        } else {
            renderQuestions = <p>Belum ada pertanyaan</p>
        }

        const actions = [
            <FlatButton
                label='Batal'
                disabled={this.state.saving}
                onClick={this._toggleModal.bind(this)} />,
            <RaisedButton
                label='Tambah'
                disabled={this.state.saving}
                onClick={this._saveQuestion.bind(this)}
                primary={true} />
        ]

        return (
            <div>
            <FabAdd
                className='lesson-add-fab'
                onTouchTap={this._toggleModal.bind(this)} />
            <Dialog
                contentStyle={{width: 450}}
                open={this.state.openModal}
                modal={true}
                title='Buat Pertanyaan'
                actions={actions}
                >
                <form ref='form' onSubmit={this._onSubmit.bind(this)}>
                    <div>
                    <TextField
                        hintText='Pertanyaan'
                        multiLine={true} rows={3}
                        fullWidth={true} autoFocus={true}
                        ref='text' required={true}
                        />
                    </div>

                    <div>
                        <div style={{float:'left'}}>
                        <RadioButtonGroup name='answer_key' ref='answer_key' style={{width: 60}} required={true}>
                            <RadioButton label='A' value='a' style={{marginTop: 13}} />
                            <RadioButton label='B' value='b' style={{marginTop: 17}} />
                            <RadioButton label='C' value='c' style={{marginTop: 21}} />
                            <RadioButton label='D' value='d' style={{marginTop: 22}} />
                        </RadioButtonGroup>
                        </div>

                        <div>
                            <div><TextField style={{marginLeft: 5}} id='a' name='answer_a' ref='answer_a' required={true} /></div>
                            <div><TextField style={{marginLeft: 5}} id='b' name='answer_b' ref='answer_b' required={true} /></div>
                            <div><TextField style={{marginLeft: 5}} id='c' name='answer_c' ref='answer_c' required={true} /></div>
                            <div><TextField style={{marginLeft: 5}} id='d' name='answer_d' ref='answer_d' required={true} /></div>
                        </div>
                    </div>
                    <button ref='submit' style={{display: 'none'}}></button>
                </form>
            </Dialog>
            <div className='col-md-8 col-md-offset-2'>{renderQuestions}</div>
            <div style={{clear: 'both'}} />
            </div>
        )
    }
}

ExamQuestions.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    examId: React.PropTypes.string,
    exam: React.PropTypes.object
}

export default ExamQuestions
