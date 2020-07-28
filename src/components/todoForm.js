import React from 'react'
import styles from '../styles/styles.css';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

const todoForm = ( {handleChange, handleSubmit, title, data, add_status, addButtonHandler} ) => {
    
    if (!add_status)
     {
         return (
             <div>
                <IconButton aria-label="add" onClick={addButtonHandler}>
                    <AddBoxIcon />
                </IconButton>
             </div>
         )
     } else {
        return (
            <div>
                <form className="todoForm" onSubmit= {handleSubmit}>
                    <input className="todoBar" 
                        type="text" 
                        title="Todo Title" 
                        name="title"
                        placeholder="Give a Title (Optional)"
                        value={title}
                        onChange={handleChange}/>
                    <input multiline="true" 
                        className="todoBar" 
                        type="text"
                        name="data" 
                        title="Todo Details" 
                        placeholder="Give some detalils" 
                        value={data}
                        onChange={handleChange}/> 
                    <button className="todoButton" 
                            type="submit" > 
                            Add 
                    </button>
                </form>
            </div>
        )}
}

export default todoForm;