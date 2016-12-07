import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import List from 'material-ui/lib/lists/list'
import ConversationItem from './ConversationItem.js'

export default function ConversationList(props) {
    // var items = []
    // for (var id in props.conversations) {
    //     items.push(
    //         <ConversationItem
    //             key={id}
    //             removeConversation={props.removeConversation}
    //             conversation={props.conversations[id]} />
    //     )
    // }
    console.log(props.conversations)
    var items = props.conversations.map(c => {
        return (
            <ConversationItem
                key={c.id}
                removeConversation={props.removeConversation}
                conversation={c} />
        )
    })

    return (
        <div>
            <IconButton style={{float:'right'}} onTouchTap={props.newConversation}>
                <FontIcon color='#616161' className='material-icons'>border_color</FontIcon>
            </IconButton>
            <div style={{clear:'both'}}/>
            <List>{items}</List>
        </div>
    )
}