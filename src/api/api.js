import axios from "axios";

// const ip = 'https://jwebdev.pro'
const ip= "http://localhost:3000"

export function getDots () {
  return  axios.post(`${ip}/api/getDots`)
  };
  export const deleteDot = (id) => {
    axios.post(`${ip}/api/deleteDot`, { id }).then((res) => {
        console.log(res);
     return res.data
    });
  };
  export const createDot = (data) => {
    axios.post(`${ip}/api/addDot`, { data }).then((res) => {
     return res.data} );

   
  };


  export const editDot=(dot)=>{
   axios.post(`${ip}/api/editDot`, { dot }).then((res) => {
       this.setState({ dots: res.data });

    });
  }
