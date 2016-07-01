import React from 'react'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'
import Dialog from 'material-ui/lib/dialog'


export class Help extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            open: false
        }
    }
    _toggleModal() {
        this.setState({open: !this.state.open})
    }
    render() {
        return (
            <div>
                <FloatingActionButton
                    mini={true}
                    onTouchTap={this._toggleModal.bind(this)}
                    >
                    <FontIcon className='material-icons'>help_outline</FontIcon>
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width: 450}}
                    title='Info'
                    open={this.props.open}
                    actions={actions}
                    modal={true} />
                </Dialog>
            </div>
        )
    }
}

