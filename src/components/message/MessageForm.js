import React from 'react'
import TextField from 'material-ui/lib/text-field'

class MessageForm extends React.Component {
    render() {
        return (
        <form>
            <TextField id='new-message' />
        </form>
        )
    }
}

export default MessageForm
