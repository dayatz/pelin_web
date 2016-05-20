import React from 'react'
import shortid from 'shortid'

const Text = (props) => {
    const { text } = props
    const renderText = text.split('\n').map(t => {
        return (
            <span key={shortid.generate()}>
                {t}
                <br/>
            </span>
        )
    })
    return <span>{renderText}</span>
}

export default Text
