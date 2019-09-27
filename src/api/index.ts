import axios, { AxiosRequestConfig } from 'axios'
import { urlPrefix } from '../utils/constants'

const DefaultAxiosSetting: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'post',
  timeout: 30000
}

class Request {
  private url: string
  private base: string

  constructor(url: string, base: string = '') {
    this.url = url
    this.base = base
  }

  public query(data: object = {}, option: AxiosRequestConfig = {}) {
    const params = new URLSearchParams()
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.append(key, data[key])
      }
    }
    const setting = Object.assign(
      {},
      DefaultAxiosSetting,
      {
        baseURL: this.base || urlPrefix,
        data: params,
        url: this.url
      },
      option
    )
    return axios(setting)
  }
}

const Test = {
  Decrypt: new Request('/test/decrypt'),
  Encrypt: new Request('/test/encrypt'),
  PayReg: new Request('/test/registerEnt'),
  WxMsg: new Request('/test/msgConfig')
}

const Umb = {
  Bind: new Request('/umb/bindEnt'),
  Register: new Request('/umb/registerEnt')
}

export { Test, Umb }
