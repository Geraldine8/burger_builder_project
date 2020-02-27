import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-9592d.firebaseio.com/'
});


export default instance;
