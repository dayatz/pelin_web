import React from 'react'
import CircularProgress from 'material-ui/lib/circular-progress'

export default function Loading(props) {
    const style = {
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
    return (
        <div style={style}>
            <CircularProgress size={0.7} />
        </div>
    )
}