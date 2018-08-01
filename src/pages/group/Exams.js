import React from 'react'
import { connect } from 'react-redux'

import FabAdd from '../../components/FabAdd'
import Loading from '../../components/Loading'
import Help from '../../components/Help'
import ExamList from '../../components/group/group/ExamList'
import NewExamDialog from '../../components/group/group/NewExamDialog'
import {fetchAllExam} from '../../actions/exam'


class Exams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }
    }
    _toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    componentDidMount() {
        console.log(this.context.router)
        this.props.fetchAllExam(this.context.groupId)
    }
    renderAddBtn() {
        if (this.context.group.is_owner) {
            return (
                <div>
                <NewExamDialog
                    open={this.state.openModal}
                    toggleModal={this._toggleModal.bind(this)} />
                <FabAdd
                    onTouchTap={() => {
                        this._toggleModal()
                    }} />
                </div>
            )
        }
        return null
    }
    render() {
        const exams = this.props.exams.items[this.context.groupId]
        if (exams && exams.length) {
            var renderExamList = <ExamList exams={exams} />
        } else if (exams && !exams.length) {
            var renderExamList = <span>No exams</span>
        } else {
            var renderExamList = <Loading />
        }
        return (
            <div>
                <Help text='Ini adalah halaman daftar evaluasi, angka di sebelah kiri adalah score anda jika sudah mengambil ujian.' />
                {this.renderAddBtn()}
                {renderExamList}
            </div>
        )
    }
}

Exams.contextTypes = {
  group: React.PropTypes.object,
  router: React.PropTypes.object,
  groupId: React.PropTypes.string,
  auth: React.PropTypes.object
}

const stateToProps = (state) => ({
    exams: state.exams
})

const dispatchToProps = (dispatch) => ({
    fetchAllExam: (groupId) => {
        dispatch(fetchAllExam(groupId))
    }
})

export default connect(stateToProps, dispatchToProps)(Exams)
