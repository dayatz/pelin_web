import React from 'react'
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'
import Time from '../../components/Time'
import Text from '../../components/Text'

class ExamDetail extends React.Component {
    render() {
        const description = this.context.exam.description ? (
            <Text text={this.context.exam.description} />
        ) : null

        const actionBtn = (!this.context.exam.score && !this.context.group.is_owner) ? (
            <RaisedButton
                label={`Ujian sekarang (${this.context.exam.duration} menit)`}
                primary={true}
                fullWidth={true} />
        ) : null

        const score = this.context.exam.score ? (
            <Paper style={{padding: 16, color: '#fff', backgroundColor: '#2196F3'}}>
                <span>Score</span>
                <span style={{float: 'right', fontSize: 22}}>{this.context.exam.score*100}</span>
            </Paper>
        ) : null

        const studentScores = this.context.group.is_owner ? (
            null
        ) : null

        return (
            <div>
                <div className='col-md-6 col-md-offset-3'>
                    {score}
                    <Paper style={{padding: 16, marginTop: 8}}>
                        <p className='assignment-info__title'>{this.context.exam.title}</p>
                        <Time isoDate={this.context.exam.created_at} />
                        {description}
                    </Paper>
                    {actionBtn}
                    {studentScores}
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

ExamDetail.contextTypes = {
    exam: React.PropTypes.object,
    examId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default ExamDetail
