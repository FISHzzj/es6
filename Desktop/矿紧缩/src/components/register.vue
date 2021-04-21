<template>
    <div id="register">
        <van-nav-bar
        :title="$i18n.register['註冊']"
        left-arrow
        @click-left="$router.back(-1)"
        />
        <div>
			<p>嗨！矿友们好</p>
			<p>欢迎使用哈希矿场</p>
		</div>
        <div>
			<form>
				<customizeInput>
					<input v-model="inputMsg.mobile" type="tel" maxlength="11" :placeholder="$i18n.register['請輸入手機號碼']">
				</customizeInput>
                <customizeInput>
                    <input
                    v-model="inputMsg.verifyCode"
                    type="tel"
                    :placeholder="$i18n.register['簡訊驗證碼']">
                    <span @click="senVerifyCode()">{{ timeAndTextOfSendcode }}</span>
                </customizeInput>
				<customizeInput>
                    <input
                    v-model="inputMsg.pwd"
                    :type="pwdInputType"
                    :placeholder="$i18n.register['登入密碼(6至12位數字和字母組合)']"
                    maxlength="12"
                    autocomplete='tel'>
                    <i :class="['iconfont', pwdEyeIcon]" @click="togglePwd()"></i>
                </customizeInput>
                <customizeInput>
                    <input
                    v-model="inputMsg.confirmPwd"
                    :type="confirmPwdInputType"
                    :placeholder="$i18n.register['確認密碼']"
                    maxlength="12"
                    autocomplete='tel'>
                    <i :class="['iconfont', confirmPwdEyeIcon]" @click="toggleConfirmPwd()"></i>
                </customizeInput>
                <customizeInput>
                    <input v-model="inputMsg.inviteCode" type="text" :placeholder="$i18n.register['請輸入推薦碼']">
                </customizeInput>
				<span>
					<van-button class="van-button--info" @click.prevent="next()"> {{ $i18n.register['下一頁'] }}</van-button>
				</span>
			</form>
		</div>
    </div>
</template>

<script>
import customizeInput from '@/components/common/input.vue'

export default {
    name: 'register',
    props: ['inviteCode'],
    components: {
        customizeInput
    },
    data() {
        return {
            pwdInputType: 'password', //密碼框類型
            pwdEyeIcon: 'iconeyeclose',  //眼睛圖標
            confirmPwdInputType: 'password', //密碼框類型
            confirmPwdEyeIcon: 'iconeyeclose',  //眼睛圖標
			inputMsg: {
				mobile: '',
                pwd: '',
                verifyCode: '',
                confirmPwd: '',
                inviteCode: ''
            },
            timeAndTextOfSendcode: this.$i18n.register['發送驗證碼'], //提示發送驗證碼的時間/文字
            timer: '', // 計時器
        }
    },
    created () {
        // 非 app 進入註冊頁面
        if (this.inviteCode !== '0') {
            this.inputMsg.inviteCode = this.inviteCode
            sessionStorage.setItem('noApp', true) // 標記爲非APP進入
        }
        let info = JSON.parse(sessionStorage.getItem('info')) //獲取填寫信息
        // 如果 info 存在
        if (info) {
            let { mobile, pwd, verifyCode, confirmPwd, inviteCode } = info
            Object.keys(info).forEach( key => {
                this.inputMsg[key] = info[key]
            })
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
    methods: {
        // 隱示密碼和顯示密碼
		togglePwd () {
			this.pwdInputType = this.pwdInputType === 'password' ? 'text' : 'password'
			this.pwdEyeIcon = this.pwdEyeIcon === 'iconeyeclose' ? 'iconeyeopen' : 'iconeyeclose'
        },
        toggleConfirmPwd () {
            this.confirmPwdInputType = this.confirmPwdInputType === 'password' ? 'text' : 'password'
			this.confirmPwdEyeIcon = this.confirmPwdEyeIcon === 'iconeyeclose' ? 'iconeyeopen' : 'iconeyeclose'
        },
        // 註冊
        next () {
            let { register } = this.$i18n
            let pwdRex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/g //驗證密碼的正則
            if (this.inputMsg.mobile.length < 11) return Toast( register['請填寫正確的手機號碼'] )
            if (!this.inputMsg.verifyCode) return Toast( register['請填寫驗證碼'] )
            if (!this.inputMsg.pwd) return Toast( register['請填寫密碼'] )
            if ( !pwdRex.test(this.inputMsg.pwd) ) return Toast( register['登入密碼(6至12位數字和字母組合)'] )
            if (this.inputMsg.pwd !== this.inputMsg.confirmPwd) return Toast( register['兩次密碼輸入不一致'] )
            if (!this.inputMsg.inviteCode) return Toast('請填寫推薦碼')
            sessionStorage.setItem('info', JSON.stringify(this.inputMsg)) //保存到會話窗口
            // 跳轉到下一頁
            this.$router.push({
                name: 'registerNext'
            })
        },
        timing () {
            this.timer = setInterval( () => {
                this.timeAndTextOfSendcode--
                if (this.timeAndTextOfSendcode <= 0) {
                    clearInterval(this.timer)
                    this.timeAndTextOfSendcode = this.$i18n.register['發送驗證碼']
                }
            }, 1000)
        },
        // 发送验证码
        async senVerifyCode () {
            let { register } = this.$i18n
            if ( this.timeAndTextOfSendcode !== register['發送驗證碼'] ) return false
            if (!this.inputMsg.mobile) return Toast( register['請填寫手機號碼'] )
            let res = await $ajax('sendVerifycode',{
                mobile: this.inputMsg.mobile,
                temp: 'sms_reg'
            })
            if (!res) return false
            Toast(res.msg)
            this.timeAndTextOfSendcode = 60
            this.timing() //執行倒計時
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
	display: flex;
	display: -webkit-flex;
}
.iconfont {
	color: #246fbd;
	font-size: 1.5rem;
}

#register {
    z-index: 999; //讓 在切換頁面時, 退出特效的頁面, 置於最上方
    > div:first-child {
        i {
            color: black!important;
        }
    }
	> div:nth-child(2) {
        padding: 0 1rem;
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 5rem;
		margin-bottom: 2rem;
		* {
			margin: 0;
		}
		p:first-child {
			margin-bottom: 8px;
		}
    }
    > div:nth-child(3) {
        padding: 0 1rem;
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
            label:nth-child(2) span {
                width: auto;
                color: #246fbd;
                padding: 0;
            }
		}
	}
}
</style>