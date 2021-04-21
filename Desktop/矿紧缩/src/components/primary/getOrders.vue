<template>
    <div id="getOrders">
        <van-nav-bar
        :title="$i18n.getOrders['接單']"
        fixed
        :border="false"
        :right-text="$i18n.getOrders['接單記錄']"
        @click-left="$router.back(-1)"
        @click-right="$router.push({name:'getOrdersList'})"
        />
        <div id="main">
            <div :class="[`${orderSn ? 'getOrdersIng' : 'noStart'}`]">
                <p>
                    <span>
                        USDT{{ $i18n.getOrders['餘額'] }}
                        <i class="iconfont iconico"></i>
                    </span>
                    <span>
                        USD{{ $i18n.getOrders['可用餘額'] }}
                    </span>
                </p>
                <p>
                    <span>{{money}}</span>
                    <span>{{usdMoney}}</span>
                </p>
                <p>
                    <span
                    :class="[`${!exchanged ? 'fontWhite' : ''}`]"
                    @click="toExchang()">
                        {{ $i18n.getOrders['立即兌換'] }}
                    </span>
                    <span :class="[`${usdMoney ? 'fontWhite' : ''}`]"
                    @click="startOrder()">
                        {{ $i18n.getOrders['開始接單'] }}
                    </span>
                </p>
                <!-- <p class="more" v-show="show">
                    <span>{{ $i18n.getOrders['本輪編號'] }} : </span>
                    <span>{{orderSn}}</span>
                </p>
                <p class="more" v-show="show">
                    <span>{{ $i18n.getOrders['餘額額度'] }} : </span>
                    <span>{{usdMoney}}USDT</span>
                </p>
                <p class="more borderBottom" v-show="show">
                    <span>{{ $i18n.getOrders['狀態'] }} : </span>
                    <span>{{ $i18n.getOrders['接單中'] }}</span>
                </p> -->
                <div ref="list" v-show="show">
                    <div class="order" v-for="(item, index) in list" :key="index">
                        <div>
                            <p>
                                <span>{{ $i18n.getOrders['時間'] }} : </span>
                                <span>{{item.time}}</span>
                            </p>
                            <p>
                                <span>{{ $i18n.getOrders['原始額度'] }} : </span>
                                <span>{{item.startMoney}}</span>
                            </p>
                            <p>
                                <span>{{ $i18n.getOrders['傭金'] }} : </span>
                                <span>{{item.commission}}</span>
                            </p>
                            <p>
                                <span>{{ $i18n.getOrders['本次返還額度'] }} : </span>
                                <span>{{item.rebackMoneyCurrent}}</span>
                            </p>
                        </div>
                        <div>
                            <img src="@/assets/images/orderStatus/wancheng.png">
                        </div>
                    </div>
                </div>
                <p @click="showMore()" :class="[ !exchanged ? 'shallow' : '']">
                    <i :class="['iconfont',show ? 'iconshouqi' : 'iconzhankai-copy']"></i>
                    {{ $i18n.getOrders['查看更多'] }}
                </p>
            </div>
            <div>动态会员</div>
            <marquee direction="up" width="100%" height="210" behavior="scroll" bgcolor="#f5f5f5" >
                <div ref="list" class="action">
                    <div class="order aclist" v-for="(item, index) in rcloglist" :key="index">
                        <div>
                            <p>
                                <!-- <span>用户名 : </span> -->
                                <span>{{item.mobile}}</span>
                            </p>
                            <p style="width:110px;margin-left:10px">
                                <!-- <span>获得返佣: </span> -->
                                <span><b style="color:#1640EA;">获得返佣：</b> {{item.price}}元</span>
                            </p>
                            <p>
                                <!-- <span>时间: </span> -->
                                <span>{{item.createtime}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </marquee>

        </div>
    </div>
</template>

<script>
export default {
    name: 'getOrders',
    data () {
        return {
            show: false,
            list: [],
            money: '',
            usdMoney: '',
            orderSn: '',
            exchanged: false, //判断是否兑换过了, 默认为没
            rcloglist: [],
        }
    },
    mounted () {
        this.getData()
        this.getclog()
    },
    methods: {
        async getData () {
            let res = await $ajax('getOrders', {})
            if (!res) return false
            Object.keys(res).forEach( key => {
                this[key] = res[key]
                // 如果 訂單號 存在, 則說明開始跑單了
                if (key === 'orderSn' && res['orderSn']) {
                    this.exchanged = true
                }
            })
        },
        async getclog () {
            let res = await $ajax('sdrclog', {})
            if (!res) return false
            Object.keys(res).forEach( key => {
                this[key] = res[key]

            })
        },
        // 展示更多
        async showMore () {
            if (!this.exchanged) return false
            let res = await $ajax('getPointsList', {})
            if (!res) return false
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
            this.show = !this.show

        },
        // 立即兑换
        toExchang () {
            if (this.exchanged) return false
            this.$router.push({
                name: 'exchangeNow'
            })
        },
        // 开始接单
        async startOrder () {
            if (!this.usdMoney) return false
            let res = await $ajax('startGetOrders', {})
            if (!res) return false
            Toast(res.msg)
            this.getData() //重新獲取數據
        },
    },
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
.fontWhite {
    color: white;
}
#main {
    margin-top: calc(50px + 0.5rem);
    padding: 0 1rem;
    // padding-bottom: 50px;
    > div:first-child {
        border-radius: 5px;
        background-image: url(../../assets/images/getOrdersHeader.png);
        background-size: 100% 100%;
        box-sizing: border-box;
        box-shadow: 1px 5px 12px rgba(0, 0, 0, 0.4);
        color: #cccccc;
        padding: 1rem;
        position: relative;
        > p {
            .flex;
            justify-content: space-between;
            align-items: center;
        }
        > p:first-child {
            margin-top: 0.5rem;
        }
        > p:nth-child(2) {
            color: #ffffff;
            font-size: 1.8rem;
            margin-top: 0;
            > span {
                text-align: right;
            }
        }
        > p:nth-child(3) {
            border-bottom: 1px solid rgba(204, 204, 204, 0.5);
            padding-bottom: 1rem;
            justify-content: space-around;
        }
        > p:last-child {
            justify-content: center;
            color: white;
            line-height: 1rem;
            margin-bottom: 0;
        }
        .more {
            justify-content: flex-start;
            font-size: 0.8rem;
            > span:first-child {
                margin-right: 5px;
            }
        }
        .borderBottom {
            border-bottom: 1px solid rgba(204, 204, 204, 0.5);
            padding-bottom: 1rem;
        }
    }
    > div:nth-child(2){
        margin-top: 1.5rem;
        color: #2D50ED;
    }
    > div:nth-child(3) {
        height: 50vh;
        margin-top: 1.5rem;
        overflow-y: scroll;
    }
}
.order {
    p {
        margin: 0;
    }
    .flex;
    justify-content: space-between;
    align-items: center;
    background-image: url(../../assets/images/ordersBg.png);
    background-size: 100% 100%;
    color: white;
    padding: 1rem;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 1rem;
    img {
        height: 4rem;
        width: 4rem;
    }
}
marquee{
    margin-top: 30px;
}
.action{
    height: 43vh!important;
    border:1px solid #eee;
    margin-top: 10px;
}
.aclist{
    font-size: 10px;
    margin-bottom: 0;
    background: #fff;
    border-radius: 0;
    color:#000;
    >div {
        .flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 100%;

    }
    p {
        .flex;

    }


}
.completed::after {
    content: '';
    position: absolute;
    left: calc(50% - 1rem);
    top: 20px;
    height: 5rem;
    width: 5rem;
    background-image: url(../../assets/images/orderStatus/wancheng.png);
    background-size: 100% 100%;
}
.noStart::after {
    content: '';
    position: absolute;
    left: calc(50% - 1rem);
    top: 20px;
    height: 5rem;
    width: 5rem;
    background-image: url(../../assets/images/orderStatus/noStart.png);
    background-size: 100% 100%;
}
.getOrdersIng::after {
    content: '';
    position: absolute;
    left: calc(50% - 1rem);
    top: 20px;
    height: 5rem;
    width: 5rem;
    background-image: url(../../assets/images/orderStatus/jiedanIng.png);
    background-size: 100% 100%;
}
</style>