import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'

import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'

import GroupTabs from '../../components/group/group/GroupTabs'
import GroupDetailJoined from '../../components/group/group/GroupDetailJoined'
import GroupDetailNotJoined from '../../components/group/group/GroupDetailNotJoined'
import { fetchSingleGroup } from '../../actions/group'


class Group extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            groupId: this.props.params.groupId
        }
    }

    getChildContext() {
        return {
            groupId: this.props.params.groupId,
            group: this.props.groups.items[this.state.groupId]
        }
    }

    componentDidMount() {
        if (!this.props.groups.items[this.state.groupId]) {
            this.props.fetchSingleGroup(this.state.groupId)
        }
    }

    render() {
        const group = this.props.groups.items[this.state.groupId]

        var renderGroupDetail
        if (group) {
            if (group.is_owner || group.is_joined) {
                renderGroupDetail = (
                    <GroupDetailJoined
                        location={this.props.location}
                        children={this.props.children} />
                )
            } else {
                renderGroupDetail = <GroupDetailNotJoined />
            }
        } else {
            renderGroupDetail = <span>Loading...</span>
        }

        return (
            <div>
                {renderGroupDetail}
            </div>
        )
    }
}

Group.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
}

Group.childContextTypes = {
    groupId: React.PropTypes.string,
    group: React.PropTypes.object
}

const mapStateToProps = state => ({
    groups: state.groups
})

const mapDispatchToProps = dispatch => ({
    fetchSingleGroup: (groupId) => {
        dispatch(fetchSingleGroup(groupId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Group)
