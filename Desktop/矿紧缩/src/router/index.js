import Vue from 'vue'
import Router from 'vue-router'
import module from "./module";
// import Primary from '@/components/primary'
// import Login from '@/components/login'
// import Forget from '@/components/forget'
// import Register from '@/components/register'
// import Demo1 from '@/components/primary/demo1'
// import Demo2 from '@/components/primary/demo2'
// import Center from '@/components/primary/center'

const Primary = () => import("@/components/primary")
const Login = () => import("@/components/login")
const Forget = () => import("@/components/forget")
const Register = () => import("@/components/register")
const RegisterNext = () => import("@/components/registerNext")

const Center = () => import("@/components/primary/center")
const Capital = () => import("@/components/primary/capital")
const GetOrders = () => import("@/components/primary/getOrders")

const Certification = () => import("@/components/center/certification")
const ToCertificate = () => import("@/components/center/toCertificate")
const Safe = () => import("@/components/center/safe")
const Team = () => import("@/components/center/team")
const CashAddress = () => import("@/components/center/cashAddress")
const PushAddress = () => import("@/components/center/pushAddress")
const Invite = () => import("@/components/center/invite")
const ChangePwd = () => import("@/components/center/changePwd")
const Feedback = () => import("@/components/center/feedback")
const FeedbackQ = () => import("@/components/center/feedbackQ")
const FeedbackList = () => import("@/components/center/feedbackList")
const Announcement = () => import("@/components/center/announcement")
const AnnouncementDetail = () => import("@/components/center/announcementDetail")

const Recharge = () => import("@/components/capital/recharge")
const RechargeList = () => import("@/components/capital/rechargeList")
const Withdrawals = () => import("@/components/capital/withdrawals")
const WithdrawalsList = () => import("@/components/capital/withdrawalsList")
const Detail = () => import("@/components/capital/sub/detail")
const Transfer = () => import("@/components/capital/transfer")
const TransferList = () => import("@/components/capital/transferList")
const PyList = () => import("@/components/capital/pyList")
const PyDetail = () => import("@/components/capital/pyDetail")
const IncomeList = () => import("@/components/capital/incomeList")
const GetOrdersList = () => import("@/components/capital/getOrdersList")
const GetOrdersDetail = () => import("@/components/capital/getOrdersDetail")
const ExchangeList = () => import("@/components/capital/exchangeList")
const StreamDetail = () => import("@/components/capital/streamDetail")

const ExchangeNow = () => import('@/components/getOrders/exchangeNow')


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export default new Router({
	routes: [
		...module,
		// {
		// 	path: '/',
		// 	name: 'primary',
		// 	redirect: { name: 'capital' },
		// 	component: Primary,
		// 	meta:{
		// 		index: 0,
		// 		mustLogin: false,//1111,
		// 	},
		// 	children: [
		// 		{
		// 			path: '/capital',
		// 			name: 'capital',
		// 			component: Capital,
		// 			meta:{
		// 				index: 0,
		// 				mustLogin: false,//1111,
		// 			}
		// 		},
		// 		{
		// 			path: '/getOrders',
		// 			name: 'getOrders',
		// 			component: GetOrders,
		// 			meta:{
		// 				index: 0,
		// 				mustLogin: false,//1111,
		// 			}
		// 		},
		// 		{
		// 			path: '/center',
		// 			name: 'center',
		// 			component: Center,
		// 			meta:{
		// 				index: 0,
		// 				mustLogin: false,//1111,
		// 			}
		// 		},
		// 	]
		// },
		// {
		// 	path: '/login',
		// 	name: 'login',
		// 	component: Login,
		// 	meta:{
		// 		index: 0,
		// 		mustLogin: false,//
		// 	}
		// },
		// {
		// 	path: '/forget',
		// 	name: 'forget',
		// 	component: Forget,
		// 	meta:{
		// 		index: 1,
		// 		mustLogin: false,//
		// 	}
		// },
		// {
		// 	path: '/register/:inviteCode', // 推薦嗎
		// 	name: 'register',
		// 	component: Register,
		// 	props: false,//1111,
		// 	meta:{
		// 		index: 1,
		// 		mustLogin: false,//
		// 	}
		// },
		{
			path: '/registerNext',
			name: 'registerNext',
			component: RegisterNext,
			meta:{
				index: 2,
				mustLogin: false,//
			}
		},
		{
			path: '/certification',
			name: 'certification',
			component: Certification,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/toCertificate/:status', //status, 實名狀態, -1未实名0审核中1已实名2爲已駁回
			name: 'toCertificate',
			component: ToCertificate,
			props: false,//1111,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/safe',
			name: 'safe',
			component: Safe,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/team',
			name: 'team',
			component: Team,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/cashAddress',
			name: 'cashAddress',
			component: CashAddress,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/pushAddress/:id',
			name: 'pushAddress',
			component: PushAddress,
			props: false,//1111,
			meta:{
				index: 3,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/invite',
			name: 'invite',
			component: Invite,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/changePwd/:type', // login爲登錄密碼 money爲資金密碼
			name: 'changePwd',
			component: ChangePwd,
			props: false,//1111,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/feedback', 
			name: 'feedback',
			component: Feedback,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/feedbackQ', 
			name: 'feedbackQ',
			component: FeedbackQ,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/feedbackList', 
			name: 'feedbackList',
			component: FeedbackList,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/announcement', 
			name: 'announcement',
			component: Announcement,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/announcementDetail/:id',
			name: 'announcementDetail',
			component: AnnouncementDetail,
			props: false,//1111,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/recharge',
			name: 'recharge',
			component: Recharge,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/rechargeList',
			name: 'rechargeList',
			component: RechargeList,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/withdrawals/:addressId', //addressId 提幣地址id, 用於 ajax 傳值獲取數據, 默認爲0
			name: 'withdrawals',
			component: Withdrawals,
			props: false,//1111,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/withdrawalsList',
			name: 'withdrawalsList',
			component: WithdrawalsList,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/detail/:type/:id', // type, 1爲充幣, 2爲提幣
			name: 'detail',
			component: Detail,
			props: false,//1111,
			meta:{
				index: 3,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/transfer',
			name: 'transfer',
			component: Transfer,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/transferList',
			name: 'transferList',
			component: TransferList,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/pyList',
			name: 'pyList',
			component: PyList,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/pyDetail',
			name: 'pyDetail',
			component: PyDetail,
			meta:{
				index: 3,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/incomeList',
			name: 'incomeList',
			component: IncomeList,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/getOrdersList',
			name: 'getOrdersList',
			component: GetOrdersList,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/getOrdersDetail/:id',
			name: 'getOrdersDetail',
			component: GetOrdersDetail,
			props: false,//1111,
			meta:{
				index: 2,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/exchangeList',
			name: 'exchangeList',
			component: ExchangeList,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/streamDetail',
			name: 'streamDetail',
			component: StreamDetail,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
		{
			path: '/exchangeNow',
			name: 'exchangeNow',
			component: ExchangeNow,
			meta:{
				index: 1,
				mustLogin: false,//1111,
			}
		},
	]
})
