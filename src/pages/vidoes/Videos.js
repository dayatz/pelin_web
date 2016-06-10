import React from 'react'
import Youtube from 'react-youtube'

export default class Videos extends React.Component {
    render() {
        const opts = {
          // height: '390',
          width: '100%',
        };
        return (
            <div>
                <div className='col-md-6'>
                <Youtube
                    opts={opts}
                    videoId='BrZlErPS8w4'/>
                </div>
                <div className='col-md-6'>
                <Youtube opts={opts}
                    videoId='BrZlErPS8w4'/>
                </div>
            </div>
        )
    }
}
