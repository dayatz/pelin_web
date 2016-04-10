import React from 'react'
import Paper from 'material-ui/lib/paper'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {fetchAllGroup} from '../../actions/group'
import GroupList from '../../components/group/GroupList'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup();
        console.log(this.props);
    }
    render() {
        if (this.props.groups.data.length) {
            var renderGroupList = <GroupList groups={this.props.groups.data} />
        } else {
            var renderGroupList = 'Loading...'
        }
        return (
            <div>
                <h4>My Groups</h4>
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
