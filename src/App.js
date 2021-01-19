import React, { Component } from "react";
import * as API from "./api/api";
import Ymap from "./Ymap/index";

class App extends Component {
  state = {
    dots: [],
  };

  componentDidMount() {
    this.getDots();
  }

  getDots = () => {
    const { dots } = this.state;
    API.getDots().then((res) => {
      if (dots.length < res.data.length) {
        this.setState({ dots: res.data });
        return true;
      }
      return false;
    });
  };

  // deleteDot = (id) => {
  //   axios.post(`${ip}/api/deleteDot`, { id }).then((res) => {
  //     this.setState({ dots: res.data });
  //   });
  // };

  createDot = (data) => {
    API.createDot(data).then((res) => {
      if (res.data.status==='succes') {
        this.getDots();
        return true;
      }return false
    });
  };

  // editDot=(dot)=>{
  //  axios.post(`${ip}/api/editDot`, { dot }).then((res) => {
  //      this.setState({ dots: res.data });

  //   });
  // }

  render() {
    const { dots } = this.state;
    return (
      <div>
        <button onClick={this.getDots}>Прорисовать точки из БД </button>
        <Ymap
          dots={dots.sort((a, b) => b.number - a.number)}
          deleteDot={API.deleteDot}
          createDot={this.createDot}
          getDots={API.getDots}
          editDot={API.editDot}
        />
      </div>
    );
  }
}

export default App;
