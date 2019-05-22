'use strict'

import axios from 'axios'
import vc from 'vue-cookie'
import router from '../router'
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function checkStatus (response) {
  // console.log(response)
  // loading
  // 如果http状态码正常，则直接返回数据
  // console.log(response.data.code)
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    if (response.status === 200 && response.data.code === 300) {
      alert('在线时间过长，清重新登录')
      router.push({name:'timeout'})
    }
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // if (response && response.data.code === 300) {
  //   alert("56456465")
  //   iView.$Message.error('在线时间过长，清重新登录')
  //   console.log("token已过期")
  // }
  // iView.$Message.success('网络异常')
  // iView.Message.info('网络异常')
  // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   msg: '网络异常'
  // }
}

function checkCode (res) {
  if (res.data.status === 300) {
    alert("token已过期")
    this.$router.push({name:'login'})    
  }
  return res
}

export default {
  websocketUrl:'ws://192.168.1.119:3838/admin/convert/',
  baseUrls: process.env.BASE_API,
  post (url, data) {
    let token = vc.get('userlogin') ? JSON.parse(vc.get('userlogin')).token : ''

    if (!data) {
        data = { token: token }
    } else {
        data.token = token
    }

    return axios({
      method: 'post',
      baseURL: process.env.BASE_API,
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        token: token
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  get (url, params) {
    let token = vc.get('userlogin') ? JSON.parse(vc.get('userlogin')).token : ''
    // let userid = vc.get('userlogin') ? JSON.parse(vc.get('userlogin')).userid : ''
    // let companyid = vc.get('userlogin')
    //   ? JSON.parse(vc.get('userlogin')).companyid
    //   : ''

    // if (!params) {
    //   if (!companyid) {
    //     params = { token: token, userid: userid }
    //   } else {
    //     params = { token: token, userid: userid, companyid: companyid }
    //   }
    // } else {
    //   if (!params) {
    //     params.token = token
    //     params.userid = userid
    //   } else {
    //     params.token = token



    //     params.userid = userid
    //     params.companyid = companyid
    //   }
    // }
    return axios({
      method: 'post',
      baseURL: process.env.BASE_API,
      url,
      data: params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  }
}
