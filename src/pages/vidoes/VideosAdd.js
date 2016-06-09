import React from 'react'
import VideoService from '../../api/video'

export default class VideosAdd extends React.Component {
    render() {
        var renderForm
        if (!VideoService.getAccessToken()) {
            renderForm = (
            <a href={VideoService.authUrl()}>
                autentikasi gugel
            </a>
            )
        } else {
            renderForm = <div>VideosAdd</div>
        }


        return (
            <div>{renderForm}</div>
        )
    }
}
