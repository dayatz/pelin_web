import React from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import FontIcon from 'material-ui/lib/font-icon'
import Tab from 'material-ui/lib/tabs/tab'
import bindFunctions from '../../config/bindFunctions'

class GroupTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0
        }

        bindFunctions.call(this, ['handleActive']);
    }
    componentDidMount() {
        const pathname = this.props.location.pathname.split('/')[3];
        if (pathname) {
            switch(pathname) {
                case 'lessons':
                    this.setState({ selectedTab: 1 });
                    break;
                case 'assignments':
                    this.setState({ selectedTab: 2 });
                    break;
                case 'members':
                    this.setState({ selectedTab: 3 });
            }
        }
    }

    handleActive(tab) {
        if (this.state.selectedTab != tab.props.value) {
            this.setState({selectedTab: tab.props.value});

            var route = `/groups/${this.props.groupId}`
            if (tab.props.route) {
                route += `/${tab.props.route}`
            }
            this.props.router.replace(route);
        } else {
            console.log(`you already in tab ${tab.props.label}`);
        }
    }

    render () {
        return (
        <Tabs value={this.state.selectedTab}>
            <Tab
                value={0}
                icon={<FontIcon className="material-icons">forum</FontIcon>}
                label="Diskusi"
                onActive={this.handleActive} />

            <Tab
                value={1}
                icon={<FontIcon className="material-icons">import_contacts</FontIcon>}
                label="Materi"
                route='lessons'
                onActive={this.handleActive} />

            <Tab
                value={2}
                icon={<FontIcon className="material-icons">event_note</FontIcon>}
                label="Tugas"
                route='assignments'
                onActive={this.handleActive} />

            <Tab
                value={3}
                icon={<FontIcon className="material-icons">people</FontIcon>}
                label="Member"
                route='members'
                onActive={this.handleActive} />
        </Tabs>
        )
    }
}

export default GroupTabs
