<template>
    <div class="orderSubmit">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" color="#fff" size="20" />
            <p>兑换</p>
        </div>
        <div class="top_1"></div>
        <div class="top">
            <div class="header_top flex ali_center flex_between">
                <div class="first" @click="showmask = true">
                    <div class="type">兑换币</div>
                    <div class="name flex ali_center">
                        <img src="@/assets/images/icon/4.png" alt="">
                        <span>{{type}}</span>
                        <van-icon name="arrow-down" />
                    </div>
                </div>
                <div class="second">
                    <div class="type">换取币</div>
                    <div class="name flex ali_center">
                        <img src="@/assets/images/icon/5.png" alt="">
                        <span>USDT</span>
                    </div>
                </div>
            </div>
            <div class="changeicon">
                <van-icon name="exchange"></van-icon>
            </div>
            <div class="changenum flex flex_between">
                <input type="num" placeholder="兑换数量"  v-model="duihuannum">
                <div>{{receivenum}}</div>
            </div>
            <div class="tips flex ali_center flex_between">
                <div class="left" v-if="num < duihuannum">
                    {{type}}余额不足，<span @click="gorecharge(type)">请转入</span>
                </div>
                <div class="right">可用余额：{{num}} {{type}}</div>
            </div>
            <!-- <div class="time_num flex flex_between">
                <div class="left">
                    <div>{{type}}/USDT 1{{type}}≈0.00USDT</div>
                    <div class="">手续费：0.03%</div>
                </div>
                <div class="right">{{second}}s</div>
            </div> -->
        </div>
        <div class="tip">
            <div class="title">温馨提示：</div>
            <div class="grey">1.受汇率影响货币价格是是波动，请以最终兑换成功数量为准;</div>
            <div class="grey">1.请确认兑换货币币种，一经兑换成功不可撤回;</div>
            <div class="grey">1.ETH最低起兑换数量：0.1ETH;</div>
            <div class="grey">1.、兑换由第三方大宗商家承兑;</div>
        </div>
        <div class="submit" @click="openPwd">确定兑换</div>
        <!-- <div @click="showService = true" class="flex service ali_center">
            <van-icon color="#666" name="service-o" />
            <span>联系客服</span>
        </div> -->
        <div class="mask" v-if="showmask" @click="showmask = false"></div>
        <div class="change_mask" v-if="showmask">
            <div class="title flex ali_center flex_between">
                <span>选择币种</span>
                <van-icon name="cross" @click="showmask = false"></van-icon>
            </div>
            <div class="item flex ali_center" @click="change('BTC')">
                <img src="@/assets/images/icon/jyjl.png" alt="">
                <div class="info">
                    <div class="num">BTC</div>
                    <div class="type">余额：{{btc}}BTC</div>
                </div>
            </div>
            <div class="item flex ali_center" @click="change('ETH')">
                <img src="@/assets/images/icon/jyjl.png" alt="">
                <div class="info">
                    <div class="num">ETH</div>
                    <div class="type">余额：{{eth}}ETH</div>
                </div>
            </div>
            <div class="item flex ali_center" @click="change('FIL')">
                <img src="@/assets/images/icon/jyjl.png" alt="">
                <div class="info">
                    <div class="num">FIL</div>
                    <div class="type">余额：{{fil}}FIL</div>
                </div>
            </div>
        </div>
        <service
            :showService="showService"
            @close="closeservice"
        ></service>
        <pay-pwd
            :show="showPwd"
            @close="closePwd"
            @noticehandle="noticePwd"
        ></pay-pwd>
    </div>
</template>
<script>
import service from "./common/service";
import payPwd from "./common/paypwd";
export default {
    name: "changeType",
    components: {
        service,
        payPwd
    },
    data() {
        return {
            showService: false,
            second: 30,
            // receivenum: '收入数量',
            type: '',
            num: '',
            showmask: false,
            timer: null,
            duihuannum: "",
            // type: 0, // 1 充值2提现3兑换
            usdt: "",
            cny: "",
            btc: "",
            eth: "",
            fil: "",
            rates: "",
            showPwd: false,
        };
    },
    created() {
        this.type = this.$route.params.type;
        this.num = this.$route.params.num;
        this.getData()
    },
    mounted() {
        this.daojishi();  
        // this.getData();      
    },
    
    destroyed() {
        window.clearInterval(this.timer);
    },
    computed:{
        receivenum(){
            let accountTan = this.type
            this.currenhulv(accountTan, 'USDT')
            let feeTan = this.duihuannum
            let jieguo = (feeTan * this.rates).toFixed(4) 
            return   jieguo == 0 ? '输入数量' : jieguo
        }
    },
    methods: {
        closePwd(e) {
            this.showPwd = false;
        },
        openPwd(e) {
            this.showPwd = true;
        },
        closeservice(e) {
            this.showService = false;
        },
        async getData(){
            let res = await $ajax('userInfowallet', {requstType: "wallet"})
            if(!res) return false
            console.log(res)
            Object.keys(res).forEach((key)=>{
                this[key] = res[key]
                
            })
            // this.currenhulv("USDT", 'CNY')
            // this.currenhulv("BTC", 'CNY')
            // this.currenhulv("ETH", 'CNY')
            // this.currenhulv("FIL", 'CNY')
        },
        async noticePwd(){
            let accountTan = this.type
            let feeTan = this.duihuannum
            if(!feeTan) return Toast('请输入数量')
            this.currenhulv(accountTan, 'USDT')
            let res = await $ajax('userexchange', {
                accountTan: accountTan,
                feeTan: feeTan,
                accountAcc: 'USDT',
                feeAcc: feeTan / this.rates
            })
            if(!res) return false
            console.log(res)
            Toast(res.msg)
            this.$router.go(-1)
        },
        async currenhulv(current, value){
            let res = await $ajax('usercurrenhulv', {
               current,
               value
            })
            if (!res) return false
            console.log(res)
            this.rates = res.result
            console.log(this.rates)
        },
        closeservice(e) {
            this.showService = false;
        },
        daojishi() {
            this.second = 30;
            this.timer = setInterval(() => {
                this.second--
                if (this.second == 0) {
                    clearInterval(this.timer);
                    this.daojishi();
                }
            }, 1000);
        },
        change(type) {
            this.type = type;
            this.showmask = false;
            if(type == 'BTC'){
                this.num = this.btc
            }else if(type == 'ETH'){
                this.num = this.eth
            }else if(type == 'FIL'){
                this.num = this.fil
            }
        },
        gorecharge(type){
            console.log(type)
            this.$router.push(`'/exchange/${type}/转入'`)
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.orderSubmit {
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        background: #da428d;
        position: relative;
        color: #fff;
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
            color: #eee;
        }
    }
    .top_1 {
        width:100%;
        height: 20vw;
        background-image: linear-gradient(180deg, #da428d, #fff);
    }
    .top {
        width: 92vw;
        margin: -17vw 4vw 0;
        background: #fff;
        border-radius: 3vw;
        padding: 4vw 3vw;
        .header_top {
            .first {
                .type {
                    color: #999;
                    margin-bottom: 2vw;
                    font-size: 3.2vw;
                }
                .name {
                    img {
                        width: 8vw;
                        height: 8vw;
                    }
                    span {
                        font-weight: 600;
                        font-size: 6vw;
                        margin: 0 2vw;
                    }
                }
            }
            .second {
                .type {
                    color: #999;
                    margin-bottom: 2vw;
                    text-align: right;
                    font-size: 3.2vw;
                }
                .name {
                    img {
                        width: 8vw;
                        height: 8vw;
                    }
                    span {
                        font-weight: 600;
                        font-size: 6vw;
                        margin: 0 2vw;
                    }
                }
            }
        }
        .changeicon {
            width: 8vw;
            height: 8vw;
            text-align: center;
            border: 1px solid #eee;
            border-radius: 50%;
            line-height: 8vw;
            margin: 0 auto;
            position: relative;
            &::after {
                position: absolute;
                content: "";
                width: 40vw;
                height: 1px;
                top: 0;
                right: -40vw;
                bottom: 0;
                background: #eee;
                margin: auto 0;
            }
            &::before {
                position: absolute;
                content: "";
                width: 40vw;
                height: 1px;
                top: 0;
                left: -40vw;
                bottom: 0;
                background: #eee;
                margin: auto 0;
            }
        }
        .changenum {
            border-bottom: 1px solid #f7f7f7;
            height: 12vw;
            line-height: 12vw;
        }
        .tips {
            font-size: 3.2vw;
            line-height: 10vw;
            .left {
                color: #fc4142;
                span {
                    color: #da428d;
                }
            }
        }
        .time_num {
            background: #f5f5f5;
            border-radius: 2vw;
            padding: 2vw;
            .left {
                font-size: 3.2vw;
                line-height: 6.5vw;
            }
            .right {
                color: #da428d;
            }
        }
    }
    .tip {
        margin-top: 4vw;
        padding: 0 4vw;
        .title {
            line-height: 12vw;
            color: #333;
            font-size: 4vw;
        }
        .grey {
            font-size: 3.2vw;
        }
    }
    .submit {
        position: fixed;
        height: 12vw;
        line-height: 12vw;
        width: 100%;
        bottom: 16vw;
        left: 4vw;
        text-align: center;
        color: #fff;
        background: #da428d;
        border-radius: 2vw;
        width: 92vw;
    }
    .service {
        position: fixed;
        height: 12vw;
        width: 100%;
        justify-content: center;
        bottom: 2vw;
        left: 0;
        span {
            margin-left: 2vw;
            color: #666;
        }
    }
    .mask {
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.3);
        z-index: 100;
        top: 0;
        left: 0;
        position: fixed;
    }
    .change_mask {
        width: 100vw;
        background: #fff;
        z-index: 101;
        bottom: 0;
        left: 0;
        position: fixed;
        border-radius: 5vw 5vw 0 0;
        .title {
            padding: 0 4vw;
            height: 12vw;
        }
        .item {
            padding: 0 4vw;
            border-bottom: 1px solid #f7f7f7;
            height: 20vw;
            img {
                width: 10vw;
                height: 10vw;
                margin-right: 3vw;
            }
            .num {
                color: #333;
                font-size: 4.3vw;
            }
            .type {
                color: #999;
                font-size: 3vw;
                margin-top: 2vw;
            }
        }
    }
}
</style>