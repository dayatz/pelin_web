import React from 'react'
import Paper from 'material-ui/lib/paper'

const Group = (props) => {
    return (
        <Paper>
            <p>{props.group.title}</p>
        </Paper>
    )
}

export default Group
