import React from 'react'
import styles from '../styles/styles.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const todoItem = ( props ) => {
    return (
        <div className="todoListDiv">
            <h1 className="title">{props.title}</h1>
            <p className="para">{props.data}</p>
            <IconButton aria-label="edit" onClick={ () => props.edited(props.id)}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={ () => props.deleted(props.id)}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default todoItem;