<template>
    <div id="registerNext">
        <van-nav-bar
        :title="$i18n.registerNext['設置支付密碼']"
        left-arrow
        @click-left="$router.back(-1)"
        />
        <form id="main">
            <customizeInput>
                <input
                v-model="inputMsg.pwd"
                :type="pwdInputType"
                :placeholder="$i18n.registerNext['支付密碼(6至12位數字和字母組合)']"
                autocomplete='tel'>
                <i :class="['iconfont', pwdEyeIcon]" @click="togglePwd()"></i>
            </customizeInput>
            <customizeInput>
                <input
                v-model="inputMsg.confirmPwd"
                :type="confirmPwdInputType"
                :placeholder="$i18n.registerNext['確認支付密碼']"
                autocomplete='tel'>
                <i :class="['iconfont', confirmPwdEyeIcon]" @click="toggleConfirmPwd()"></i>
            </customizeInput>
            <customizeInput>
                <input v-model="inputIdentifyCode" type="tel" :placeholder="$i18n.registerNext['請輸入右邊圖形驗證碼']">
                <span @click="refreshCode">
                    <SIdentify
                    :identifyCode="identifyCode"></SIdentify>
                </span>
            </customizeInput>

            <span>
                <van-button type="info" @click.prevent="confirm()">{{ $i18n.registerNext['確認'] }}</van-button>
            </span>
        </form>
    </div>
</template>

<script>
import customizeInput from '@/components/common/input.vue'
import SIdentify from '@/components/common/identify'

export default {
    name: 'registerNext',
    components: {
        customizeInput,
        SIdentify
    },
    data() {
        return {
            pwdInputType: 'password', //密碼框類型
            pwdEyeIcon: 'iconeyeclose',  //眼睛圖標
            confirmPwdInputType: 'password', //密碼框類型
            confirmPwdEyeIcon: 'iconeyeclose',  //眼睛圖標
            inputMsg: {
                pwd: '',
                confirmPwd: '',
            },
            inputIdentifyCode: '', //用戶輸入的驗證碼
            // 驗證碼
            identifyCodes: "1234567890",
            identifyCode: ""
        }
    },
    mounted() {
        this.refreshCode()
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
        async confirm () {
            let { registerNext } = this.$i18n
            let pwdRex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/g //驗證密碼的正則
            if (!this.inputMsg.pwd) return Toast( registerNext['請輸入支付密碼'] )
            if ( !pwdRex.test(this.inputMsg.pwd) ) return Toast( registerNext['支付密碼(6至12位數字和字母組合)'] )
            if (this.inputMsg.pwd !== this.inputMsg.confirmPwd) return Toast( registerNext['兩次密碼輸入不一致'] )
            if (this.identifyCode !== this.inputIdentifyCode) {
                Dialog.alert({
                    message: registerNext['驗證碼輸入有誤']
                })
                this.refreshCode()
                return false
            }
            let info = JSON.parse( sessionStorage.getItem('info') )
            let { mobile, pwd, verifyCode, inviteCode } = info
            let res = await $ajax('register', {
                mobile,
                verifycode: verifyCode,
                pwd,
                agentid: inviteCode,
                paypwd: this.inputMsg.pwd
            })
            if (!res) return false
            // 如果爲 非 app 進入, 則跳轉下載頁面, 並終止函數
            if ( sessionStorage.getItem('noApp') ) {
                window.location.href = 'https://im22.me/Zcak'
                return false
            }
            // 進行登錄 提示
			const toast = Toast.loading({
				message: registerNext['登入中...'],
				forbidClick: true, // 禁用背景点击
				loadingType: 'spinner',
				position: 'bottom',
				duration: 0
            })
            // 註冊成功 直接登錄, 跳轉登錄頁面
			let loginRes = await $ajax('login',{
				mobile,
				pwd
            }, () => {
				toast.clear()
			})
            sessionStorage.removeItem('info') //移除 sessionStorage
            localStorage.setItem('openid', loginRes.openid)
			localStorage.setItem('ip', loginRes.ip)
			localStorage.setItem('mobile', mobile)
			this.$router.push({
				name: 'primary'
			})
            // this.$router.push({
            //     name: 'login'
            // })
        },
        // 驗證碼
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
        }
    }
}
</script>
<style lang="less" scoped>
form#main {
    margin-top: 3rem;
    padding: 0 1rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    > p {
        margin-top: 0rem;
    }
    label {
        .iconfont {
            font-size: 1.5rem;
            color: #246fbd;
        }
    }
    label:nth-child(3) {
        align-items: center;
    }
    > span:last-child {
        width: 95%;
        margin: 0 auto;
        button {
            width: 100%;
        }
    }
}
</style>