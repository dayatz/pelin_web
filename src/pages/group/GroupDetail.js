import React from 'react'
import Paper from 'material-ui/lib/paper'
import GroupTabs from '../../components/group/GroupTabs'

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

        const group = this.context.store.getState().groups.items[groupId];
        this.setState({ group });
        // TODO: get group on page refresh, and save group to store
    }

    componentDidMount() {
        // const group = this.context.store.getState().groups.items[groupId];
        // this.setState({ group });
        if (!this.state.group) {
            // TODO: dispatch fetchSingleGroup(groupId);
        }
    }

    render() {
        if (this.state.group) {
            var renderGroupDetail = (
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
        } else {
            var renderGroupDetail = <span>Loading...</span>
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
    groupId: React.PropTypes.string
}

export default Group
