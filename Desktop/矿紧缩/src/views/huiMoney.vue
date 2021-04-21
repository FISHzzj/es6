<template>
    <div class="orderSubmit">
        <div class="header">
            <van-icon @click="leave" name="arrow-left" color="#000" size="20" />
            <p>汇款详情</p>
            <span @click="cancle">取消订单</span>
        </div>
        <div style="height:12vw"></div>
        <div class="top">
            <div class="time">请在30分钟内完成转账</div>
            <div class="tips">建议使用本人名下的银行卡进行转账</div>
        </div>
        <div class="order_info flex ali_center">
            <div class="left">
                <div class="type">订单总金额</div>
                <div class="num">￥{{money}}</div>
            </div>
            <div class="right">
                <div class="flex item1 flex_between ali_center">
                    <span>单价</span>
                    <p>{{rate}}CNY</p>
                </div>
                <div class="flex flex_between ali_center">
                    <span>数量</span>
                    <p>{{num}}CNY</p>
                </div>
            </div>
        </div>
        <div class="otherInfo">
            <div class="title flex ali_center">
                <img src="@/assets/images/icon/jyjl.png" alt="" />
                <span>对公账户</span>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">收款方户名</div>
                <div class="right flex ali_center">
                    <span class="infos">{{realname}}</span>
                    <span class="copy" :data-clipboard-text="realname">复制</span>
                </div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">收款方账户</div>
                <div class="right flex ali_center">
                    <span class="infos">{{bankcard}}</span>
                    <span class="copy" :data-clipboard-text="bankcard">复制</span>
                </div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">收款方银行</div>
                <div class="right flex ali_center">
                    <span class="infos">{{bankname}}</span>
                    <span class="copy" :data-clipboard-text="bankname">复制</span>
                </div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">订单号</div>
                <div class="right flex ali_center">
                    <span class="infos">{{ordersn}}</span>
                    <span class="copy" :data-clipboard-text="ordersn">复制</span>
                </div>
            </div>
        </div>
        <div class="mineInfo">
            <div class="num flex flex_between ali_center">
                <div class="title">转款卡主姓名</div>
                <input v-model="zhuanname" type="text" placeholder="请输入卡主姓名" />
            </div>
            <div  class="img flex flex_between ali_center">
                <div class="title">完成转账截图</div>
                <van-uploader :after-read="afterRead" v-if="!baseimg" />
                <img :src="baseimg" alt="" v-if="baseimg" >
            </div>
        </div>
        <div class="tip">
            <div class="title">温馨提示:</div>
            <div class="red">1.请在转账时备注矿金所张虎手机号码(请勿备注含矿机、数字货币、比特比、以太坊或者英文BTC、ETH等自言),如有敏感字眼的备注将不做充值处理，七天后所转账的金额安原路返还</div>
            <div class="grey">2.如有任何疑问请联系矿金所官方客服(请在工作日9：00-18：00之间完成充值)</div>
            <div class="grey">3.仅支持储蓄卡充值</div>
        </div>
        <div class="submit" :class="{on: money}" @click="submit">我已付款成功</div>
    </div>
</template>
<script>
import {copy} from '../func/copy'
export default {
    name: "huiMoney",
    data() {
        return {
            realname: "",
            ordersn: "",
            rate: "",
            createtime: "",
            walletInfo: "",
            realname: "",
            bankcard: "",
            bankname: "",
            num: "",
            zhuanname: "",
            money: "",
            baseimg: "",
            accountType: "cny",
            id:""


        };
    },
    mounted() {
        this.clipboard = copy('.copy');
        this.getData()
    },
    methods: {
        async getData() {
            this.num =  this.$route.query.num
            this.money = this.$route.query.money
            this.id = this.$route.query.id
            if(this.id){
                let res = await $ajax('rechargegetCre', {lid: this.id})
                if(!res) return false
                // this.money = res.money
                let log = res.log
                let sysWallet = res.sysWallet
                var newobj = Object.assign({}, log, sysWallet)
                console.log(newobj)
                Object.keys(newobj).forEach((key) => {
                    this[key] = newobj[key]
                })
            }else {
                let res = await $ajax('rechargegetCre', {money: this.num})
                if(!res) return false
                // this.money = res.money
                let log = res.log
                let sysWallet = res.sysWallet
                var newobj = Object.assign({}, log, sysWallet)
                console.log(newobj)
                Object.keys(newobj).forEach((key) => {
                    this[key] = newobj[key]
                })
            }
            
        },
        async afterRead(s) {
            console.log(s);
            let img = s.content
            let res = await $ajax('userrechargeimages', {image: img})
            if(!res) return false
            console.log(res)
            this.baseimg = res.img

        },
        cancle() {
            let that = this;
            function beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                    // that.$router.go(-1)
                    that.dontPay()
                } else {
                    done();
                }
            }
            Dialog.confirm({
                title: '是否取消订单？',
                message: '是否确认取消订单,订单取消后将无法付款,如对订单有疑问请及时咨询客服。',
                confirmButtonText: "确定取消",
                confirmButtonColor: "#3177f0",
                cancelButtonText: "我再看看",
                beforeClose,
            });
        },
        leave() {
            let that = this
            function beforeClose(action, done) {
                console.log(action);
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                   
                    that.$router.go(-1)
                } else {
                    done();
                }
            }
            Dialog.confirm({
                title: '离开支付',
                message: '如您未付款,30分钟内可在充值明细中重新付款,如恁已付款,请您务必点击“我已付款成功”',
                confirmButtonText: "确定离开",
                cancelButtonText: "我再看看",
                beforeClose,
            });
        },
        async dontPay(){
            let res = await $ajax('userrechargedontPay', {
                lid: this.id,
            })
            if(!res) return false
            console.log(res)
            Toast(res.msg)
            this.$router.go(-1)
        },
        async submit() {
            if(!this.zhuanname) return Toast("请输入卡主姓名!")
            if(!this.baseimg) return Toast("请上传转账截图!")
            let res = await $ajax('userrechargepays', {
                getType: 1,
                image: this.baseimg,
                money: this.money,
                realname: this.zhuanname,
                accountType: '1',
                lid: this.id,
            })
            if(!res) return false
            console.log(res)
            Toast(res.msg)
             this.dontPay()
            // this.$router.go(-1)
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.orderSubmit {
    padding: 0 4vw;
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 100;
        color: #000;
        background: #fff;
        .van-icon {
            position: absolute;
            top: 0;
            left: 3vw;
            bottom: 0;
            height: 4vw;
            margin: auto 0;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
        span {
            position: absolute;
            top: 0;
            bottom: 0;
            line-height: 12vw;
            right: 4vw;
            margin: auto 0;
            font-size: 3.2vw;
            color: #999;
        }
    }
    .top {
        .time {
            color: #333;
            font-weight: 600;
            font-size: 6vw;
            line-height: 12vw;
        }
        .tips {
            margin-top: -4vw;
            line-height: 12vw;
            color: #da428d;
            font-size: 3.2vw;
        }
    }
    .order_info {
        width: 92vw;
        border-radius: 2vw 2vw 0 0;
        background: rgba(0,0,255,0.05);
        padding: 6vw 3vw;
        .left {
            width: 60%;
            .type {
                font-size: 3.2vw;
            }
            .num {
                font-size: 7.5vw;
                font-weight: 600;
            }
        }
        .right {
            width: 40%;
            font-size: 3.2vw;
            .item1 {
                margin-bottom: 2vw;
            }
            span {
                color: #666;
            }
            p {
                color: #333;
            }
        }
    }
    .otherInfo {
        background: #fff;
        border-radius: 0 0 2vw 2vw;
        padding: 0 4vw;
        .title {
            height:12vw;
            img {
                width: 5.33vw;
                height: 5.33vw;
                margin-right: 2.4vw;

            }
        }
        .item {
            min-height: 12vw;
            .left {
                color: #999;
                font-size: 3.47vw;
            }
            .right {
                font-size: 3.2vw;
                .infos {
                    max-width: 40vw;
                    color: #333;
                    font-weight: 600;
                }
                .copy {
                    margin-left: 3vw;
                    color: #da428d;
                }
            }
        }
    }
    .mineInfo {
        background: #fff;
        width: 92vw;
        margin: 4vw 0;
        padding: 0 4vw;
        .num {
            .title {
                font-size: 3.73vw;
                font-weight: 600;
                height: 12vw;
                line-height: 12vw;
            }
            input {
                text-align: right;
            }
        }
        .img{
            position: relative;
            img{
                width: 80px;
                height: 80px;
            }
        }
    }
    .tip {
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
        margin: 6vw 0 3vw;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        color: #fff;
        background: #ccc;
        border-radius: 1vw;
        &.on {
            background: #da428d;
        }
    }
}
</style>