import React from 'react';
import TodoItem from './todoItem';

 const carpet = (props) => {
    return (
        <div className="carpet-div">
            {props.todoList.map(todoItem => {
                return(
                <TodoItem 
                key={todoItem.current_id}
                id={todoItem.current_id}
                title={todoItem.current_title}
                data={todoItem.current_data}
                edited = {props.editHandler}
                deleted = {props.deleteHandler}/>
            )})}
        </div>
    )
}

export default carpet;
 