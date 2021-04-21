<template>
    <div id="transfer">
        <van-nav-bar
        :title="$i18n.transfer['轉賬']"
        left-arrow
        fixed
        :right-text="$i18n.transfer['轉賬記錄']"
        @click-left="$router.back(-1)"
        @click-right="$router.push({name:'transferList'})"
        />
        <div id="main">
            <div>
                <p>USDT{{ $i18n.transfer['餘額'] }}</p>
                <p>{{money}} USDT</p>
            </div>
            <div>
                <p>{{ $i18n.transfer['收款賬號'] }}</p>
                <p>
                    <input v-model="id" type="text" :placeholder="$i18n.transfer['請輸入接收方的用戶ID']">
                </p>
            </div>
            <div>
                <p>
                    <span>{{ $i18n.transfer['轉賬數量'] }}</span>
                    <span>USDT</span>
                </p>
                <P>
                    <input v-model="amount" type="number" :placeholder="$i18n.transfer['請輸入轉出數量']">
                </P>
            </div>
            <div>
                <p>{{ $i18n.transfer['資金密碼'] }}</p>
                <form>
                    <input v-model="pwd" autocomplete="tel" type="password" :placeholder="$i18n.transfer['請輸入資金密碼']">
                </form>
            </div>
            <div id="tips">
                {{ $i18n.transfer['最低轉賬'] }} <span>{{min}}</span>
                 <!-- {{ $i18n.transfer['需手續費'] }} <span>{{service}}</span> -->
            </div>
            <div>
                <van-button type="info" @click="confirm()">
                    {{ $i18n.transfer['確認'] }}
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'transfer',
    data() {
        return {
            id: '',
            amount: '',
            pwd: '',
            money: sessionStorage.getItem('money'),
            min: '',
            service: ''
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('transferPage')
            if (!res) return false
            // console.log(res)
            let { min, service } = res
            this.min = min
            this.service = service
        },
        // 確認提交
        async confirm () {
            let { transfer } = this.$i18n
            // console.log('確認提交')
            let {id, pwd, amount} = this
            if (!id) return Toast( transfer['請輸入接收方的用戶ID'] )
            if (!amount) return Toast( transfer['請輸入轉出數量'] )
            if (!pwd) return Toast( transfer['請輸入資金密碼'] )
            let res = await $ajax('toTransfer', {
                ruid: id,
                gold: amount,
                paypwd: pwd
            })
            if (!res) return false
            Toast(res.msg)
            this.$router.back(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#transfer {
    background-color: #f4f4f4;
    p {
        margin: 0;
    }
}
#main {
    font-size: 0.9rem;
    margin-top: calc(50px + 0.5rem);
    > div {
        background-color: #fff;
        margin-top: 10px;
        box-sizing: border-box;
        padding: 1rem 1rem;
        > p:first-child {
            margin-bottom: 10px;
        }
        > p:last-child {
            color: #999;
            font-size: 0.8rem;
        }
        ::-webkit-input-placeholder {
            color: #999;
        }
    }
    #tips {
        background-color: #f4f4f4!important;
        padding-top: 0;
        margin-bottom: -1rem;
        > span {
            color: red;
        }
    }
    > div:first-child {
        .flex;
        align-items: center;
        justify-content: space-between;
        > p {
            margin: 0;
        }
    }
    > div:nth-child(3) {
        p:first-child {
            .flex;
            justify-content: space-between;
            span:last-child {
                color: #999;
                font-size: 0.8rem;
            }
        }
    }
    > div:last-child {
        background-color: #f4f4f4;
        text-align: center;
        button {
            width: 95%;
        }
    }
    input {
        width: 100%;
        outline: transparent;
        border: transparent;
    }
}
</style>