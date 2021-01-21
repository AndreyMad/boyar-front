import React, { Component } from "react";
import * as API from "../../api/api";
import YmapAdmin from "../../Components/YmapAdmin/YmapAdmin";
import LoginModal from "../../Components/LoginModal/LoginModal";
import { message, Space } from "antd";
import Ymap from '../../Components/Ymap/Ymap'
class YmapPage extends Component {
  state = {
    dots: [],
    isAuthorized: false,
    isLoginModalOpen:false,
    user:''
  };

  componentDidMount() {
  this.checkSession()
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
    return API.deleteDot(id).then((res) => {
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

  modalOpen=()=>{
    console.log('asdasda');
    this.setState({isLoginModalOpen:true})
  }
  modalClose=()=>{
    this.setState({isLoginModalOpen:false})

  }
  logout =()=>{
    console.log('logout');
    sessionStorage.removeItem('sessiontoken')
    this.checkSession()
  }
  logIn = (user) => {
    return API.boyarAuthorization(user).then((res) => {
      if (res.data.status === "succes") {
        sessionStorage.setItem("sessiontoken", res.data.token);
        return res.data
      }
    });
  };

  checkSession = async () => {
  
    const token = sessionStorage.getItem("sessiontoken");
    if (!token) {
      this.setState({ isAuthorized: false });
    }
   const isChecked= await API.boyarCheckSession(token).then((res) => {
      if (res.data.status === "not authorized") {
        this.setState({ isAuthorized: false });
        message.warning("Вы не авторизованы. Разрешен только просмотр", 1);
        return false
      }
      this.setState({
        user: res.data.username,
        isAuthorized:true,
      })
      message.success(`Хелоу ${res.data.username}`)
      this.getDots()
      return true
    });
    return isChecked
  };

  render() {
    const { dots, isAuthorized,isLoginModalOpen } = this.state;
    return (
      <div>
      <button onClick={isAuthorized?this.logout:this.modalOpen}>{isAuthorized?'Вийти':'Увійти'} </button>
     
        {isLoginModalOpen?<LoginModal checkSession={this.checkSession} modalClose={this.modalClose}  modalClose={this.modalClose} logIn={this.logIn} />:null}
        {isAuthorized ? (
          <YmapAdmin
            dots={dots.sort((a, b) => b.number - a.number)}
            deleteDot={this.deleteDot}
            createDot={this.createDot}
            getDots={this.getDots}
            editDot={this.editDot}
          />
        ) : (
          <Ymap dots={dots.sort((a, b) => b.number - a.number)} />
          
        )}
        <Space></Space>
      </div>
    );
  }
}

export default YmapPage;
