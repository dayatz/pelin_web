import React from 'react'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'

const FabAdd = (props) => {
    return (
        <FloatingActionButton
            mini={true}
            secondary={true}
            {...props}>
            <FontIcon className='material-icons'>add</FontIcon>
        </FloatingActionButton>
    )
}

export default FabAdd
