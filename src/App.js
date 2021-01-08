import React, { Component } from 'react';
import axios from 'axios'
import Ymap from './Ymap/index'
class App extends Component {

state={
  dots:[]
}
  getDots=()=>{
    axios.post(`http://localhost:3000/api/a`).then(res=>{
      this.setState({dots:res.data})
    })
  }
  render() {
    const {dots}=this.state
    return (
      <div>
        <button onClick={this.getDots} ></button>
        <Ymap dots={dots}/>
      </div>
    );
  }
}

export default App;