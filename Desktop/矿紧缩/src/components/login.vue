<template>
	<div id="login">
		<div>
			<p>嗨！矿友们好</p>
			<p style="color:#999;">{{'欢迎使用哈希矿场'}}</p>
		</div>
		<div>
			<form>
				<customizeInput>
					<input v-model="inputMsg.mobile" maxlength="11" type="tel" :placeholder="$i18n.login['請輸入手機號碼']">
				</customizeInput>
				<customizeInput>
					<input v-model="inputMsg.pwd" 
					:type="pwdInputType" 
					:placeholder="$i18n.login['登入密碼(6至12位数字和字母组合)']" 
					maxlength="12" 
					autocomplete='tel'>
					<i :class="['iconfont', eyeIcon]" @click="togglePwd()"></i>
				</customizeInput>
				<span>
					<van-button type="info" @click.prevent="login()">{{ $i18n.login['登入'] }}</van-button>
				</span>
			</form>
		</div>
		<div>
			<router-link to="/forget" tag="p">
				{{ $i18n.login['忘記密碼'] }} |
			</router-link>
			<!-- <p style="margin: 0 10px">|</p> -->
			<router-link to="/register/0" tag="p">
				{{  $i18n.login['註冊'] }}
			</router-link>
		</div>
		<div>
			继续登录即代表同意
			<router-link to="/forget" tag="span">
				
			</router-link>
		</div>
	</div>
</template>

<script>
import customizeInput from './common/input.vue'

export default {
	name: 'login',
	data () {
		return {
			pwdInputType: 'password', //密碼框類型
			eyeIcon: 'iconeyeclose',  //眼睛圖標
			inputMsg: {
				mobile: '',
				pwd: '',
			},
		}
	},
	components: {
		customizeInput
	},
	methods: {
		// 隱示密碼和顯示密碼
		togglePwd () {
			this.pwdInputType = this.pwdInputType === 'password' ? 'text' : 'password'
			this.eyeIcon = this.eyeIcon === 'iconeyeclose' ? 'iconeyeopen' : 'iconeyeclose'
		},
		// 登入
		async login () {
			let { login } = this.$i18n
			let {mobile, pwd} = this.inputMsg
			if (!mobile || !pwd) {
				return Toast({
					message: login['請填寫賬號以及密碼'],
					duration: 1000,
				})
			}
			if (mobile.length < 11) {
				return Toast({
					message: login['請填寫正確的手機號'],
					duration: 1000,
				})
			}
			// 進行登錄 提示
			const toast = Toast.loading({
				message: login['登入中...'],
				forbidClick: true, // 禁用背景点击
				loadingType: 'spinner',
				position: 'bottom',
				duration: 0
			})
			// 發送 ajax
			let res = await $ajax('login',{
				mobile,
				pwd
			}, () => {
				toast.clear()
			})
			// 如果返回爲 false ,則中斷函數
			if (!res) return false
			// 保存 openid 以及 ip 到本地
			localStorage.setItem('openid', res.openid)
			localStorage.setItem('ip', res.ip)
			localStorage.setItem('mobile', this.inputMsg.mobile)
			this.$router.push({
				name: 'primary'
			})
		}
	}
}
</script>

<style lang="less" scoped>
// 公共
.flex {
	display: flex;
	display: -webkit-flex;
}
.iconfont {
	color: #999;
	font-size: 1.5rem;
}
#login {
	padding: 0 1rem;
	div:first-child {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 8rem;
		margin-bottom: 2rem;
		* {
			margin: 0;
		}
		p:first-child {
			margin-bottom: 8px;
		}
	}
	div:nth-child(2) {
		form {
			.flex;
			flex-direction: column;
			span {
				width: 100%;
				display: block;
				padding: 0 0.8rem;
				box-sizing: border-box;
				button {
					width: 100%;
					font-size: 1.1rem;
				}
			}
		}
	}
	div:nth-child(3) {
		.flex;
		// justify-content: space-between;
		position: absolute;
		bottom: 20px;
		justify-content: center;
		width: 100%;
		color: #1e73c8;
	}
	div:nth-child(4){
		.flex;
		position: absolute;
		bottom: 10px;
		justify-content: center;
		width: 100%;
		span{
			color: #1e73c8;

		}
	}
}
</style>

