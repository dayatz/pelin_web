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

    handleActive(tab) {
        if (this.state.selectedTab != tab.props.value) {
            this.setState({selectedTab: tab.props.value});
            console.log(tab.props.label);
            this.props.router.push(tab.props.route);
        } else {
            console.log(`you already in tab ${tab.props.label}`);
        }
    }

    render () {
        return (
        <Tabs>
            <Tab
                value={0}
                icon={<FontIcon className="material-icons">forum</FontIcon>}
                label="Diskusi"
                route='/'
                onActive={this.handleActive} />

            <Tab
                value={1}
                icon={<FontIcon className="material-icons">import_contacts</FontIcon>}
                label="Materi"
                onActive={this.handleActive} />

            <Tab
                value={2}
                icon={<FontIcon className="material-icons">event_note</FontIcon>}
                label="Tugas"
                onActive={this.handleActive} />

            <Tab
                value={3}
                icon={<FontIcon className="material-icons">people</FontIcon>}
                label="Member"
                onActive={this.handleActive} />
        </Tabs>
        )
    }
}

export default GroupTabs
