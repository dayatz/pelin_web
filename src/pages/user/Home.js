import React from 'react'
import {Link} from 'react-router'
import Paper from 'material-ui/lib/paper'
import {connect} from 'react-redux'
import {fetchAllGroup} from '../../actions/group'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup()
    }
    render() {
        return (
            <div>
                <h4>My Groups</h4>
                <div className="col-md-6">
                    <Paper>
                        <p>tes</p>
                    </Paper>
                </div>
                <div className="col-md-6">
                    <Paper>
                        <p>tes</p>
                    </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    fetchAllGroup: () => { dispatch(fetchAllGroup()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
