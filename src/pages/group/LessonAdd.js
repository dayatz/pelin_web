import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'

class LessonAdd extends React.Component {
    componentWillMount() {
        if (!this.context.group.is_owner) {
            this.context.router.replace(`/groups/${this.context.groupId}/lessons`)
        }
    }
    backButton() {
        this.context.router.replace(`/groups/${this.context.groupId}/lessons`)
    }
    render () {
        return (
            <div>
                <div>
                    <FlatButton label='< Back'
                        onClick={this.backButton.bind(this)} />
                </div>
                LessonAdd
            </div>
        )
    }
}

LessonAdd.contextTypes = {
    router: React.PropTypes.object,
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default LessonAdd;
