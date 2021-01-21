import React, { Component } from 'react';
import { Modal, Button, message, Space } from "antd";

class LoginModal extends Component {
    state={
        name:'',
        password:''
    }
    handleOk=()=>{
        const {logIn, modalClose, checkSession}=this.props

        logIn({login:'shalena', password:'makaka'})
        .then((res)=>{
            console.log( res.status==='succes');
           return res.status==='succes'?(checkSession(), modalClose()):null})
  
       
    }

    render() {
        const {handleSubmitModal, closeModal} =this.state
      const {modalClose}=this.props
        return (
            <Modal
            title={'Авторизація'}
            visible
             onOk={this.handleOk}
            onCancel={modalClose}
            style={{ marginBottom: "100px" }}
          ><span>modal</span></Modal>
        );
    }
}

export default LoginModal;