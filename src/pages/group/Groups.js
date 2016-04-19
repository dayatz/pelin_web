import React from 'react'
import GroupService from '../../api/group'
import GroupList from '../../components/group/GroupList'
import { fetchAllGroup } from '../../actions/group'
import { connect } from 'react-redux'

class Groups extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         groups: null,
    //         isError: false,
    //         error: null
    //     }
    // }

    componentDidMount() {
        // GroupService.fetchAll()
        //     .then(r => {
        //         this.setState({groups: r.data});
        //     })
        this.props.fetchAllGroup();
    }

    render() {
        // TODO: render error messages
        if (!this.props.groups.items) {
            // TODO: render loading message
            var renderGroupList = 'Loading...'
        } else {
            var renderGroupList = <GroupList groups={this.props.groups.items} />
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
