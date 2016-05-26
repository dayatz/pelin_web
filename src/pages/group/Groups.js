import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import GroupService from '../../api/group'
import GroupList from '../../components/group/group/GroupList'

import { fetchAllGroup } from '../../actions/group'


class Groups extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup()
    }
    join(groupId) {
        GroupService.join(groupId)
            .then(r => {
                console.log(r)
            })
    }
    cancel(groupId) {
        GroupService.cancel(groupId)
            .then(r => {
                console.log(r)
            })
    }

    render() {
        const groups = this.props.groups.items
        if (!groups) {
            // TODO: render loading message
            var renderGroupList = 'Loading...'
        } else {
            var renderGroupList = <GroupList
                join={this.join.bind(this)}
                cancel={this.cancel.bind(this)}
                groups={groups} />
        }

        return (
            <Paper className='paper' style={{padding: '30px 15px'}}>
                {renderGroupList}
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups
})

const mapDispatchToProps = dispatch => ({
    fetchAllGroup: () => {
        dispatch(fetchAllGroup())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
