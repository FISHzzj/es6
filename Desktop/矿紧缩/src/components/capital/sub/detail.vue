<template>
    <div id="detail">
        <van-nav-bar
        :title="`${staticText}${$i18n.detail['詳情']}`"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <p>
                <span>
                    <i :class="['iconfont', 
                        status === 0? ['iconweibiaoti-', 'gray'] : ['iconweibiaoti-', 'green']]">
                    </i>
                </span>
                <span :class="status === 0 ? 'gray' : 'green'">
                    {{ status === 1 ? `${staticText}${$i18n.detail['成功']}` : `${$i18n.detail['審核中']}` }}
                </span>
            </p>
            <p>
                <span>{{ $i18n.detail['發送地址'] }}</span>
                <span>{{ address }}</span>
            </p>
            <p>
                <span>{{ type === '1' ? 'TXID' : $i18n.detail['訂單'] }}</span>
                <span>{{ type === '1' ? txid : ordersn }}</span>
            </p>
            <p>
                <span>{{ $i18n.detail['充值數量'] }}</span>
                <span class="deepGreen">{{ amount }}USDT</span>
            </p>
            <p>
                <span>{{ $i18n.detail['實到數量'] }}</span>
                <span class="deepGreen">{{ realAmount }}USDT</span>
            </p>
            <p>
                <span>{{  $i18n.detail['提交時間'] }}</span>
                <span>{{ time }}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detail',
    props: ['id', 'type'],
    data() {
        return {
            staticText: '',
            apiName: '',
            // 後端數據
            time: '',
            amount: '',
            realAmount: '',
            txid: '',
            ordersn: '',
            address: '',
            status: '',
        }
    },
    methods: {
        //獲取數據
        async getData () {
            let res = await $ajax(this.apiName, {
                id: this.id
            })
            // console.log(res)
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
        },
        // 設置 今天 文本
        setText () {
            let { detail } = this.$i18n
            this.staticText = this.type === '1' ? detail['充幣'] : detail['提幣']
            this.apiName = this.type === '1' ? 'rechargeDetail' : 'withdrawalsDetail'
        },
    },
    created () {
        this.setText()
        this.getData()
    }
}
</script>
<style lang="less" scoped>
#detail {
    background-color: #f4f4f4;
}
.flex {
    display: flex;
    display: -webkit-flex;
}
#main {
    background-color: #fff;
    box-sizing: border-box;
    margin: 1rem;
    margin-top: calc(50px + 2rem);
    border-radius: 10px;
    padding: 1rem;
    padding-top: 3.5rem;
    position: relative;
    > p {
        .flex;
        justify-content: space-between;
        > span:first-child {
            width: 5rem;
            color: #999;
        }
        > span:nth-child(2) {
            width: calc(100% - 5rem);
            text-align: right;
            word-break: break-all;
            word-wrap: break-word;
        }
    }
    > p:first-child {
        .flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -35px;
        left: 25%;
        width: 50%;
        > span:first-child {
            margin-bottom: 5px;
            i {
                font-size: 2.5rem;
            }
        }
        > span {
            text-align: center;
            width: 100%;
        }
    }
    > p:last-child {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 1rem 0;
    }
}
</style>