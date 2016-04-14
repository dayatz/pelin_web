import React from 'react'
import Paper from 'material-ui/lib/paper'

const Group = (props) => {
    // TODO: design single group card
    return (
        <Paper>
            <p>{props.group.title}</p>
        </Paper>
    )
}

export default Group
