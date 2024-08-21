import axios, { AxiosRequestConfig } from "axios"
import { getCookie } from "shared/helper/tokens"

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const setHeaders = async () => {

  const headers: {
    'Content-Type': string
    Authorization?: string
    SessionId?: string
  } = {
    'Content-Type': 'application/json'
  }

  if (getCookie('token')) {
    headers.Authorization = `Bearer ${getCookie('token')}`
  }
  axios.defaults.headers.common = headers;
}

const http = {
  async get(endpoint: string, config?: AxiosRequestConfig<any>) {
    await setHeaders();

    try {
      const res = await axios.get(`${API_URL}${endpoint}`, config)
      return res;
    } catch (e: any) { }
  },
  async post(endpoint: string, params: any, config?: AxiosRequestConfig<any>) {
    await setHeaders();

    try {
      const res = await axios.post(`${API_URL}${endpoint}`, params, config)
      return res;
    } catch (e: any) { }
  },
  async put(endpoint: string, params: any, config?: AxiosRequestConfig<any>) {
    await setHeaders()

    try {
      const res = await axios.put(`${API_URL}${endpoint}`, params, config)
      return res
    } catch (e: any) { }
  },
  async delete(endpoint: string, config?: AxiosRequestConfig<any>) {
    await setHeaders()

    try {
      const res = await axios.delete(`${API_URL}${endpoint}`, config)
      return res
    } catch (e: any) { }
  }
}

export default http