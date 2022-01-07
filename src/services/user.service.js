import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'customers');
  }

  getUserBoard() {
    return axios.get(API_URL + 'bills', { headers: authHeader() });
  }

  getCustomerBoard() {
    return axios.get(API_URL + 'bills', { headers: authHeader() });
  }
}

export default new UserService();
