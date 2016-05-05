import React from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'

import Paper from 'material-ui/lib/paper'
import Dialog from 'material-ui/lib/dialog'

import GroupList from '../../components/group/group/GroupList'
import GroupModal from '../../components/group/group/GroupModal'
import FabAdd from '../../components/FabAdd'

import { fetchMyGroups } from '../../actions/group'
import { getMyGroups } from '../../reducers/group'
import GroupService from '../../api/group'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }
    }
    componentDidMount() {
        this.props.fetchMyGroups()
    }

    _toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    renderAddGroupButton() {
        if (this.context.auth.user.is_teacher) {
            return (
                <div>
                    <FabAdd onClick={this._toggleModal.bind(this)} />
                    <GroupModal
                        toggleModal={this._toggleModal.bind(this)}
                        open={this.state.openModal} />
                </div>
            )
        }
        return;
    }
    render() {
        if (this.props.myGroups.isLoading) {
            // TODO: render loading message
            var renderGroupList = 'Loading...'
        } else {
            if (this.props.myGroups.ids.length) {
                const myGroups = getMyGroups(this.context.store.getState())
                var renderGroupList = <GroupList groups={myGroups} />
            } else {
                var renderGroupList = 'belum ada group'
            }
        }
        return (
            <div>
                <h4>Grup Yang Diikuti</h4>
                {this.renderAddGroupButton()}
                {renderGroupList}
            </div>
        )
    }
}

Home.contextTypes = {
    store: React.PropTypes.object,
    auth: React.PropTypes.object
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
