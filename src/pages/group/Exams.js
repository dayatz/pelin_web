import React from 'react'
import FabAdd from '../../components/FabAdd'
import NewExamDialog from '../../components/group/group/NewExamDialog'


class Exams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false
        }
    }
    _toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    renderAddBtn() {
        if (this.context.group.is_owner) {
            return (
                <div>
                <NewExamDialog
                    open={this.state.openModal}
                    toggleModal={this._toggleModal.bind(this)} />
                <FabAdd
                    className='lesson-add-fab'
                    onTouchTap={() => {
                        this._toggleModal()
                    }} />
                </div>
            )
        }
        return null
    }
    render() {
        return (
            <div>
                {this.renderAddBtn()}
                <span>Exams</span>
            </div>
        )
    }
}

Exams.contextTypes = {
  group: React.PropTypes.object,
  auth: React.PropTypes.object
}

export default Exams
