import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import NewLessonForm from '../../components/group/lesson/NewLessonForm.js'

class LessonAdd extends React.Component {
    componentWillMount() {
        if (!this.context.group.is_owner) {
            this.context.router.replace(`/groups/${this.context.groupId}/lessons`)
        }
    }
    render () {
        return (
            <div className='col-md-10 col-md-offset-1' style={{ float: 'none' }}>
                <NewLessonForm />
            </div>
        )
    }
}

LessonAdd.contextTypes = {
    router: React.PropTypes.object,
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default LessonAdd
