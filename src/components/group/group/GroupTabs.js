import React from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import FontIcon from 'material-ui/lib/font-icon'
import Tab from 'material-ui/lib/tabs/tab'

class GroupTabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 0
        }
    }
    componentDidMount() {
        const pathname = this.props.location.pathname.split('/')[3]
        if (pathname) {
            switch(pathname) {
                case 'lessons':
                    this.setState({ selectedTab: 1 })
                    break
                case 'assignments':
                    this.setState({ selectedTab: 2 })
                    break
                case 'exams':
                    this.setState({ selectedTab: 3 })
                    break
                case 'members':
                    this.setState({ selectedTab: 4 })
            }
        }
    }

    handleActive(tab) {
        if (this.state.selectedTab != tab.props.value) {
            this.setState({selectedTab: tab.props.value})

            var route = `/groups/${this.context.groupId}`
            if (tab.props.route) {
                route += `/${tab.props.route}`
            }
            this.context.router.replace(route)
        } else {
            console.log(`you already in tab ${tab.props.label}`)
        }
    }

    render () {
        return (
        <Tabs value={this.state.selectedTab}>
            <Tab
                value={0}
                icon={<FontIcon className="material-icons">forum</FontIcon>}
                label="Diskusi"
                onActive={this.handleActive.bind(this)} />

            <Tab
                value={1}
                icon={<FontIcon className="material-icons">import_contacts</FontIcon>}
                label="Materi"
                route='lessons'
                onActive={this.handleActive.bind(this)} />

            <Tab
                value={2}
                icon={<FontIcon className="material-icons">assignment</FontIcon>}
                label="Tugas"
                route='assignments'
                onActive={this.handleActive.bind(this)} />

            <Tab
                value={3}
                icon={<FontIcon className="material-icons">format_list_bulleted</FontIcon>}
                label="Evaluasi"
                route="exams"
                onActive={this.handleActive.bind(this)} />

            <Tab
                value={4}
                icon={<FontIcon className="material-icons">people</FontIcon>}
                label="Member"
                route='members'
                onActive={this.handleActive.bind(this)} />
        </Tabs>
        )
    }
}

GroupTabs.contextTypes = {
    groupId: React.PropTypes.string,
    router: React.PropTypes.object
}

export default GroupTabs
