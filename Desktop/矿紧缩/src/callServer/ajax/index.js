// 引入 axios
import axios from 'axios'
import apiConfig from '../config'

axios.defaults.baseURL = apiConfig.baseURL //默認全局域名

// 引入 api 对象
import api from './api.js'
// 引入 后端 处理 模块
import dataHandle from './dataHandle.js'

/**
 * 后端 交互 模块
 *  port, 为用于 判断 何处调用 之 参数,
 *      api[port], 调用 api 对象 中, 封装 的 对应 接口
 *      detaDeal[port], 调用 对应接口 相关的 数据 处理 函数
 *  data, 为调用者 传递的 数据
 *  errCallback, 如果 在 ajax 請求失敗時, 執行某些函數, 則傳遞 此回調
 */
export default function (port, data = {}, errCallback) {
    if (!data) return console.warn('沒有傳遞 data 參數, 作爲請求的數據')
    // 將 數據 轉換 爲 後端 可 處理的 表單格式
    let formData = new FormData()
    Object.keys(data).forEach( key => {
        formData.append(key, data[key])
    })
    formData.append('token', localStorage.getItem('openid'))
    // 返回 promise 實例
    return new Promise ( resolve => {
        axios.post(api[port], formData)
        .then( res => {
            res.data && deviceIpLimit(res.data.newclientip) // ip 限制判斷
            // console.log(res)
            // if(res.data.status == 0){
            //     localStorage.removeItem('openid')
            // }
            resolve(dataHandle[port](res.data))
        })
        .catch( err => {
            console.warn(err)
            // 對 請求錯誤, 進行統一處理
            Dialog.alert({
                title: '服務器錯誤',
                message: err
            })
        })
        .finally ( () => {
            errCallback && errCallback()
        })
    })
}

// 設備ip 限制, 不能在不同設備上登錄
function deviceIpLimit (ip) {
    // 如果 本地ip 存在, 且不等於 後端傳遞的 ip, 則跨設備了, 進行登出操作
    if (localStorage.getItem('ip') && localStorage.getItem('ip') !== ip) {
        localStorage.removeItem('ip')
        localStorage.removeItem('openid')
        localStorage.removeItem('mobile')
        window.location.reload()
    }
}