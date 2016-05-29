import React from 'react'
import shortid from 'shortid'

const Text = function(props) {
    const renderText = props.text.split('\n').map(t => {
        return (
            <span key={shortid.generate()}>
                {t}
                <br/>
            </span>
        )
    })
    return <span style={props.style}>{renderText}</span>
}

export default Text
