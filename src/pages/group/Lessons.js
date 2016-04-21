import React from 'react'
import { connect } from 'react-redux'
import LessonList from '../../components/group/LessonList'
import { fetchLessons } from '../../actions/lesson'

class Lessons extends React.Component {
    componentDidMount() {
        console.log('[Lessons] mounted');
        this.props.fetchLessons(this.context.groupId)
    }
    render () {
        const lessons = this.props.lessons.items[this.context.groupId];
        if (lessons && lessons.length) {
            var renderLessonList = <LessonList lessons={lessons} />
        } else if (lessons && !lessons.length) {
            var renderLessonList = <span>No lessons found</span>
        } else {
            var renderLessonList = <span>Loading...</span>
        }
        return (
            <div>
                {renderLessonList}
            </div>
        )
    }
}

Lessons.contextTypes = {
    groupId: React.PropTypes.string
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
