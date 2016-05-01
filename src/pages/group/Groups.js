import React from 'react'
import GroupService from '../../api/group'
import GroupList from '../../components/group/GroupList'
import { fetchAllGroup } from '../../actions/group'
import { connect } from 'react-redux'

class Groups extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup();
    }

    render() {
        // TODO: render error messages
        const groups = this.props.groups.items
        console.log(groups)
        if (!groups) {
            // TODO: render loading message
            var renderGroupList = 'Loading...'
        } else {
            var renderGroupList = <GroupList groups={groups} />
        }

        return (
            <div>
                <h4>Semua Grup</h4>
                {renderGroupList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    fetchAllGroup: () => {
        dispatch(fetchAllGroup())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
