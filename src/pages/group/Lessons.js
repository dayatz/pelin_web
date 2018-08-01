import React from 'react'
import { connect } from 'react-redux'

import FabAdd from '../../components/FabAdd'
import Loading from '../../components/Loading'
import Help from '../../components/Help'
import LessonList from '../../components/group/lesson/LessonList'

import { fetchLessons } from '../../actions/lesson'

class Lessons extends React.Component {
    componentDidMount() {
        this.props.fetchLessons(this.context.groupId)
    }
    renderAddButton() {
        if (this.context.group.is_owner) {
            return (
                <FabAdd onClick={() => {
                    this.context.router.push(
                        `/groups/${this.context.groupId}/lessons/add`
                    )
                }} />
            )
        }
        return
    }
    render () {
        const lessons = this.props.lessons.items[this.context.groupId]
        if (lessons && lessons.length) {
            var renderLessonList = (
                    <LessonList lessons={lessons} />
            )
        } else if (lessons && !lessons.length) {
            var renderLessonList = ('No lessons found')
        } else {
            var renderLessonList = <Loading />
        }
        return (
            <div style={{ marginBottom: 30 }}>
                <Help text='Ini adalah halaman daftar materi yang sudah diupload oleh dosen.' />
                {this.renderAddButton()}
                {renderLessonList}
            </div>
        )
    }
}

Lessons.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object,
    router: React.PropTypes.object
}

const mapStateToProps = state => ({
    lessons: state.lessons
})

const mapDispatchToProps = dispatch => ({
    fetchLessons: (groupId) => {
        dispatch(fetchLessons(groupId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Lessons)
