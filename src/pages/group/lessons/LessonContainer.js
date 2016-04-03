import React from 'react'

class LessonContainer extends React.Component {
    render() {
        return (
            <div>
                <h3>LessonContainer</h3>
                {this.props.children}
            </div>
        )
    }
}

export default LessonContainer
