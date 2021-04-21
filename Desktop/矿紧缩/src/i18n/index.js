import registerNext from './pagination/registerNext'
import register from './pagination/register'
import primary from './pagination/primary'
import login from './pagination/login'
import forget from './pagination/forget'
import capital from './pagination/primary/capital'
import center from './pagination/primary/center'
import getOrders from './pagination/primary/getOrders'
import exchangeNow from './pagination/getOrders/exchangeNow'
import announcement from './pagination/center/announcement'
import announcementDetail from './pagination/center/announcementDetail'
import cashAddress from './pagination/center/cashAddress'
import certification from './pagination/center/certification'
import changePwd from './pagination/center/changePwd'
import feedback from './pagination/center/feedback'
import feedbackList from './pagination/center/feedbackList'
import invite from './pagination/center/invite'
import pushAddress from './pagination/center/pushAddress'
import safe from './pagination/center/safe'
import team from './pagination/center/team'
import toCertificate from './pagination/center/toCertificate'
import exchangeList from './pagination/capital/exchangeList'
import getOrdersDetail from './pagination/capital/getOrdersDetail'
import getOrdersList from './pagination/capital/getOrdersList'
import incomeList from './pagination/capital/incomeList'
import pyDetail from './pagination/capital/pyDetail'
import pyList from './pagination/capital/pyList'
import recharge from './pagination/capital/recharge'
import rechargeList from './pagination/capital/rechargeList'
import streamDetail from './pagination/capital/streamDetail'
import transfer from './pagination/capital/transfer'
import transferList from './pagination/capital/transferList'
import withdrawals from './pagination/capital/withdrawals'
import withdrawalsList from './pagination/capital/withdrawalsList'
import detail from './pagination/capital/sub/detail'


// $i18n.register['註冊']

// 獲取 靜態文本的 函數
function getText (lang) {
    return {
        register: register[lang],
        registerNext: registerNext[lang],
        primary: primary[lang],
        login: login[lang],
        forget: forget[lang],
        capital: capital[lang],
        center: center[lang],
        getOrders: getOrders[lang],
        exchangeNow: exchangeNow[lang],
        announcement: announcement[lang],
        announcementDetail: announcementDetail[lang],
        cashAddress: cashAddress[lang],
        certification: certification[lang],
        changePwd: changePwd[lang],
        feedback: feedback[lang],
        feedbackList: feedbackList[lang],
        invite: invite[lang],
        pushAddress: pushAddress[lang],
        safe: safe[lang],
        team: team[lang],
        toCertificate: toCertificate[lang],
        exchangeList: exchangeList[lang],
        getOrdersDetail: getOrdersDetail[lang],
        getOrdersList: getOrdersList[lang],
        incomeList: incomeList[lang],
        pyDetail: pyDetail[lang],
        pyList: pyList[lang],
        recharge: recharge[lang],
        rechargeList: rechargeList[lang],
        streamDetail: streamDetail[lang],
        transfer: transfer[lang],
        transferList: transferList[lang],
        withdrawals: withdrawals[lang],
        withdrawalsList: withdrawalsList[lang],
        detail: detail[lang],
    }
}


export default function (Vue, lang) {
    Vue.prototype.$i18n = getText(lang)
}