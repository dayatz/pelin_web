import React from 'react'
import Paper from 'material-ui/lib/paper'
import {Link} from 'react-router'
import GroupList from '../../components/group/GroupList'

class Home extends React.Component {
    // componentDidMount() {
    //     this.props.fetchAllGroup();
    // }
    componentDidMount() {
        console.log(this.context.store.getState());
    }
    render() {
        // if (this.props.groups.data.length) {
        //     var renderGroupList = <GroupList groups={this.props.groups.data} />
        // } else if (!this.props.groups.data.length && this.props.groups.error) {
        //     // TODO: render error message
        //     var renderGroupList = 'terjadi kesalahan'
        // } else {
        //     // TODO: render loading message
        //     var renderGroupList = 'Loading...'
        //
        // }
        return (
            <div>
                <h4>Grup Yang Diikuti</h4>
                {/*{renderGroupList}*/}
            </div>
        )
    }
}

Home.contextTypes = {
    store: React.PropTypes.object
}

export default Home
