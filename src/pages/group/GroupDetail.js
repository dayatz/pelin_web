import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import GroupTabs from '../../components/group/GroupTabs'
import { fetchSingleGroup } from '../../actions/group'

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
            groupId: this.state.groupId,
            group: this.state.group
        }
    }

    componentWillMount() {
        const groupId = this.props.params.groupId;
        this.setState({ groupId });

        // const group = this.context.store.getState().groups.items[groupId];
        // this.setState({ group });
        // TODO: get group on page refresh, and save group to store
    }

    componentDidMount() {
        // const group = this.context.store.getState().groups.items[groupId];
        // this.setState({ group });
        console.log(this.props.groups.items[this.state.groupId])
        if (!this.props.groups.items[this.state.groupId]) {
            this.props.fetchSingleGroup(this.state.groupId);
        }
    }

    render() {
        if (this.props.groups.items[this.state.groupId]) {
            const group = this.props.groups.items[this.state.groupId];
            var renderGroupDetail = (
                <div>
                    <h4>{group.title}</h4>
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
    // store: React.PropTypes.object
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
