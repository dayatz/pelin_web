import React from 'react'
import LessonItem from './LessonItem'
import Masonry from 'react-masonry-component'
import LessonService from '../../../api/lesson'
import { lessonRemoveAction } from '../../../actions/lesson'

class LessonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            masonry: null
        }
    }
    componentDidMount() {
        this.setState({ masonry: this.refs.masonry })
    }
    getChildContext() {
        return {
            masonry: this.state.masonry
        }
    }
    onDeleteClick(lesson) {
        if (confirm('Hapus materi ?')) {
            this.context.store.dispatch(
                lessonRemoveAction(this.context.groupId, lesson.id)
            )
            LessonService(this.context.groupId)
                .delete(lesson.id)
                .then(r => {
                    console.log(r)
                })
                .catch(error => {
                    console.log(error)
                })
        }
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
            <Masonry ref='masonry'>
                {renderLesson}
            </Masonry>
        )
    }
}
LessonList.childContextTypes = {
    masonry: React.PropTypes.object
}
LessonList.contextTypes = {
    groupId: React.PropTypes.string,
    store: React.PropTypes.object
}

export default LessonList
