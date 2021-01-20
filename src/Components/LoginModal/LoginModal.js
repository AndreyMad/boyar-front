import React, { Component } from 'react';
import { Modal, Button, message, Space } from "antd";

class LoginModal extends Component {
    state={
        name:'',
        password:''
    }
    handleOk=()=>{
        const {logIn}=this.props
        logIn({login:'shalena', password:'makaka'})
        console.log('ok' );
    }

    render() {
        const {handleSubmitModal, closeModal} =this.state
        return (
            <Modal
            //  title={modalValues.id.length===0?'Добавить новую точку':'Редактировать точку'}
            visible
             onOk={this.handleOk}
            // onCancel={this.handleCancel}
            style={{ marginBottom: "100px" }}
          ><span>modal</span></Modal>
        );
    }
}

export default LoginModal;