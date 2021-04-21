<template>
    <div id="forget">
        <van-nav-bar
        :title="$i18n.forget['忘記密碼']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div>
            <form>
                <customizeInput>
                    <input v-model="inputMsg.mobile" maxlength="11" type="tel" :placeholder="$i18n.forget['請輸入手機號碼']">
                </customizeInput>
                <customizeInput>
                    <input 
                    v-model="inputMsg.verifyCode"
                    type="tel" 
                    :placeholder="$i18n.forget['簡訊驗證碼']">
                    <span @click="senVerifyCode()">{{ timeAndTextOfSendcode }}</span>
                </customizeInput>
                <customizeInput>
                    <input 
                    v-model="inputMsg.pwd"
                    :type="pwdInputType" 
                    :placeholder="$i18n.forget['新密碼(6至12位数字和字母组合)']" 
                    maxlength="12" 
                    autocomplete='tel'>
                    <i :class="['iconfont', pwdEyeIcon]" @click="togglePwd()"></i>
                </customizeInput>
                <customizeInput>
                    <input 
                    v-model="inputMsg.confirmPwd"
                    :type="confirmPwdInputType" 
                    :placeholder="$i18n.forget['確認密碼']" 
                    maxlength="12" 
                    autocomplete='tel'>
                    <i :class="['iconfont', confirmPwdEyeIcon]" @click="toggleConfirmPwd()"></i>
                </customizeInput>
                <span>
					<van-button  type="info" @click.prevent="sumbit()">{{ $i18n.forget['確定'] }}</van-button>
				</span>
            </form>
        </div>
    </div>
</template>

<script>
import customizeInput from '@/components/common/input.vue'

export default {
    name: 'forget',
    data() {
        return {
            names: '',
            pwdInputType: 'password', //密碼框類型
            pwdEyeIcon: 'iconeyeclose',  //眼睛圖標
            confirmPwdInputType: 'password', //密碼框類型
            confirmPwdEyeIcon: 'iconeyeclose',  //眼睛圖標
            inputMsg: {
                mobile: '',
                verifyCode: '',
                pwd: '',
                confirmPwd: ''
            },
            timeAndTextOfSendcode: this.$i18n.forget['發送驗證碼'], //提示發送驗證碼的時間/文字
            timer: '', // 計時器
        }
    },
    components: {
        customizeInput
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
        timing () {
            this.timer = setInterval( () => {
                this.timeAndTextOfSendcode--
                if (this.timeAndTextOfSendcode <= 0) {
                    clearInterval(this.timer)
                    this.timeAndTextOfSendcode = this.$i18n.forget['發送驗證碼']
                }
            }, 1000)
        },
        // 發送 驗證碼
        async senVerifyCode () {
            let { forget } = this.$i18n
            if (this.timeAndTextOfSendcode !== forget['發送驗證碼'] ) return false
            if (!this.inputMsg.mobile) return Toast( forget['請填寫手機號碼'] )
            let res = await $ajax('sendVerifycode',{
                mobile: this.inputMsg.mobile,
                temp: 'sms_forget'
            })
            if (!res) return false
            Toast(res.msg)
            this.timeAndTextOfSendcode = 60
            this.timing() //執行倒計時
        },
        // 提交
        async sumbit () {
            let { forget } = this.$i18n
            let { mobile, verifyCode, pwd, confirmPwd } = this.inputMsg
            if (mobile.length < 11) return Toast( forget['請填寫正確的手機號碼'] )
            if (!verifyCode) return Toast( forget['請填寫驗證碼'] )
            if (!pwd || pwd !== confirmPwd) return Toast( forget['兩次密碼輸入不一致'] )
            let res = await $ajax('forget', {
                mobile,
                verifycode: verifyCode,
                pwd
            })
            if (!res) return false
            // 返回 登錄
            Dialog.alert({
                message: res.msg
            })
            this.$router.push({
                name: 'login'
            })
        }
    },
}
</script>
<style lang="less" scoped>
i {
    color: black!important;
}
.iconfont {
	color: #246fbd!important;
	font-size: 1.5rem;
}

#forget{
    z-index: 999; //讓 在切換頁面時, 退出特效的頁面, 置於最上方
    > div:nth-child(2) {
        padding: 0 1rem;
        margin-top: calc(50px + 3rem);
        label span {
            color: #246fbd;
        }
        form > span {
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
</style>