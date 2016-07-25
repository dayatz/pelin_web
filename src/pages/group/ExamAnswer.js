import React from 'react'
import ExamService from '../../api/exam'


class ExamAnswer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            loading: false
        }
    }
    componentWillMount() {
        if (this.context.group.is_owner) {
            this.context.router.goBack()
        }
    }
    render() {
        return <div>ExamAnswer</div>
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
