import axios from 'axios';


const clienteAxios = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
    /*withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }    */
});

export default clienteAxios;