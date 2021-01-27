import React, { Component } from 'react';
import { io } from 'socket.io-client';
import Navigation from '../../Components/Navigation/Navigation'


class PaymentsPage extends Component {

    socketOn =()=>{
        const io = io('http://localhost:80/')
        socket.on("connect", () => {
         console.log(socket.id); 
    });
    }
    
    render() {
        return (
            <>
            <Navigation/>
            <div>
                <button onClick={this.socketOn}>click</button>
            </div>
            </>
        );
    }
}

export default PaymentsPage;