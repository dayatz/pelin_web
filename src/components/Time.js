import React from 'react'
import {customMoment, formatDateTime } from '../config/customMoment.js'

const Time = (props) => {
    const { isoDate } = props
    if (props.style) {
        var style = props.style
    } else {
        var style = { color: '#9E9E9E', fontSize: 12 }
    }
    return (
        <p {...props} style={style}
            title={formatDateTime(isoDate)}>
            {customMoment(isoDate).fromNow()}
        </p>
    )
}

export default Time
