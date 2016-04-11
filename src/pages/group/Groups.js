import React from 'react'
import { connect } from 'react-redux'

class Groups extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup();
    }

    render() {
        if (this.props.groups.data.length) {
            var renderGroupList = <GroupList groups={this.props.groups.data} />
        } else if (!this.props.groups.data.length && this.props.groups.error) {
            // TODO: render error message
            var renderGroupList = 'terjadi kesalahan'
        } else {
            // TODO: render loading message
            var renderGroupList = 'Loading...'

        }

        return (
            <div>
                <h4>Semua Grup</h4>
                {renderGroupList}
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

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
