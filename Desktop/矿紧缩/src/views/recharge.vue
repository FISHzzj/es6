<template>
    <div class="recharge">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>充值</p>
            <span @click="gopage('/record/recharge')">充值记录</span>
        </div>
        <div class="nav flex ali_center flex_between">
            <div class="item on">
                CNY充值
            </div>
            <div class="item" @click="gopage('/exchange/USDT/转入')">
                USDT转入
            </div>
        </div>
        <div class="money">
            <div class="type">账户余额(CNY)</div>
            <div class="num">{{money}}</div>
        </div>
        <div class="buy_num">
            <div class="title">购买数量</div>
            <div class="input flex ali_center flex_between">
                <input type="number" v-model="num" placeholder="请输入您的充值金额，限整数" style="width: 75%;"/>
                <span>CNY数量</span>
            </div>
            <div class="tips flex ali_center flex_between">
                <span>CNY实时单价≈1元/CNY</span>
                <span v-if="num">实付{{paynum}}元</span>
            </div>
        </div>
        <div class="pay_ways">
            <div class="title">支付方式</div>
            <div class="item flex ali_center flex_between" @click="change('bank')">
                <div class="flex ali_center">
                    <img src="@/assets/images/icon/zz.png" class="icon" alt="" />
                    <span>银行卡</span>
                    <p>(安全可靠不限额，推荐)</p>
                </div>
                <img v-if="paytype == 'bank'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div>
            <!-- <div class="item flex ali_center flex_between" @click="change('wechat')">
                <div class="flex ali_center">
                    <img src="@/assets/images/icon/wx.png" class="icon" alt="" />
                    <span>微信支付</span>
                </div>
                <img v-if="paytype == 'wechat'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div> -->
        </div>
        <div class="tip">
            <div class="title">温馨提示:</div>
            <div class="red">1.请在转账时备注哈希矿场张虎手机号码(请勿备注含矿机、数字货币、比特比、以太坊或者英文BTC、ETH等自言),如有敏感字眼的备注将不做充值处理，七天后所转账的金额安原路返还</div>
            <div class="grey">2.如有任何疑问请联系哈希矿场官方客服(请在工作日9：00-18：00之间完成充值)</div>
            <div class="grey">3.仅支持储蓄卡充值</div>
        </div>
        <div class="submit" @click="recharge">立即充值</div>
    </div>
</template>
<script>
export default {
    name: "recharge",
    data() {
        return {
            // paynum: 0,
            num: "",
            paytype: "bank",
            money: "",
        }
    },
    computed:{
        paynum(){
            return this.num * 1
        }
    },
    mounted(){
        this.getData()
        // this.quxiao()
    },
    methods: {
        async quxiao(){
            let res = await $ajax('userrechargedontPay', {lid: 4}) 
        },
        async getData() {
            let res = await $ajax('userrecharge', {rechargeType: "cny", getType: "1"})  //充值
            if(!res) return false
            this.money = res.money
        },
        gopage(url) {
            this.$router.push(url);
        },
        change(type) {
            if (type == "wechat") return Toast("暂不支持微信充值");
            this.paytype = type;
        },
        async recharge() {
            let num = this.num
            // let paynum = this.paynum
            if(!num) return Toast('请输入您的充值数量，限整数!')
            let res = await $ajax('userrechargelogCheck', {})  //充值
            if(!res) return false
            console.log(res)
            this.$router.push({
                name: "huiMoney",
                query: {
                    // money: paynum,
                    num : num,
                    money : this.paynum
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.recharge {
    .header {
        width: 100%;
        height: 12vw;
        position: relative;
        background: #fff;
        .van-icon {
            position: absolute;
            top: 0;
            left: 3vw;
            bottom: 0;
            height: 4vw;
            margin: auto 0;
        }
        span {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 4vw;
            font-size: 3.47vw;
            margin: auto 0;
            color: #999;
            line-height: 12vw;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .nav {
        width: 92vw;
        background: #eee;
        margin: 4vw;
        height: 12vw;
        padding: 0 2VW;
        .item {
            width: 42VW;
            height: 8VW;
            line-height: 8vw;
            color: #999;
            text-align: center;
            border-radius: 1vw;
            &.on {
                background: #fff;
                color: #333;
            }
        }
    }
    .money {
        width: 92vw;
        border-radius: 2vw;
        margin: 5vw 4vw;
        text-align: center;
        height: 30vw;
        background: #f7f7f7;
        .type {
            line-height: 15vw;
            font-size: 3.47vw;
            color: #666;
        }
        .num {
            margin-top: -5vw;
            font-weight: 600;
            font-size: 10vw;
        }
    }
    .buy_num {
        padding: 0 4vw;
        .title {
            line-height: 12vw;
            font-size: 3.73vw;
            font-weight: 600;
        }
        .input {
            border-bottom: 1px solid #f7f7f7;
            height: 12vw;
        }
        .tips {
            color: #da428d;
            font-size: 3.2vw;
            line-height: 10vw;
        }
    }
    .pay_ways {
        width: 100vw;
        padding: 2vw 4vw;
        background: #fff;
        margin-bottom: 10vw;
        border-radius: 2vw;
        .title {
            line-height: 10vw;
        }
        .item {
            height: 12vw;
            >img {
                width: 5vw;
            }
            >div {
                p {
                    color: #999;
                    font-size: 3.2vw;
                    line-height: 4vw;
                    margin-left: 1vw;
                }
                img {
                    width: 4vw;
                    height: 4vw;
                    margin-right: 2vw;
                }
            }
        }
    }
    .tip {
        padding: 0 4vw;
        color: #999;
        .title {
            font-size: 3.47vw;
        }
        .red {
            color: #fc4142;
        }
        .red,
        .grey {
            font-size: 3.2vw;
        }
    }
    .submit {
        width: 92vw;
        margin: 6vw 4vw 3vw;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        color: #fff;
        background: #da428d;
        border-radius: 1vw;
    }
}
</style>