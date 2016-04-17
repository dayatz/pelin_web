import React from 'react'
import Paper from 'material-ui/lib/paper'
import GroupTabs from '../../components/group/GroupTabs'
import { groupById } from '../../reducers/group'

class Group extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: null,
            group: null
        }
    }

    getChildContext() {
        return {
            groupId: this.state.groupId
        }
    }

    componentWillMount() {
        const groupId = this.props.params.groupId;
        this.setState({ groupId });

        const group = groupById(this.context.store.getState(), groupId);
        this.setState({ group });
        // TODO: get group on page refresh, and save group to store
    }

    render() {
        return (
            <div>
            <h4>{this.state.group.title}</h4>
            <Paper>
                <GroupTabs router={this.context.router} groupId={this.state.groupId} />
                <div>
                    {this.props.children}
                </div>
            </Paper>
            </div>
        )
    }
}

Group.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
}

Group.childContextTypes = {
    groupId: React.PropTypes.string
}

export default Group
