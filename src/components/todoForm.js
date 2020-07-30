import React from 'react'
import styles from '../styles/styles.css';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

const todoForm = ( {handleChange, handleSubmit, title, data, add_status, addButtonHandler, closeForm, inputRef} ) => {
    
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
                <form onSubmit= {handleSubmit} >
                    <input className="todoBar" 
                        type="textarea" 
                        title="Todo Title" 
                        name="title"
                        placeholder="Give a Title (Optional)"
                        value={title}
                        rows={5}
                        cols={10}
                        wrap="hard"
                        onChange={handleChange}/>
                    <input 
                        className="todoBar" 
                        type="textarea"
                        name="data" 
                        title="Todo Details" 
                        placeholder="Give some detalils" 
                        value={data}
                        rows={5}
                        cols={10}
                        wrap="hard"
                        onChange={handleChange}
                        ref={inputRef}
                        autoFocus/> 
                    <div className="button-div">
                        <button 
                            className="todoButton" 
                            type="button" 
                            onClick={closeForm}> 
                                Cancel 
                        </button>
                        <button className="todoButton" 
                                type="submit" > 
                                Add 
                        </button>
                    </div>
                </form>
            </div>
        )}
}

export default todoForm;