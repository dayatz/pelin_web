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
            <div>
                <div>
                    <h5>Tambah Materi</h5>
                </div>
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
