<template>
    <div id="pushAddress">
        <van-nav-bar
        :title="`${id === '0' ? $i18n.pushAddress['添加提幣地址'] : $i18n.pushAddress['修改提幣地址'] }`"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div class="main">
            <div>
                <p>
                    <span>{{ $i18n.pushAddress['提幣地址'] }}</span>
                    <span @click="scanCode()">
                        <i class="iconfont iconsaoma"></i>
                    </span>
                </p>
                <p>
                    <customizeInput :setStyle="inputStyle">
                        <input type="text" :placeholder="$i18n.pushAddress['請輸入提幣地址(仅支持USDT-ERC20代币)']" v-model="address">
                    </customizeInput>
                </p>
            </div>
            <div>
                <p>
                    {{ $i18n.pushAddress['標籤'] }}
                </p>
                <p>
                    <customizeInput :setStyle="inputStyle">
                        <input type="text" :placeholder="$i18n.pushAddress['請輸入或粘貼標籤信息']" v-model="label">
                    </customizeInput>
                </p>
            </div>
            <div>
                <p>
                    {{ $i18n.pushAddress['備註'] }}
                </p>
                <p>
                    <customizeInput :setStyle="inputStyle">
                        <input type="text" :placeholder="$i18n.pushAddress['該備註信息只用於標籤']" v-model="remarks">
                    </customizeInput>
                </p>
            </div>
            <div>
                <p>
                    {{ $i18n.pushAddress['資金密碼'] }}
                </p>
                <p>
                    <customizeInput :setStyle="inputStyle">
                        <input type="password" :placeholder="$i18n.pushAddress['請輸入資金密碼']" v-model="pwd">
                    </customizeInput>
                </p>
            </div>
            <div>
                <p>
                    {{ $i18n.pushAddress['簡訊驗證碼'] }}
                </p>
                <p>
                    <customizeInput :setStyle="inputStyle">
                        <input type="text" :placeholder="$i18n.pushAddress['簡訊驗證碼']" v-model="verifyCode">
                        <span class="SenCodeBtn" @click="sendCode()">{{ timeAndTextOfSendcode }}</span>
                    </customizeInput>
                </p>
            </div>
            <div>
                <van-button type="info" @click.prevent="confirm()">{{ $i18n.pushAddress['確定'] }}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import customizeInput from '@/components/common/input.vue'

export default {
    name: 'pushAddress',
    props: ['id'],
    components: {
        customizeInput
    },
    data() {
        return {
            inputStyle: {
                marginBottom: '1rem'
            },
            address: '',
            label: '',
            remarks: '',
            pwd: '',
            verifyCode: '',
            timeAndTextOfSendcode: this.$i18n.pushAddress['發送驗證碼'], //提示發送驗證碼的時間/文字
            timer: '', // 計時器
        }
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            if (this.id === '0') return false //id 爲 0, 不請求
            let res = await $ajax('getAddressAtChange',{
                id: this.id,
                op: 'display'
            })
            if (!res) return false
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
        },
        
        // 掃碼
        scanCode () {
            window.apicloud && apicloud.scanner( (content) => {
                // alert(content)
                // this.address = content.split(':')[1].split('?')[0]
                this.address = content
            })
        },
        // 計時器
        timing () {
            this.timer = setInterval( () => {
                this.timeAndTextOfSendcode--
                if (this.timeAndTextOfSendcode <= 0) {
                    clearInterval(this.timer)
                    this.timeAndTextOfSendcode = this.$i18n.pushAddress['發送驗證碼']
                }
            }, 1000)
        },
        // 發送 驗證碼
        async sendCode () {
            if (this.timeAndTextOfSendcode !== this.$i18n.pushAddress['發送驗證碼']) return false
            let mobile = localStorage.getItem('mobile')
            let res = await $ajax('sendVerifycode',{
                mobile,
                temp: 'sms_forget'
            })
            if (!res) return false
            Toast(res.msg)
            this.timeAndTextOfSendcode = 60
            this.timing() //執行倒計時
        },
        async confirm () {
            if (!this.pwd) return Toast({
                message: this.$i18n.pushAddress['請輸入資金密碼']
            })
            if (!this.label) return Toast({
                message: this.$i18n.pushAddress['請填寫標籤']
            })
            if (!this.verifyCode) return Toast( this.$i18n.pushAddress['請輸入驗證碼'] )
            let res = await $ajax('changeAddress', {
                op: 'create',
                id: this.id !== '0' ? this.id : '',
                verifycode: this.verifyCode,
                paypwd: this.pwd,
                address: this.address,
                label: this.label,
                remarks: this.remarks
            })
            if (!res) return false
            Toast({
                message: res.msg
            })
            // 返回上一層
            this.$router.back(-1)
        },
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
.main {
    padding: 0 1rem;
    margin-top: calc(50px + 1rem);
    > div:last-child {
        margin-top: 1rem;
    }
    > div {
        text-align: center;
        button {
            width: 95%;
        }
        > p {
            .flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
            i {
                font-size: 2rem;
                color: #999;
            }
        }
    }
    .SenCodeBtn {
        color: #1989fa;
    }
}
</style>