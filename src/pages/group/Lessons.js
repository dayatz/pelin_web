import React from 'react'
import { connect } from 'react-redux'
import LessonList from '../../components/group/LessonList'
import { fetchLessons } from '../../actions/lesson'

class Lessons extends React.Component {
    componentDidMount() {
        this.props.fetchLessons(this.context.groupId)
    }
    render () {
        const lessons = this.props.lessons.items[this.context.groupId];
        if (lessons) {
            var renderLessonList = <LessonList lessons={lessons} />
        } else {
            var renderLessonList = <span>Loading...</span>
        }
        return (
            <div>{renderLessonList}</div>
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
