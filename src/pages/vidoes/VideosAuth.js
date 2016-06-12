import React from 'react'
import VideoService from '../../api/video'


export default class VideosAuth extends React.Component {
    componentDidMount() {
        const hash = this.props.location.hash
        const accessToken = hash.split('&')[0].split('=')[1]

        VideoService.setAccessToken(accessToken)
        this.context.router.replace('/videos')
    }

    render() {
        return null
    }
}

VideosAuth.contextTypes = {
    router: React.PropTypes.object
}