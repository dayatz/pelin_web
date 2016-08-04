import React from 'react'

import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'

import Loading from '../../components/Loading'
import CountdownTimer from '../../components/CountdownTimer'
import ExamService, {QuestionService} from '../../api/exam'


class ExamAnswer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            loading: true,
            submit: false
        }
    }
    componentWillMount() {
        if (this.context.group.is_owner) {
            this.context.router.goBack()
        }
    }
    componentDidMount() {
        window.answers = {}
        QuestionService(this.context.groupId, this.context.examId)
            .all()
            .then(r => {
                this.setState({loading: false, questions: r.data})
            })
            .catch(er => {
                console.log(er)
            })
    }
    componentWillUnmount() {
        if (Object.keys(window.answers).length) {
            if (confirm('Keluar dari ujian akan otomatis mengumpulkan, keluar ?')) {
                this.answerNow()
            }
        }
    }
    _handleChange(e, v) {
        const val = v.split('-')
        const id = val[0]
        const answer = val[1]
        window.answers[id] = answer
    }
    answerNow() {
        const answer = JSON.stringify(window.answers)
        console.log(answer)
        ExamService(this.context.groupId)
            .answer(this.context.examId, {answer: answer})
            .then(r => {
                const score = r.data.score
                alert('Score anda: ' + score*100)
                this.context.router.replace(`/groups/${this.context.groupId}/exams`)
            })
            .catch(er => {
                console.log(er)
            })
    }

    render() {
        var renderQuestions
        if (this.state.loading) {
            renderQuestions = <Loading />
        } else if (!this.state.lading && this.state.questions.length) {
            renderQuestions = this.state.questions.map(q => {
                return (
                <Paper style={{padding: 16, marginBottom: 6}} key={q.id}>
                    <p>{q.text}</p>
                    <div>
                        <RadioButtonGroup name={`question-${q.id}`} onChange={this._handleChange.bind(this)} >
                            <RadioButton value={`${q.id}-a`} label={`A. ${q.answer_a}`} labelStyle={{fontWeight: 'normal'}} />
                            <RadioButton value={`${q.id}-b`} label={`B. ${q.answer_b}`} labelStyle={{fontWeight: 'normal'}} />
                            <RadioButton value={`${q.id}-c`} label={`C. ${q.answer_c}`} labelStyle={{fontWeight: 'normal'}} />
                            <RadioButton value={`${q.id}-d`} label={`D. ${q.answer_d}`} labelStyle={{fontWeight: 'normal'}} />
                        </RadioButtonGroup>
                    </div>
                </Paper>
                )
            })
        }
        return (
            <div>
            <div className='col-md-8 col-md-offset-2'>
                <div style={{marginBottom: 16}}>
                    <h5 style={{float:'left'}}>{this.context.exam.title}</h5>
                    <h5 style={{float:'right', marginLeft: 16}}>
                        <CountdownTimer
                            initialTimeRemaining={this.context.exam.duration*60*1000}
                            completeCallback={() => {
                                alert('Waktu habis!')
                                this.answerNow()
                            }} />
                    </h5>
                    <RaisedButton
                        primary={true}
                        label='Kumpulkan'
                        onClick={() => {
                            if(confirm('Kuis ini tidak bisa diulang kembali, kumpulkan?')) {
                                this.answerNow()
                            }
                        }}
                        style={{float: 'right'}} />
                    <div style={{clear:'both'}} />
                </div>
                <div>
                    {renderQuestions}
                </div>
            </div>
            <div style={{clear:'both'}} />
            </div>
        )
    }
}

ExamAnswer.contextTypes = {
    exam: React.PropTypes.object,
    examId: React.PropTypes.string,
    group: React.PropTypes.object,
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default ExamAnswer
