import React from 'react'
import Paper from 'material-ui/lib/paper'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GroupList from '../../components/group/GroupList'
import { fetchMyGroups } from '../../actions/group'
import { getMyGroups } from '../../reducers/group'
import GroupService from '../../api/group'

class Home extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         groups: null
    //     }
    // }
    componentDidMount() {
        // GroupService.myGroup()
        //     .then(r => {
        //         this.setState({
        //             groups: r.data
        //         });
        //     })
        this.props.fetchMyGroups()
    }
    render() {
        if (this.props.myGroups.isLoading) {
            // TODO: render loading message
            var renderGroupList = 'Loading...'
        } else {
            var renderGroupList = <GroupList groups={this.props.myGroups.items} />

        }
        return (
            <div>
                <h4>Grup Yang Diikuti</h4>
                {renderGroupList}
            </div>
        )
    }
}

Home.contextTypes = {
    store: React.PropTypes.object
}

const mapStateToProps = state => ({
    myGroups: state.myGroups
    // myGroups: getMyGroups(state)
})

const mapDispatchToProps = dispatch => ({
    fetchMyGroups: () => {
        dispatch(fetchMyGroups())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home
