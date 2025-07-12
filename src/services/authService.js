import axios from 'axios';
import { BOOK_API } from '../constant/apiconstant';


const API_BASE_URL = process.env.REACT_APP_BOOK_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}${BOOK_API.AUTH}`;


export const login = async (user) => {
  
  const res = await axios.post(`${BASE_URL}/login`, user);
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  
  return res.data;
};

export const register = async (user) => {
  const res = await axios.post(`${BASE_URL}/register`, user);
  return res.data;
};

export const getToken = () => localStorage.getItem('token');

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
