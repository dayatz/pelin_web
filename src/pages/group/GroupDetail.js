import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import GroupTabs from '../../components/group/GroupTabs'
import { fetchSingleGroup } from '../../actions/group'
import { Link } from 'react-router'
import GroupService from '../../api/group'
import RaisedButton from 'material-ui/lib/raised-button'

class Group extends React.Component {
    constructor(props) {
        super(props);

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
            this.props.fetchSingleGroup(this.state.groupId);
        }
    }

    leave() {
        if (confirm('Apakah anda yakin ingin keluar dari grup ?')) {
            GroupService.leave(this.state.groupId)
                .then(r => {
                    this.context.router.replace('/')
                })
        }
    }

    render() {
        const group = this.props.groups.items[this.state.groupId];
        if (group) {
            var buttonStatus;
            if (!group.is_owner) {
                if (group.is_joined) {
                    var buttonStatus = <RaisedButton onClick={this.leave.bind(this)} label='Leave' />
                } else {
                    var buttonStatus = <RaisedButton label='Join' />
                }
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
