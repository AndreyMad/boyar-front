import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {

state={
  user:''
}
  getUsers=()=>{
    axios.post(`http://localhost:3000/api/a`).then(res=>{
      this.setState({user:res})
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.getUsers} ></button>
      </div>
    );
  }
}

export default App;