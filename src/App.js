import React, { Component } from "react";
import axios from "axios";
import Ymap from "./Ymap/index";
import Gmap from './Gmap/Gmap.js'

class App extends Component {
  state = {
    dots: [],
  };
  getDots = () => {
    axios.post(`http://localhost:3000/api/getDots`).then((res) => {
      this.setState({ dots: res.data });
    });
  };
  deleteDot = (id) => {
    axios.post(`http://localhost:3000/api/deleteDot`, { id }).then((res) => {
      this.setState({ dots: res.data });
    });
  };
  createDot = (data) => {
    axios.post("http://localhost:3000/api/addDot", { data }).then((res) => {
      this.setState({ dots: res.data });

    });
  };


  render() {
    const { dots } = this.state;
    return (
      <div>
        <button onClick={this.getDots}>Прорисовать точки из БД </button>
        <Ymap
          dots={dots}
          deleteDot={this.deleteDot}
          createDot={this.createDot}
        />
        <Gmap/>
      </div>
    );
  }
}

export default App;
