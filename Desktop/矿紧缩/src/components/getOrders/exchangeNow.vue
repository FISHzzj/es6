<template>
    <div id="exchangeNow">
        <van-nav-bar
        :title="$i18n.exchangeNow['額度兌換']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <div>
                <p>
                    USDT{{ $i18n.exchangeNow['餘額'] }}
                </p>
                <p>
                    {{ $i18n.exchangeNow['兌換'] }}
                    <i class="iconfont iconjiantou"></i>
                </p>
                <p>
                    USD{{ $i18n.exchangeNow['額度'] }}
                </p>
            </div>
            <div>
                <customizeInput>
                    <input type="number" v-model="amount" :placeholder="$i18n.exchangeNow['請輸入兌換數量']">
                    <span class="blue" @click="exchangeAll()">{{ $i18n.exchangeNow['全部'] }}</span>
                </customizeInput>
                <p>
                    USDT{{ $i18n.exchangeNow['餘額'] }} {{ money }} USDT
                </p>
            </div>
            <div>
                <van-button type="info" @click="confirm()">{{ $i18n.exchangeNow['確定'] }}</van-button>
            </div>
            <div>
                {{ $i18n.exchangeNow['提示'] }}: {{ $i18n.exchangeNow['最低兌換數量爲'] }}{{min}}USDT, {{ $i18n.exchangeNow['最高兌換數量爲'] }}{{max}}USDT
            </div>
        </div>
    </div>
</template>

<script>
import customizeInput from '@/components/common/input'

export default {
    name: 'exchangeNow',
    components: {
        customizeInput
    },
    data() {
        return {
            amount: '',
            money: '',
            min: '',
            max: '',
            content: '',
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('exchangeNow', {})
            // console.log(res)
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
        },
        exchangeAll () {
            this.amount = this.money
        },
        async confirm () {
            // console.log('確定')
            if (!this.amount) return Toast( this.$i18n.exchangeNow['請填寫兌換數量'] )
            let res = await $ajax('exchangeSubmit', {
                gold: this.amount
            })
            if (!res) return false
            Toast(res.msg)
            this.$router.push({
                name: 'getOrders'
            })
        }
    }
}
</script>
<style lang="less" scoped>
#exchangeNow {
    background-color: #f4f4f4;
}
.flex {
    display: flex;
    display: -webkit-flex;
}
#main {
    margin-top: 50px;
    padding: 0 1rem;
    background-color: #fff;
    > div:first-child {
        .flex;
        justify-content: space-between;
        padding: 1rem 1rem;
        > p:nth-child(2) {
            font-size: 0.6rem;
            height: 2rem;
            width: 4rem;
            text-align: center;
            line-height: 1.5rem;
            text-align: center;
            position: relative;
            > .iconfont {
                color: #999;
                font-size: 3rem;
                width: 4rem;
                position: absolute;
                top: 40%;
                left: 1px;
                text-align: center;
            }
        }
    }
    > div:nth-child(2) {
        > p:nth-of-type(1) {
            margin-top: -1rem;
            color: #999;
        }
    }
    > div:nth-child(3) {
        width: 100%;
        button {
            width: 100%;
        }
    }
    > div:nth-child(4) {
        height: 10rem;
        color: #999;
        padding-top: 1rem;
    }
}
</style>