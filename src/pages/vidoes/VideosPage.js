import React from 'react'
import Paper from 'material-ui/lib/paper'

export default class VideosPage extends React.Component {
    render() {
        return (
            <Paper className='paper' style={{padding: 30}}>
                {this.props.children}
            </Paper>
        );
    }
}
