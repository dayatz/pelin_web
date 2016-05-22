import React from 'react'
import Paper from 'material-ui/lib/paper'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'

import shortid from 'shortid'
import prettysize from 'prettysize'
import Time from '../../Time'


class LessonItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFiles: false
        }
    }
    renderDeleteButton() {
        if (this.context.group.is_owner) {
            return (
                <FlatButton
                    className='action-delete'
                    onClick={() => {
                        this.props.onDeleteClick(this.props.lesson)
                    }}
                    label='Hapus'
                    secondary={true}
                    icon={<FontIcon className='material-icons'>delete</FontIcon>} />
            )
        }
        return
    }

    renderItemList(){
        return this.props.lesson.files.map(file => {
            return (
                <li className='lesson-item__file-item' key={shortid.generate()}>
                    <a href={file.file} target='_blank' className='lesson-item__file'>
                        <span>{file.name}</span>
                        <span style={{ float: 'right' }}>{prettysize(file.size)}</span>
                    </a>
                </li>
            )
        })
    }
    toggleShowFiles() {
        this.setState({ showFiles: !this.state.showFiles })
    }
    componentDidUpdate(prevProps, prevState) {
        this.context.masonry.masonry.layout()
    }

    render() {
        var renderDescription
        if (this.props.lesson.description) {
            renderDescription = <p className='lesson-item__description'>
                {this.props.lesson.description}
            </p>
        }

        var renderUl
        if (this.state.showFiles) {
            renderUl = (
                <ul className='lesson-item__files'>
                    {this.renderDeleteButton()}
                    {this.renderItemList()}
                </ul>
            )
        }

        var btnIcon = <FontIcon className='material-icons'>expand_more</FontIcon>
        if (this.state.showFiles) {
            btnIcon = <FontIcon className='material-icons'>expand_less</FontIcon>
        }

        return (
            <Paper className='lesson-item'>
                <div style={{ display: 'table', width: '100%' }}>
                    <div className='lesson-item__files-count'>
                        <span>{this.props.lesson.files.length}</span>
                    </div>
                    <div className='lesson-item__body'>
                        <span className='lesson-item__title'>{this.props.lesson.title}</span>
                        <Time isoDate={this.props.lesson.created_at} />
                        {renderDescription}
                    </div>
                    <div className='lesson-item__action'>
                        <IconButton onClick={() => {
                            this.toggleShowFiles()
                        }}>
                            {btnIcon}
                        </IconButton>
                    </div>
                </div>
                {renderUl}
            </Paper>
        )
    }
}

LessonItem.contextTypes = {
    group: React.PropTypes.object,
    masonry: React.PropTypes.object
}

export default LessonItem
