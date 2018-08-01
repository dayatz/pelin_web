import React from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'

import Paper from 'material-ui/lib/paper'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from "material-ui/lib/raised-button";

import GroupList from '../../components/group/group/GroupList'
import GroupModal from '../../components/group/group/GroupModal'
import FabAdd from '../../components/FabAdd'
import Loading from '../../components/Loading'
import Help from '../../components/Help'

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
        this.context.setPageTitle('Group Anda')
    }

    _toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    renderAddGroupButton() {
        if (this.context.auth.user.is_teacher) {
            return (
                <div>
                    <FabAdd onTouchTap={this._toggleModal.bind(this)} />
                    <GroupModal
                        edit={false}
                        toggleModal={this._toggleModal.bind(this)}
                        open={this.state.openModal} />
                </div>
            )
        }
        return
    }
    render() {
        var renderGroupList;
        if (this.props.myGroups.isLoading) {
            // TODO: render loading message
            renderGroupList = <Loading />
        } else {
            if (this.props.myGroups.ids.length) {
                const myGroups = getMyGroups(this.context.store.getState())
                renderGroupList = <GroupList groups={myGroups} />
            } else {
                renderGroupList = <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 450, flexDirection: 'column'}}>
                        <p>Anda belum memiliki grup.</p>
                        <RaisedButton onTouchTap={() => { this.context.router.push("/groups") }} label='gabung sekarang' secondary={true} style={{marginLeft: 8}} />
                  </div>;
            }
        }
        return (
            <div>
                <Help text='Ini adalah halaman list group yang anda ikuti.' />
                <Paper className='paper' style={{padding: '30px 15px'}}>
                {this.renderAddGroupButton()}
                {renderGroupList}
                </Paper>
            </div>
        )
    }
}

Home.contextTypes = {
  store: React.PropTypes.object,
  auth: React.PropTypes.object,
  setPageTitle: React.PropTypes.func,
  router: React.PropTypes.object
};

const mapStateToProps = state => ({
    myGroups: state.myGroups
    // myGroups: getMyGroups(state)
})

const mapDispatchToProps = dispatch => ({
    fetchMyGroups: () => {
        dispatch(fetchMyGroups())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home
