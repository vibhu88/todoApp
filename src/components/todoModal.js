import React from 'react'
import Modal from 'react-modal'
import styles from '../styles/styles.css'
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

Modal.setAppElement('#root')
const todoModal = (props) => {
    return (
        <div>
            <Modal isOpen={props.modal_open} className="modal">
                <form className="todoList-div">
                    <input className="todoBar" 
                        type="text" 
                        title="Todo Title" 
                        name="title"
                        placeholder="Give a Title"
                        value={props.title}
                        onChange={props.onChangeHandler}
                    />
                    <input multiline="true" 
                        className="todoBar" 
                        type="text"
                        name="data" 
                        title="Todo Details" 
                        placeholder="Give some detalils" 
                        value={props.data}
                        onChange={props.onChangeHandler}
                    /> 
                    <div className="iconButton-div">
                        <IconButton aria-label="close" onClick={props.modalCloseHandler}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton aria-label="check" onClick={ () => props.editChangeHandler(props.id)}>
                            <CheckIcon />
                        </IconButton>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default todoModal
