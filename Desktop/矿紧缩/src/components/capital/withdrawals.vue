<template>
    <div id="withdrawals">
        <van-nav-bar
        :title="$i18n.withdrawals['提幣']"
        left-arrow
        fixed
        :right-text="$i18n.withdrawals['提幣記錄']"
        @click-left="reback()"
        @click-right="$router.push({name:'withdrawalsList'})"
        />
        <div id="main">
            <van-field
                disabled
                :label="$i18n.withdrawals['賬戶餘額']"
                :placeholder="money">
                <span slot="button">USDT</span>
            </van-field>
            <router-link to="/cashAddress" tag="div">
                <p>
                    <span>{{ $i18n.withdrawals['提幣地址'] }}</span>
                    <span>
                        <i class="iconfont iconright"></i>
                    </span>
                </p>
                <p>
                    {{address}}
                </p>
            </router-link>
            <van-field
                type="number"
                v-model="amount"
                :label="$i18n.withdrawals['現金']"
                :placeholder="`${$i18n.withdrawals['最低提幣']}${min}${$i18n.withdrawals['個']}`">
                <span slot="button" class="blue" @click="getAll">
                    {{ $i18n.withdrawals['提取全部'] }}
                </span>
            </van-field>
            <!-- <van-field
                disabled
                :label="$i18n.withdrawals['手續費']"
                :placeholder="formalitiesTotal">
                <span slot="button">USDT</span>
            </van-field>
            <van-field
                disabled
                :placeholder="getAmount"
                :label="$i18n.withdrawals['到賬數量']">
                <span slot="button">USDT</span>
            </van-field> -->
            <van-field
                v-model="pwd"
                type="password"
                :label="$i18n.withdrawals['資金密碼']"
                :placeholder="$i18n.withdrawals['請輸入資金密碼']">
            </van-field>
            <van-field
                v-model="verifyCode"
                type="text"
                :label="$i18n.withdrawals['驗證碼']"
                :placeholder="$i18n.withdrawals['請輸入驗證碼']">
                <span slot="button" class="blue" @click="sendCode()">{{verifyTextAndTime}}</span>
            </van-field>
            <div>
                <h5>{{ $i18n.withdrawals['提現須知'] }}</h5>
                <p>
                    {{ $i18n.withdrawals['最小提幣數量爲'] }}<span class="gold">{{min}}</span>USDT
                </p>
                <p v-html="content" class="content_box">

                </p>
                <!-- <p>{{ $i18n.withdrawals['手續費從提幣金額中扣除'] }}, {{ $i18n.withdrawals['實際到賬數量爲扣除手續費的數量']}}</p>
                <p>
                    {{ $i18n.withdrawals['提幣受理時間'] }}<span class="gold">09:00:00 - 22:00:00</span>
                </p> -->
                <p>
                    <van-button  type="info" @click.prevent="sumbit()">
                        {{ $i18n.withdrawals['提交'] }}
                    </van-button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'withdrawals',
    props: ['addressId'],
    data() {
        return {
            amount: '',
            getAmount: 0, //到賬數量
            money: '',
            address: '',
            min: '',
            formalities: '',
            id: '',
            formalitiesTotal: 0,
            pwd: '',
            verifyCode: '',
            verifyTextAndTime: this.$i18n.withdrawals['發送驗證碼'],
            timer: '',
        }
    },
    watch: {
        amount (val) {
            // this.formalitiesTotal = this.formalities
            this.getAmount = this.amount - this.formalitiesTotal
            this.getAmount = this.getAmount < 0 ? 0 : this.getAmount
        }
    },
    created () {
        this.getData()
    },
    destroyed () {
        this.timer && clearInterval(this.timer)
    },
    methods: {
        async getData (){
            let res = await $ajax('withdrawals', {
                op: 'display',
                addressid: this.addressId ? this.addressId : ''
            })
            console.log(res)
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
            // fuck the change
            this.formalitiesTotal = this.formalities
        },
        // 計時器
        timing () {
            this.timer = setInterval( () => {
                this.verifyTextAndTime--
                if (this.verifyTextAndTime === 0) {
                    this.verifyTextAndTime = this.$i18n.withdrawals['發送驗證碼']
                    clearInterval(this.timer)
                }
            }, 1000)
        },
        // 發送驗證碼
        async sendCode () {
            if ( this.verifyTextAndTime !== this.$i18n.withdrawals['發送驗證碼'] ) return false
            let mobile = localStorage.getItem('mobile')
            let res = await $ajax('sendVerifycode',{
                mobile,
                temp: 'sms_forget'
            })
            if (!res) return false
            Toast(res.msg)
            this.verifyTextAndTime = 60
            this.timing()
        },
        // 返回資金頁
        reback () {
            this.$router.replace({
                name: 'capital',
            })
        },
        // 提取全部
        getAll () {
            this.amount = this.money
        },
        async sumbit () {
            let { withdrawals } = this.$i18n
            if (!this.address) return Toast({message: withdrawals['請填寫提幣地址'] })
            if (!this.pwd) return Toast({message: withdrawals['請填寫資金密碼'] })
            if (!this.amount) return Toast({message: withdrawals['請填寫到賬數量'] })
            if (!this.verifyCode) return Toast({message: withdrawals['請填寫驗證碼']})
            // toWithdrawals
            let res = await $ajax('toWithdrawals', {
                op: 'center',
                paypwd: this.pwd,
                addressid: this.id || '',
                withdrawal_gold: this.amount,
                verifycode: this.verifyCode
            })
            if (!res) return false
            this.money = this.money - this.amount //重新計算
            Toast({
                message: res.msg
            })
            this.reback()
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#withdrawals {
    background-color: #f4f4f4;
    p {
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.gold {
    color: #f39d0e;
}

#main {
    margin-top: calc(50px + 0.5rem);
    > div {
        padding: 10px 1rem;
        background-color: white;
        margin-top: 10px;
    }
    > div:first-child, > div:nth-child(4) {
        ::-webkit-input-placeholder {
            color: red;
        }
    }
    > div:nth-child(2) {
        > p:nth-child(1) {
            .flex;
            margin-bottom: 1.8rem;
            justify-content: space-between;
            .iconfont {
                color: #ccc;
                font-size: 1.5rem;
            }
        }
    }
    > div:last-child {
        background-color: #f4f4f4;
        margin: 0;
        padding-top: 0;
        > h5 {
            font-weight: 400;
            margin: 1rem 0;
        }
        > p {
            color: #ccc;
            font-size: 0.8rem;
            line-height: 1.3rem;
        }
        > p:last-child {
            text-align: center;
            margin-top: 3rem;
            button {
                width: 90%;
            }
        }
    }

}

</style>