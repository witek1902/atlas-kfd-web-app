import axios from 'axios';
import { mock } from '../api_mock/mock'
const mock_api = true
export const HTTP = mock_api ? mock : axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  }
});
