import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'


const VideoTable = function(props) {
    console.log(props.items)
    const video = Object.keys(props.items).map(function(key) {
        return (
            <tr key={key}>
                <td>
                    <a href={`https://www.youtube.com/watch?v=${props.items[key].youtube_id}`} target='_blank'>
                    <img src={`http://img.youtube.com/vi/${props.items[key].youtube_id}/default.jpg`} />
                    </a>
                </td>
                <td>
                    <a href={`https://www.youtube.com/watch?v=${props.items[key].youtube_id}`} target='_blank'>
                        {props.items[key].title}
                    </a>
                </td>
                <td>
                    {props.items[key].description}
                </td>
                <td>
                    <FlatButton label='Hapus' secondary={true} />
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-striped" style={{marginTop: 25}}>
            {video}
        </table>
    )
}

export default VideoTable