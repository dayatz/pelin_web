import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import GroupTabs from '../../components/group/GroupTabs'
import { fetchSingleGroup } from '../../actions/group'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/lib/raised-button'

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
            groupId: this.props.params.groupId,
            group: this.state.group
        }
    }

    componentWillMount() {
        const groupId = this.props.params.groupId;
        this.setState({ groupId });
    }

    componentDidMount() {
        if (!this.props.groups.items[this.state.groupId]) {
            this.props.fetchSingleGroup(this.state.groupId);
        }
    }

    render() {
        const group = this.props.groups.items[this.state.groupId];
        if (group) {
            if (group.is_joined) {
                var buttonStatus = <RaisedButton>Leave</RaisedButton>
            } else {
                var buttonStatus = <RaisedButton>Join</RaisedButton>
            }

            var renderGroupDetail = (
                <div>
                    <div>
                        <h4 style={{float: 'left'}}>{group.title}</h4>
                        <div style={{float: 'right'}}>{buttonStatus}</div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    <Paper style={{minHeight: 500}}>
                        <div>
                            <GroupTabs
                                router={this.context.router}
                                location={this.props.location}
                                groupId={this.state.groupId} />
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
