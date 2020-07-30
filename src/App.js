import React from 'react';
import classes from './App.css';
import HomePage from './components/HomePage';
import SideBar from './components/sideBar';
import Header from './components/header';

class App extends React.Component {

  render() {     
    return(
      <div className="App">
          <Header />
          <SideBar />
          <HomePage />
      </div>
    )
  }
}

export default App;