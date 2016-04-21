import React from 'react'
import TextField from 'material-ui/lib/text-field'

class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        }
    }
    
    handleChange(e) {
        this.setState({ commentText: e.target.value })
    }

    render() {
        const post = this.props.post;
        return (
            <div>
                <div>
                    <b>{post.user.name}</b>
                    <span>:{post.text}</span>
                    {this.state.commentText}
                </div>
                <TextField
                    value={this.state.commentText}
                    id={post.id.toString()}
                    multilie={true}
                    onChange={this.handleChange.bind(this)}
                    />
            </div>
        )
    }
}

export default PostItem
