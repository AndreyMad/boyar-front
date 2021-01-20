import React, { Component } from "react";
import * as API from "../../api/api";
import Ymap from "../../Components/Ymap/Ymap";
import LoginModal from '../../Components/LoginModal/LoginModal'
class YmapPage extends Component {
  state = {
    dots: [],
    isAuthorized:false
  };

  componentDidMount() {
const {isAuthorized}=this.state
return isAuthorized?this.getDots():null
    
  }

  getDots = () => {
    const { dots } = this.state;
    API.getDots().then((res) => {
      if (
        dots.length < res.data.length ||
        JSON.stringify(dots) !== JSON.stringify(res.data)
      ) {
        this.setState({ dots: res.data });
        return true;
      }
      return false;
    });
  };

  deleteDot = (id) => {
    return API.deleteDot( id ).then((res) => {
      console.log(res);
      if (res.data.status === "succes") {
        this.getDots();
        return true;
      }
      return false;
    });
  };

  createDot = (data) => {
    return API.createDot(data).then((res) => {
      if (res.data.status === "succes") {
        this.getDots();
        return true;
      }
      return false;
    });
  };

  editDot = (dot) => {
    return API.editDot(dot).then((res) => {
      console.log(res.data.status === "succes");
      if (res.data.status === "succes") {
        this.getDots();
        return true;
      }
      return false;
    });
  };

  render() {
    const { dots, isAuthorized } = this.state;
    return (
      <div>
        {isAuthorized? <Ymap
          dots={dots.sort((a, b) => b.number - a.number)}
          deleteDot={this.deleteDot}
          createDot={this.createDot}
          getDots={this.getDots}
          editDot={this.editDot}
        />:<LoginModal/>}
       
      </div>
    );
  }
}

export default YmapPage;
