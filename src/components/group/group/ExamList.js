import React from 'react'
import ExamService from '../../../api/exam'
import ExamItem from './ExamItem'


class ExamList extends React.Component {
    deleteItem(examId) {
        ExamService(this.context.groupId)
            .delete(examId)
            .then(r => {
                this.context.store.dispatch({
                    type: 'EXAM_DELETE',
                    groupId: this.context.groupId,
                    id: examId
                })
                this.context.showSnackbar('Berhasil dihapus.')
            })
    }
    examDetail(examId) {
        this.context.router.push(`/groups/${this.context.groupId}/exams/${examId}`)
    }

    render() {
        var renderExam = this.props.exams.map(e => {
            return (
                <ExamItem
                    key={e.id}
                    exam={e}
                    deleteItem={this.deleteItem.bind(this)}
                    examDetail={this.examDetail.bind(this)} />
            )
        })

        return (
            <div className='assignment-list'>
                {renderExam}
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}

ExamList.contextTypes = {
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default ExamList
