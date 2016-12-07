import React from 'react'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import FontIcon from 'material-ui/lib/font-icon'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'


class Help extends React.Component {
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
        const actions = [
            <RaisedButton 
                label='OK'
                primary={true}
                onTouchTap={this._toggleModal.bind(this)}
                />
        ]
        return (
            <div style={{position: 'absolute', bottom: 20, left: 35}}>
                <FloatingActionButton
                    mini={true}
                    onTouchTap={this._toggleModal.bind(this)}
                    >
                    <FontIcon className='material-icons'>help_outline</FontIcon>
                </FloatingActionButton>
                <Dialog
                    contentStyle={{width: 450}}
                    title='Info'
                    open={this.state.open}
                    actions={actions}
                    modal={true}>
                    <p>{this.props.text}</p>
                </Dialog>
            </div>
        )
    }
}

export default Help