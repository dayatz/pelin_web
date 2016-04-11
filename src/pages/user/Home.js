import React from 'react'
import Paper from 'material-ui/lib/paper'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {fetchAllGroup} from '../../actions/group'
import GroupList from '../../components/group/GroupList'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup();
    }
    render() {
        if (this.props.groups.data.length) {
            var renderGroupList = <GroupList groups={this.props.groups.data} />
        } else if (!this.props.groups.data.length && this.props.groups.error) {
            // TODO: render error message
            var renderGroupList = 'terjadi kesalahan'
        } else {
            // TODO: render loading message
            var renderGroupList = 'Loading...'

        }
        return (
            <div>
                <h4>Grup Yang Diikuti</h4>
                {renderGroupList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    fetchAllGroup: () => { dispatch(fetchAllGroup()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
