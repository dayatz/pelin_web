import React from 'react'
import { connect } from 'react-redux'

import FabAdd from '../../components/FabAdd'
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
                    this.context.router.replace(
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
                <div>
                    {this.renderAddButton()}
                    <LessonList lessons={lessons} />
                </div>
            )
        } else if (lessons && !lessons.length) {
            var renderLessonList = (
                <div>
                    No lessons found
                    {this.renderAddButton()}
                </div>
            )
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
