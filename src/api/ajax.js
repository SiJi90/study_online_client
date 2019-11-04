/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {

  return new Promise(function (resolve, reject) {
    // console.log(data)
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 发送get请求
      promise = axios.get(url, data)
    } else if (type === 'POST') {
      // 发送post请求
      promise = axios.post(url, data)
    } else if (type === 'DELETE') {
      promise = axios.delete(url, data)
    } else if (type === 'PUT') {
      promise = axios.put(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    });
  })
}
