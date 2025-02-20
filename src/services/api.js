import axios from 'axios';
const colors = require('colors');
import {URL} from "@env"

const API_URL = `${URL}/api`; 

const api = axios.create({
  baseURL: API_URL,
});

export const register = async (username,email,phone,password,longitude,latitude) => {
 
  try {
    console.log(`In Sign up `);
    const response = await api.post('/auth/register', { username,email,phone,password,longitude,latitude });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const checkUsername = async (username) => {
  try {
    const response = await api.get(`/auth/checkusername/${username}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}