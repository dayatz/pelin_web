import React from 'react'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'
import GroupForm from '../../components/group/GroupForm'


class GroupModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    _toggleLoading() {
        this.setState({ loading: !this.state.loading })
    }
    render() {
        const actions = [
            <FlatButton
                label='Batal'
                onClick={this.props.toggleModal} />,
            <RaisedButton
                label='Simpan'
                onClick={() => {
                    this.refs.groupForm.refs.btnSubmit.click()
                }}
                primary={true} />
        ]
        return (
            <Dialog
                title='Edit Grup'
                open={this.props.open}
                actions={actions}
                modal={true} >

                <GroupForm
                    toggleLoading={this._toggleLoading.bind(this)}
                    toggleModal={this.props.toggleModal}
                    openModal={this.props.open}
                    group={this.context.group}
                    ref='groupForm' />

            </Dialog>
        )
    }
}

GroupModal.contextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

export default GroupModal
