import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Link from 'react-router/lib/Link'

import { fetchVideo, deleteVideo } from '../../actions/video'
import VideoService from '../../api/video'
import VideoTable from '../../components/VideoTable'
import Loading from '../../components/Loading'


class Videos extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tokenIsValid: true
        }
    }
    componentWillMount() {
        var t = this

        VideoService.validateToken()
        .then(function(r){
            if (r.status == 200) {
                t.setState({ tokenIsValid: true })
            }
        })
        .catch(function(err) {
            t.setState({ tokenIsValid: false })
        })
    }
    componentDidMount() {
        this.props.fetchVideo()
    }

    deleteVideo(id, youtube_id) {
        if (confirm('Hapus vidio ini ?')) {
            this.props.deleteVideo(id)
            VideoService.delete(id)
                .then(function(r){
                    VideoService.deleteFromYoutube(youtube_id)
                })
            
        }
    }


    render() {
        var renderVideos
        if (!VideoService.getAccessToken() || !this.state.tokenIsValid) {
            renderVideos = (
            <a href={VideoService.authUrl()}>
                autentikasi gugel
            </a>
            )
        } else {
            const items = this.props.video.items
            if (this.props.video.isLoading && !Object.keys(items).length) {
                renderVideos = <Loading />
            } else {
                renderVideos = (
                    <div className='col-md-10 col-md-offset-1'>
                        <RaisedButton
                            style={{float: 'right'}}
                            containerElement={<Link to='videos/add' />}
                            primary={true}
                            label='Upload' />
                        <div style={{clear:'both'}}></div>
                        <VideoTable
                            delete={this.deleteVideo.bind(this)}
                            items={items} />
                    </div>
                )
            }
        }
        return (
            <div>
                {renderVideos}
            </div>
        )
    }
}

const stateToProps = state => ({
    video: state.video
})

const dispatchToProps = dispatch => ({
    fetchVideo: () => {
        dispatch(fetchVideo())
    },
    deleteVideo: (id) => {
        dispatch(deleteVideo(id))
    }
})

export default connect(stateToProps, dispatchToProps)(Videos)