import React, { Component } from "react";
import axios from "axios";
import Ymap from "./Ymap/index";

// const ip = 'http://185.224.132.198'
const ip2= "http://localhost:80"
class App extends Component {
  state = {
    dots: [],
  };
 
  getDots = () => {
    axios.post(`${ip2}/api/getDots`).then((res) => {
          this.setState({ dots: res.data});
    });
  };
  deleteDot = (id) => {
    axios.post(`${ip2}/api/deleteDot`, { id }).then((res) => {
      this.setState({ dots: res.data });
    });
  };
  createDot = (data) => {
    axios.post(`${ip2}/api/addDot`, { data }).then((res) => {
      this.setState({ dots: res.data });

    });
  };


  editDot=(dot)=>{
   axios.post(`${ip2}/api/editDot`, { dot }).then((res) => {
       this.setState({ dots: res.data });

    });
  }

  render() {
    const { dots } = this.state;
    return (
      <div>
        <button onClick={this.getDots}>Прорисовать точки из БД </button>
        <Ymap
          dots={dots.sort((a,b)=>a.number-b.number)}
          deleteDot={this.deleteDot}
          createDot={this.createDot}
          getDots={this.getDots}
          editDot={this.editDot}
        />
   
      </div>
    );
  }
}

export default App;
