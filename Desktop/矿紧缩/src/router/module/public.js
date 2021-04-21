export default [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'index' },
        component: () => import("@/views/home"),
        meta:{
            index: 0,
            mustLogin: false,//1111,
        },
        children: [
            {
                path: '/index', // 首页
                name: 'index',
                component: () => import("@/views/home/index.vue"),
                props: false,//1111,
                meta:{
                    index: 1,
                    mustLogin: true,//
                }
            },
        ]
    },
    {
        path: '/register/:inviteCode?', // 注册
        name: 'register',
        component: () => import("@/views/register.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: false,//
        }
    },
    
    {
        path: '/settingPwd', // 设置密码
        name: 'settingPwd',
        component: () => import("@/views/settingPwd.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: false,//
        }
    },
    {
        path: '/content', // 文章详情
        name: 'content',
        component: () => import("@/views/content.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: false,//
        }
    },
    {
        path: '/setting', // 账户设置
        name: 'setting',
        component: () => import("@/views/setting.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/forget', // 忘记密码
        name: 'forget',
        component: () => import("@/views/forget.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: false,//
        }
    },
    {
        path: '/products', // 产品列表
        name: 'products',
        component: () => import("@/views/home/products.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/detail/:id?', // 产品详情
        name: 'detail',
        component: () => import("@/views/detail.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/order/submit/:id?', // 提交订单
        name: 'orderSubmit',
        component: () => import("@/views/orderSubmit.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/user', // 个人中心
        name: 'user',
        component: () => import("@/views/home/user.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/user/realname', // 基础认证
        name: 'realname',
        component: () => import("@/views/realname.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/about', // 关于我们
        name: 'about',
        component: () => import("@/views/about.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/feedback', // 意见反馈
        name: 'feedback',
        component: () => import("@/views/feedback.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/agent', // 代理中心
        name: 'agent',
        component: () => import("@/views/agent.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/recharge/:type', // 充值
        name: 'recharge',
        component: () => import("@/views/recharge.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/exchange/:type/:typetype', // 转入
        name: 'exchange',
        component: () => import("@/views/exchange.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/exchangechu/:type/:typetype', // 转出
        name: 'exchangechu',
        component: () => import("@/views/exchangechu.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/myOrder', // 我的订单
        name: 'myOrder',
        component: () => import("@/views/myOrder.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/orderlist/:type?', // 订单列表
        name: 'orderlist',
        component: () => import("@/views/orderlist.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/orderDetail/:id', // 订单详情
        name: 'orderDetail',
        component: () => import("@/views/orderDetail.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/addrecord/:id?', // 扩容记录
        name: 'addrecord',
        component: () => import("@/views/addrecord.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/wollet', // 我的钱包
        name: 'wollet',
        component: () => import("@/views/wollet.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/moneyDetail/:type/:num', // 资产详情
        name: 'moneyDetail',
        component: () => import("@/views/moneyDetail.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/record/:type?', // 记录列表充值提现
        name: 'record',
        component: () => import("@/views/record.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/wolletRecord', // 资金记录
        name: 'wolletRecord',
        component: () => import("@/views/wolletRecord.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/recordDetail', // 记录详情
        name: 'recordDetail',
        component: () => import("@/views/recordDetail.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/changeType/:type/:num', // 兑换
        name: 'changeType',
        component: () => import("@/views/changeType.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/huiMoney', // 汇款订单
        name: 'huiMoney',
        component: () => import("@/views/huiMoney.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/binding/:type/:id?', // 绑定体现设置
        name: 'binding',
        component: () => import("@/views/binding.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/receiveSet', // 收款列表
        name: 'receiveSet',
        component: () => import("@/views/receiveSet.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/cash', // 提现
        name: 'cash',
        component: () => import("@/views/cash.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/poster', // 邀请好友
        name: 'poster',
        component: () => import("@/views/poster.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/safe', // 账户安全
        name: 'safe',
        component: () => import("@/views/safe.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/base', // 基础认证
        name: 'base',
        component: () => import("@/views/base.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/feeRecord', // 缴费记录
        name: 'feeRecord',
        component: () => import("@/views/feeRecord.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/syDetail', // 收益明细
        name: 'syDetail',
        component: () => import("@/views/syDetail.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/xujiaodianfei/:id/:total', // 交电费
        name: 'xujiaodianfei',
        component: () => import("@/views/xujiaodianfei.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/gonggao/:id', // 公告
        name: 'gonggao',
        component: () => import("@/views/gonggao.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/footerText/:id', // 首页底部公告的内容
        name: 'footerText',
        component: () => import("@/views/footerText.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/suocanglist', // 公告
        name: 'suocanglist',
        component: () => import("@/views/suocanglist.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: '/changepwd', // 修改登陆密码
        name: 'changepwd',
        component: () => import("@/views/changepwd.vue"),
        props: false,//1111,
        meta:{
            index: 1,
            mustLogin: true,//
        }
    },
    {
        path: "/login", //登录
        name: "login",
        component: () => import("@/views/login.vue"),
        meta: {
            index: 0,
            mustLogin: false,//1111,
        }
    }
];