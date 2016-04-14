import React from 'react'

class Groups extends React.Component {

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

export default Groups
