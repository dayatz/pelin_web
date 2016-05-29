import React from 'react'
import {customMoment, formatDateTime } from '../config/customMoment.js'

const Time = function(props) {
    if (props.style) {
        var style = props.style
    } else {
        var style = { color: '#9E9E9E', fontSize: 12 }
    }
    return (
        <p {...props} style={style}
            title={formatDateTime(props.isoDate)}>
            {customMoment(props.isoDate).fromNow()}
        </p>
    )
}

export default Time
