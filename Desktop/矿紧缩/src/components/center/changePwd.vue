<template>
    <div id="changPwd">
        <van-nav-bar
        :title="type === 'login' ? $i18n.changePwd['修改登錄密碼'] : $i18n.changePwd['修改資金密碼'] "
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <form>
            <!-- fuck studip -->
            <!-- <customizeInput>
                <input v-model="inputMsg.oldPwd" 
                :type="showOldPwd ? 'text' : 'password'" 
                placeholder="舊密碼" 
                maxlength="12" 
                autocomplete='tel'>
                <i :class="['iconfont', showOldPwd ? 'iconeyeopen' : 'iconeyeclose']"
                @click="toShowPwd('showOldPwd')"></i>
            </customizeInput> -->
            <customizeInput>
                <input v-model="inputMsg.newPwd" 
                :type="showNewPwd ? 'text' : 'password'" 
                :placeholder="$i18n.changePwd['新密碼(6至12位數字和字母組合)']" 
                maxlength="12" 
                autocomplete='tel'>
                <i :class="['iconfont', showNewPwd ? 'iconeyeopen' : 'iconeyeclose']"
                @click="toShowPwd('showNewPwd')"></i>
            </customizeInput>
            <customizeInput>
                <input v-model="inputMsg.confirmPwd" 
                :type="showConfirmPwd ? 'text' : 'password'" 
                :placeholder="$i18n.changePwd['確認密碼']" 
                maxlength="12" 
                autocomplete='tel'>
                <i :class="['iconfont', showConfirmPwd ? 'iconeyeopen' : 'iconeyeclose']"
                @click="toShowPwd('showConfirmPwd')"></i>
            </customizeInput>
            <customizeInput>
                <input v-model="inputMsg.verifyCode" 
                type="text" 
                :placeholder="$i18n.changePwd['簡訊驗證碼']" 
                maxlength="12" 
                autocomplete='tel'>
                <span class="sendCode" @click="sendCode()">{{timeAndTextOfSendcode}}</span>
            </customizeInput>
            <span>
                <van-button type="info" @click.prevent="confirm()">
                    {{ $i18n.changePwd['確定'] }}
                </van-button>
            </span>
        </form>
    </div>
</template>

<script>
import customizeInput from '@/components/common/input.vue'

export default {
    name: 'changPwd',
    props: ['type'],
    components: {
        customizeInput
    },
    data() {
        return {
            // showOldPwd: false,
            showNewPwd: false,
            showConfirmPwd: false,
            // input 輸入 對象
            inputMsg: {
                // oldPwd: '',
                newPwd: '',
                confirmPwd: '',
                verifyCode: ''
            },
            timeAndTextOfSendcode: this.$i18n.changePwd['發送驗證碼'], //提示發送驗證碼的時間/文字
            timer: '', // 計時器
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
    methods: {
        // 展示/隱藏 密碼
        toShowPwd (props) {
            this[props] = !this[props]
        },
        timing () {
            this.timer = setInterval( () => {
                this.timeAndTextOfSendcode--
                if (this.timeAndTextOfSendcode <= 0) {
                    clearInterval(this.timer)
                    this.timeAndTextOfSendcode = this.$i18n.changePwd['發送驗證碼']
                }
            }, 1000)
        },
        // 發送驗證碼
        async sendCode () {
            if (this.timeAndTextOfSendcode !== this.$i18n.changePwd['發送驗證碼']) return false
            let mobile = localStorage.getItem('mobile')
            let res = await $ajax('sendVerifycode',{
                mobile,
                temp: 'sms_forget'
            })
            if (!res) return false
            Toast(res.msg)
            this.timeAndTextOfSendcode = 60
            this.timing()
        },
        async confirm () {
            let { changePwd } = this.$i18n
            // let {oldPwd, newPwd, confirmPwd, verifyCode} = this.inputMsg
            let {newPwd, confirmPwd, verifyCode} = this.inputMsg
            if (!newPwd) return Toast( changePwd['請輸入新密碼'] )
            if (newPwd !== confirmPwd) return Toast( changePwd['兩次密碼輸入不一致'] )
            if (!verifyCode) return Toast( changePwd['請輸入驗證碼'] )
            // 根據 類型 設置 ajax 參數名 以及 apiname
            // let oldPwd_arg = this.type === 'login' ? 'pwded' : 'paypwded'
            let newPwd_arg = this.type === 'login' ? 'pwd' : 'paypwd'
            let verifyCode_arg = 'verifycode'
            let apiname = this.type === 'login' ? 'changePwdOfLogin' : 'changePwdOfPay'
            // 發送 ajax
            let res = await $ajax(apiname, {
                op: 'create',
                // [oldPwd_arg]: oldPwd,
                [newPwd_arg]: newPwd,
                [verifyCode_arg]: verifyCode,
            })
            if (!res) return false
            if (this.type !== 'login') {
                Dialog.alert({
                    title: changePwd['密碼修改提示'],
                    message: res.msg
                })
                this.$router.back(-1)
                return false
            }
            Dialog.alert({
                title: changePwd['密碼修改提示'],
                message: changePwd['密碼修改成功, 請重新登入賬號']
            })
            // 更改 本地 ip 信息, 過會他就會自動退出了
            localStorage.removeItem('ip')
            localStorage.removeItem('openid')
            localStorage.removeItem('mobile')
            this.$router.push({
                name: 'login'
            })
        },
    }
}
</script>
<style lang="less" scoped>
.iconfont {
	color: #246fbd;
	font-size: 1.5rem;
}
#changPwd {
    form {
        margin-top: calc(50px + 1rem);
        padding: 0 1rem;
        > span {
            width: 100%;
            display: block;
            padding: 0 0.5rem;
            box-sizing: border-box;
            button {
                width: 100%;
            }
        }
        .sendCode {
            color: #246fbd;
        }
    }
}
</style>