import React, { PropTypes } from 'react'

class Posts extends React.Component {
    render () {
        return <span>posts</span>
    }
}

Posts.contextTypes = {
    groupId: PropTypes.string
}

export default Posts;
