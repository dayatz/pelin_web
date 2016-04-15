import React from 'react'
import Paper from 'material-ui/lib/paper'
import { Link } from 'react-router'

const Group = (props) => {
    // TODO: design single group card
    return (
        <Paper>
            <p>{props.group.title}</p>
            <Link to={`/groups/${props.group.id}`}>view</Link>
        </Paper>
    )
}

export default Group
