import React, { setState, createRef } from 'react';
import styles from '../styles/styles.css';
import TodoForm from './todoForm';
import Carpet from './carpet';
import TodoModal from './todoModal';
import Header from './header';
import SideBar from './sideBar';

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.inputRef = React.createRef();

    this.state = {
      todoList: [],
      title:'',
      data:'',
      id:'',
      add_status: false,
      modal_open: false,
      formClass: "home-todof",
      currentTodo: {
        current_title: '',
        current_data: '',
        current_id: ''
      }     
    }
    this.handleChange       = this.handleChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
    this.addButtonHandler   = this.addButtonHandler.bind(this);
    this.deleteHandler      = this.deleteHandler.bind(this);
    this.editHandler        = this.editHandler.bind(this);
    this.editChangeHandler  = this.editChangeHandler.bind(this);
    this.modalCloseHandler  = this.modalCloseHandler.bind(this);
  }

  componentDidMount = () => {
    const storedList = localStorage.getItem('savedList');
    this.setState({todoList: JSON.parse(storedList)});
  }

  handleChange = (e) => {
    this.setState(
    {[e.target.name]: e.target.value}
    )
  }

  addButtonHandler = () => {
    this.setState({
      add_status: true,
      formClass: "home-todof-big"});
  }

  closeForm = () => {
    this.setState({
      add_status: false,
      formClass: "home-todof"});
  }

  deleteHandler = (_del_id) => {
    const filtered_todoList = this.state.todoList.filter( item => item.current_id !== _del_id);
    this.setState(
      {todoList: filtered_todoList}
    )
    localStorage.setItem('savedList', JSON.stringify(filtered_todoList));
  }

  editHandler = (_edit_id) => {
    const items = this.state.todoList;
    let edit_Todo = this.state.currentTodo;
    items.map(item => {
      if(item.current_id === _edit_id){
          edit_Todo = item;
      } 
    })
    this.setState({modal_open: true, 
                  title: edit_Todo.current_title,
                  data: edit_Todo.current_data,
                  id:edit_Todo.current_id});
  }

  editChangeHandler = (_edit_id) => {
    let items = this.state.todoList;
    let i=0;
    let updatedTodo = this.state.currentTodo;
    updatedTodo.current_title = this.state.title;
    updatedTodo.current_data  = this.state.data;
    updatedTodo.current_id    = _edit_id
    for(i=0;i<items.length;i++) {
      if (items[i].current_id === _edit_id){
          items[i]=updatedTodo;
          i=i+1;
      }
    }
    this.setState({modal_open: false,
                  add_status: false,
                   todoList: items,
                   formClass: "home-todof",
                   title:'',
                   data:'',
                   id:'',
                   currentTodo: {
                    current_title: '',
                    current_data:'',
                    current_id: ''
                  }});
    localStorage.setItem('savedList', JSON.stringify(items));
  }

  modalCloseHandler = () => {
    this.setState({modal_open: false,
                   title: '',
                   data: ''});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = this.state.currentTodo;
    newTodo.current_title = this.state.title;
    newTodo.current_data  = this.state.data;
    newTodo.current_id    = Date.now();
    // validatestate(newTodo);
    if (newTodo.current_data !== ""){
      const newItems = [...this.state.todoList, newTodo];
      this.setState({
        todoList: newItems,
        currentTodo: {
          current_title: '',
          current_data:'',
          current_id: ''
        },
        title:'',
        data:'',
        id:'',
        add_status: false,
        formClass: "home-todof"
      }) 
      localStorage.setItem('savedList', JSON.stringify(newItems));
    }else{
      console.log("Mandatory Data Field Missing");
      this.inputRef.current.focus();
    }
  }

  render() {     
    let home_modal = null;
    let home_todof = null;
    let home_carpet = null;

    if (this.state.modal_open) {
      home_modal = 
            <TodoModal 
              modal_open={this.state.modal_open}
              modalCloseHandler={this.modalCloseHandler}
              title={this.state.title}
              data={this.state.data}
              id={this.state.id}
              editChangeHandler={this.editChangeHandler}
              onChangeHandler={this.handleChange}
            />
    } else {
      home_todof = 
          <TodoForm 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
            title={this.state.title}
            data={this.state.data}
            add_status={this.state.add_status}
            addButtonHandler={this.addButtonHandler}
            closeForm={this.closeForm}
            inputRef={this.inputRef}
          />
      home_carpet =
          <Carpet  
            todoList={this.state.todoList}
            editHandler={this.editHandler}
            deleteHandler={this.deleteHandler}
        />
    }
    
      return(
        <div>
          <div className="modal-div">
            {home_modal}
          </div>
          <div className = {this.state.formClass}>
            {home_todof}
          </div>
          <div className="homepage-div">
            {home_carpet}
          </div>
        </div>
      );
    
  }
}

export default HomePage;