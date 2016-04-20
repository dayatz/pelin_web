import React from 'react'
import LessonItem from './LessonItem'

const LessonList = (props) => {
    var renderLesson = props.lessons.map(lesson => {
        return (
            <div key={lesson.id}>
                <LessonItem lesson={lesson} />
            </div>
        )
    })
    return (
        <div>{renderLesson}</div>
    )
}

export default LessonList
