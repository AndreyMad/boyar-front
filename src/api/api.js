import axios from "axios";

// const ip = 'https://jwebdev.pro'
const ip = "https://localhost:443";

export function getDots() {
  return axios.post(`${ip}/api/getDots`);
}

export const createDot = (data) => {
   return axios.post(`${ip}/api/addDot`, { data })
  };
  
export const deleteDot = (id) => {
 return axios.post(`${ip}/api/deleteDot`, { id })
};


export const editDot = (dot) => {
 return axios.post(`${ip}/api/editDot`, { dot })
  }

