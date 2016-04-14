import React from 'react'
import bindFunctions from '../../config/bindFunctions'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import FontIcon from 'material-ui/lib/font-icon'
import Paper from 'material-ui/lib/paper'
import SwipeableViews from 'react-swipeable-views'

class Group extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            tabContent: ''
        }

        bindFunctions.call(this, ['handleTabChange', 'handleActive']);
    }

    handleTabChange(value) {
        this.setState({
            slideIndex: value
        })
    }

    handleActive(tab) {
        console.log(tab);
        this.setState({
            tabContent: 'tab content'
        })
    }

    render() {
        return (
            <div>
            <h4>Nama Grup</h4>
            <Paper>
                <Tabs onChange={this.handleTabChange} value={this.state.slideIndex}>
                    <Tab
                        value={0}
                        icon={<FontIcon className="material-icons">forum</FontIcon>}
                        label="Diskusi" />
                    <Tab
                        value={1}
                        icon={<FontIcon className="material-icons">import_contacts</FontIcon>}
                        label="Materi" />
                    <Tab
                        value={2}
                        icon={<FontIcon className="material-icons">event_note</FontIcon>}
                        label="Tugas" />
                    <Tab
                        value={3}
                        icon={<FontIcon className="material-icons">people</FontIcon>}
                        label="Member"
                        onActive={this.handleActive} />
                </Tabs>

                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleTabChange}>

                    <div>
                        {/* TODO: post list */}
                        {/*<PostList posts={this.props.posts.data} />*/}
                        posts
                    </div>

                    <div>
                        {/* TODO: lesson list */}
                        {/*<LessonList posts={this.props.lessons.data} />*/}
                        materi
                    </div>

                    <div>
                        {/* TODO: assignment list */}
                        {/*<AssignmentList posts={this.props.assignments.data} />*/}
                        tugas
                    </div>

                    <div>
                        {/* TODO: member list */}
                        {/*<MemberList posts={this.props.members.data} />*/}
                        {this.state.tabContent}
                    </div>

                </SwipeableViews>
            </Paper>
            </div>
        )
    }
}

export default Group
