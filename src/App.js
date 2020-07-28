import React, { setState } from 'react';
import './App.css';
import TodoForm from '../src/components/todoForm';
import Carpet from './components/carpet';
import TodoModal from './components/todoModal';
import Header from './components/header';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      title:'',
      data:'',
      id:'',
      add_status: false,
      modal_open: false,
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
    this.setState({add_status: true});
  }

  deleteHandler = (_del_id) => {
    const filtered_todoList = this.state.todoList.filter( item => item.current_id !== _del_id);
    this.setState(
      {todoList: filtered_todoList}
    )
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
        add_status: false
      }) 
      localStorage.setItem('savedList', JSON.stringify(newItems));
    }else{
      console.log("Mandatory Data Field Missing");
    }
  }

  render() {     
    if (this.state.modal_open) {
      return(
        <div>
          <Header />
          <TodoModal 
            modal_open={this.state.modal_open}
            modalCloseHandler={this.modalCloseHandler}
            title={this.state.title}
            data={this.state.data}
            id={this.state.id}
            editChangeHandler={this.editChangeHandler}
            onChangeHandler={this.handleChange}
          />
        </div>
      );
    }
    else{
        return (
          <div className="App">
            <Header />
            <TodoForm 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit}
              title={this.state.title}
              data={this.state.data}
              add_status={this.state.add_status}
              addButtonHandler={this.addButtonHandler}
            />
            <Carpet  
              todoList={this.state.todoList}
              editHandler={this.editHandler}
              deleteHandler={this.deleteHandler}
           />
          </div>
        );
    }
    
  }
}

export default App;
