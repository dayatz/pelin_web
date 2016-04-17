import React from 'react'
import Paper from 'material-ui/lib/paper'
import GroupTabs from '../../components/group/GroupTabs'

class Group extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupId: null
        }
    }

    componentWillMount() {
        const groupId = this.props.params.groupId;
        this.setState({ groupId });
    }

    render() {
        return (
            <div>
            <h4>Nama Grup</h4>
            <Paper>
                <GroupTabs router={this.context.router} />

                <div>
                    {/*{this.props.children}*/}
                    <h4>children</h4>
                </div>
            </Paper>
            </div>
        )
    }
}

Group.contextTypes = {
    router: React.PropTypes.object
}

export default Group
