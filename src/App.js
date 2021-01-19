import React, { Component } from "react";
import axios from "axios";
import Ymap from "./Ymap/index";

//  const ip = 'https://185.224.132.198'
const ip= "https://localhost:443"
class App extends Component {
  state = {
    dots: [],
  };
 
  getDots = () => {
    axios.post(`${ip}/api/getDots`).then((res) => {
          this.setState({ dots: res.data});
    });
  };
  deleteDot = (id) => {
    axios.post(`${ip}/api/deleteDot`, { id }).then((res) => {
      this.setState({ dots: res.data });
    });
  };
  createDot = (data) => {
    axios.post(`${ip}/api/addDot`, { data }).then((res) => {
      this.setState({ dots: res.data });

    });
  };


  editDot=(dot)=>{
   axios.post(`${ip}/api/editDot`, { dot }).then((res) => {
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
