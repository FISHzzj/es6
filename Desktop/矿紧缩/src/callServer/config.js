//判断是否是生产环境
let isPro = process.env.NODE_ENV === 'production' //process.env.NODE_ENV用于区分是生产环境还是开发环境
//根据环境不同导出不同的baseURL

export default {
    baseURL: isPro ? `http://${location.host}` : '/apis'
}