import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import GroupService from '../../api/group'
import GroupList from '../../components/group/group/GroupList'
import Loading from '../../components/Loading'
import Help from '../../components/Help'

import { fetchAllGroup } from '../../actions/group'


class Groups extends React.Component {
    componentDidMount() {
        this.props.fetchAllGroup()
        this.context.setPageTitle('Cari Group')
    }

    render() {
        const groups = this.props.groups.items
        if (!groups) {
            var renderGroupList = <Loading />
        } else {
            var renderGroupList = <GroupList groups={groups} />
        }

        return (
            <Paper className='paper' style={{padding: '30px 15px'}}>
                <Help text='Ini adalah halaman daftar group yang ada di sistem, bergabung sekarang.' />
                {renderGroupList}
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups
})

const mapDispatchToProps = dispatch => ({
    fetchAllGroup: () => {
        dispatch(fetchAllGroup())
    }
})

Groups.contextTypes = {
    setPageTitle: React.PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
