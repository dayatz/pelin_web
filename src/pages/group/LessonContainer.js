import React, { PropTypes } from 'react'

class LessonContainer extends React.Component {
    render () {
        return <div>{this.props.children}</div>
    }
}

export default LessonContainer;
