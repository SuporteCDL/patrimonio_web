import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.2.106:3333',
  timeout: 99000,
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'foobar'
  },
})