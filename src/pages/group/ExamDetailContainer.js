import React from 'react'
import {connect} from 'react-redux'
import Loading from '../../components/Loading'
import ExamService from '../../api/exam'

class ExamDetailContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            examId: this.props.params.examId,
            exam: null,
            loading: false
        }
    }
    getChildContext() {
        return {
            examId: this.state.examId,
            exam: this.state.exam
        }
    }
    componentDidMount() {
        this.getExam()
    }
    getExam() {
        var exam
        try {
            exam = this.props.exams.items[this.context.groupId]
                .filter(a => {
                    return a.id == this.state.examId
                })[0]
            this.setState({ exam })
        } catch(e) {
            console.log(e)
        }

        if (!exam) {
            this.setState({ loading: true })

            ExamService(this.context.groupId)
                .get(this.state.examId)
                .then(r => {
                    console.log(r.data)
                    this.setState({ loading: false, exam: r.data })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    render() {
        console.log(this.state.exam)
        var renderExamDetail
        if (this.state.loading) {
            renderExamDetail = <Loading />
        } else if (!this.state.loading && this.state.exam) {
            renderExamDetail = this.props.children
        } else {
            renderExamDetail = <span>Not found </span>
        }
        return <div>{renderExamDetail}</div>
    }
}

const stateToProps = state => ({
    exams: state.exams
})

ExamDetailContainer.contextTypes = {
    groupId: React.PropTypes.string
}
ExamDetailContainer.childContextTypes = {
    examId: React.PropTypes.string,
    exam: React.PropTypes.object
}

export default connect(stateToProps, null)(ExamDetailContainer)
