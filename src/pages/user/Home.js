import React from 'react'
import Paper from 'material-ui/lib/paper'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupList from '../../components/group/GroupList'
import { fetchMyGroups } from '../../actions/group'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchMyGroups();
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

const mapDispatchToProps = dispatch => ({
    fetchMyGroups: () => {
        dispatch(fetchMyGroups())
    }
});

export default connect(null, mapDispatchToProps)(Home)
