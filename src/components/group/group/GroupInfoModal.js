import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'

export default function GroupInfoModal(props, context) {
    const actions = [
        <RaisedButton
            label='Ok'
            onClick={() => {
                props.toggleModal()
            }} />
    ]
    var description
    if (context.group.description) {
        description = <p>Deskripsi: {context.group.description} </p>
    }
    return (
        <Dialog
            contentStyle={{width: 450}}
            title={context.group.title}
            open={props.open}
            actions={actions}>
            <hr />
            <p>Dosen: {context.group.teacher.name} </p>
            {description}
            <p>Jurusan:    {context.group.major}</p>
            <p>Semester:   {context.group.semester}</p>
        </Dialog>
    )
}

GroupInfoModal.contextTypes = {
    group: React.PropTypes.object
}