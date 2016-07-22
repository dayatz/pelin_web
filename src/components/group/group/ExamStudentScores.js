import React from 'react'
import Paper from 'material-ui/lib/paper'
import ListItem from 'material-ui/lib/lists/list-item'
import List from 'material-ui/lib/lists/list'
import Avatar from 'material-ui/lib/avatar'
import { materialLetter } from '../../../config'
import ExamService from '../../../api/exam'
import Loading from '../../Loading'


class ExamStudentScores extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
            students: null
        }
    }

    componentDidMount() {
        ExamService(this.context.groupId)
            .scores(this.context.examId)
            .then(r => {
                this.setState({loading: false, students: r.data})
            })
            .catch(rs => {
                console.log(rs)
            })
    }

    render() {
        var renderList 
        if (this.state.loading && !this.state.students) {
            renderList = <Loading />
        } else {
            var listItem = this.state.students.map(s => {
                var photo
                if (s.user.photo.hasOwnProperty('small')) {
                    photo = s.user.photo.small
                } else {
                    photo = materialLetter(s.user.name.charAt(0))
                }

                return (
                <ListItem
                    key={s.id}
                    leftAvatar={<Avatar src={photo} />}
                    primaryText={s.user.name}
                    secondaryText={s.user.student.nim}
                    rightIcon={<span>{s.score*100}</span>} />
                )
            })
            renderList = (
                <div>{listItem}</div>
            )
        }

        return (this.state.students && this.state.students.length) ?
        (
            <Paper style={{marginTop: 8}}>{renderList}</Paper>
        ) : <span />
    }
}

ExamStudentScores.contextTypes = {
    groupId: React.PropTypes.string,
    examId: React.PropTypes.string
}

export default ExamStudentScores
