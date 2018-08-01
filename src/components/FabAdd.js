import React from 'react'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'

const FabAdd = (props) => {
    return (
        <div style={{position: 'absolute', bottom: 24, right: 40}}>
        <FloatingActionButton
            mini={true}
            secondary={true}
            {...props}>
            <FontIcon className='material-icons'>add</FontIcon>
        </FloatingActionButton>
        </div>
    )
}

export default FabAdd
