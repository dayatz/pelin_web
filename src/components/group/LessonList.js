import React from 'react'
import LessonService from '../../api/lesson'
import { lessonRemoveAction } from '../../actions/lesson'
import LessonItem from './LessonItem'

class LessonList extends React.Component {
    onDeleteClick(lesson) {
        this.context.store.dispatch(
            lessonRemoveAction(this.context.groupId, lesson.id)
        );
        LessonService(this.context.groupId)
            .delete(lesson.id)
            .then(r => {
                console.log(r);
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        var renderLesson = this.props.lessons.map(lesson => {
            return (
                <div key={lesson.id}>
                    <LessonItem
                        onDeleteClick={this.onDeleteClick.bind(this)}
                        lesson={lesson} />
                </div>
            )
        })
        return (
            <div>{renderLesson}</div>
        )
    }
}

LessonList.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object
}

export default LessonList
