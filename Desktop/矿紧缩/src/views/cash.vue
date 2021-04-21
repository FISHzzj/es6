<template>
    <div class="recharge">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>OTC提现</p>
            <span @click="gopage('/record/cash')">提现记录</span>
        </div>
        <!-- 无收款信息 -->
        <div class="top" v-if="wushoukuan" @click="gopage('/receiveSet')">
            <div class="title">添加您的提现方式</div>
            <div class="type flex ali_center">
                <van-icon name="add" color="#999" size="15" />
                <span>提交本人的银行卡</span>
            </div>
        </div>
        <!-- 有收款信息 -->
        <div class="top_1" v-else @click="showlist = true">
            <div class="title flex ali_center" @click="showlist = true">
                <img src="@/assets/images/icon/1.png" alt="" />
                <span>提现到{{paytext}}</span>
                <van-icon name="arrow"></van-icon>
            </div>
            <!-- <div class="wx_info">
                <div class="nickname">{{paytext}} <span>1111</span> </div>
                <div class="wx_id">微信号： <span>1111</span></div>
            </div> -->
        </div>
  
        <van-tabs v-model="active" line-height="0" title-active-color="#da428d" swipe-threshold="4" :animated="true" :swipeable="true">
            <van-tab :name="item.type" :title="item.name" v-for="(item, index) in navList" :key="index">
                <div class="buy_num">
                    <div class="title">提现数量</div>
                    <div class="input flex ali_center flex_between">
                        <input type="number" v-model="num" :placeholder="'可提现金额'+ item.num+item.type" />
                        <span>{{item.type}}数量</span>
                    </div>
                    <div class="tips flex ali_center flex_between">
                        <span>{{item.type}}实时单价≈1元/{{item.type}}</span>
                        <span v-if="num">到帐≈{{paynum}}元</span>
                    </div>
                </div>
                <div class="tip">
                    <div class="title" v-if="item.type == 'CNY'">温馨提示:</div>
                    <div class="title" v-else>温馨提示(OTC代提为第三方大宗商家承兑):</div>
                    <div class="grey">1.最小{{item.name}}金额为{{item.num}}{{item.type}}起</div>
                    <div class="grey">2.本次提现不收取手续费</div>
                    <div class="grey">3.提现审核时间为工作日9:30-18:30,如超过2个工作日未到帐请联系客服处理</div>
                    <div class="grey">4.因第三方支付风控限额,请广大用户在选择提现时，超过10000元以上，采用银行卡方式，避免因第三方支付原因，延迟到帐或取消。</div>
                </div>
            </van-tab>
        </van-tabs>
        <div class="submit" @click="submit">确认提现</div>
        <div class="mask" v-if="showlist" @click="showlist = false"></div>
        <div class="changemask" v-if="showlist">
            <div class="title">请选择提现账号</div>
            <div class="item flex ali_center flex_between"  v-for="(item, index) in  list" :key="index"  @click="changeitem(item.paytext)">
                <div class="left flex ali_center"  v-if="item.paytext == '银行卡'">
                    <img src="@/assets/images/icon/1.png" alt=""  />
                    <!-- <img src="@/assets/images/icon/2.png" alt=""  v-if="item.paytext == 'USDT'"/>
                    <img src="@/assets/images/icon/4.png" alt=""  v-if="item.paytext == 'BTC'" />
                    <img src="@/assets/images/icon/5.png" alt=""  v-if="item.paytext == 'ETH'"/>
                    <img src="@/assets/images/icon/3.png" alt=""  v-if="item.paytext == 'FIL'"/> -->
                    <div class="infos">
                        <div class="type">{{item.paytext}}</div>
                        <div class="nickname" v-if="item.paytext == '银行卡'">{{item.bankcard}}</div>
                        <div class="nickname" v-else>{{item.wallet}}</div>
                    </div>
                </div>
                <div class="right" v-if="item.paytext == '银行卡'">
                     <!-- <img v-if="true"  src="@/assets/images/yuan.png" alt="" /> -->
                    <img    src="@/assets/images/dui.png" alt="" />
                   
                </div>
            </div>
            <div class="add flex ali_center" @click="gopage('/receiveSet')">
                <van-icon name="plus" />
                <span>添加收款方式</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "recharge",
    data() {
        return {
            showlist: false,
            // paynum: 0,
            num: "",
            active: "CNY",
            paytype: "bank",
            navList: [
                {type:'CNY',name:'CNY提现',num:0},
                {type:'USDT',name:'USDT代提',num:0},
                {type:'BTC',name:'BTC代提',num:0},
                {type:'ETH',name:'ETH代提',num:0},
                {type:'FIL',name:'FIL代提',num:0}
            ],
            list:[],
            right: false,
            wushoukuan: true,
            paytext: "银行卡",
            rates: '',
            usdt: '',
            btc: '',
            eth: '',
            fil: '',
            carType: '',
        }
    },
    created() {
        if (this.$route.params.type) {
            this.active = this.$route.params.type;
        }
        this.getData()
        this.getrecharge()
    },
    computed:{
        paynum(){
           
            if(this.active == 'CNY'){
                let paynum = this.num 
                return paynum
            }else if(this.active == 'USDT') {
                 let paynum = this.num * this.usdt
                return paynum
            }else if(this.active == 'BTC') {
                 let paynum = this.num * this.btc
                return paynum

            }else if(this.active == 'ETH') {
                 let paynum = this.num * this.eth
                return paynum

            }else if(this.active == 'FIL') {
                let paynum = this.num * this.fil
                return paynum

            }
            
        },
    },
    methods: {
        async getData() {
            let res = await $ajax('userpaymentpaylist')
            if (!res) return false
            this.list = res.list
            this.usdt = res.usdt
            this.btc = res.btc
            this.eth = res.eth
            this.fil = res.fil
            if(this.list.length > 0){
                this.wushoukuan = false
            }else{
                this.wushoukuan = true
            }
            
       
        },
        async getrecharge(){
             
            let type = this.active.toLowerCase()
            // let type = this.type.toLowerCase()
            // if(type == "cny"){
            //     this.accountType = 1
            // }else if(type == "usdt") {
            //     this.accountType = 2
            // }else if(type == "btc"){
            //     this.accountType = 3
            // }else if(type == "eth"){
            //     this.accountType = 4
            // }else if(type == "fil"){
            //     this.accountType = 5
            // }
            let res = await $ajax('userrecharge', {rechargeType: type, getType: 2, accountType: 1})
            if(!res) return false
            // this.money = res.money
            // this.code = res.code
            // this.wallet = res.wallet
            this.payId = res.id
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
        
        changeitem(paytext) {
            this.paytext = paytext
            this.showlist = false
         
        },
        gopage(url) {
            this.$router.push(url);
        },
        async submit() {
            if(!this.num) return Toast("请输入金额!")
            if(!this.payId) return Toast("请选择收款方式!")
            let type = this.active.toLowerCase()
            if(type == "cny"){
                this.carType = 1
            }else if(type == "usdt") {
                this.carType = 2
            }else if(type == "btc"){
                this.carType = 3
            }else if(type == "eth"){
                this.carType = 4
            }else if(type == "fil"){
                this.carType = 5
            }
            let res = await $ajax('userrechargepays', {
                getType: 2,
                payId: this.payId,
                money: this.num,
                // wallet: this.wallet,
                carType: this.carType,
                accountType: 1
        
            })
            if(!res) return false
            console.log(res)
            Toast(res.msg)
            this.$router.go(-1)
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
    .top {
        text-align: center;
        padding-bottom: 4vw;
        .title {
            line-height: 12vw;
            color: #333;
            font-weight: 600;
            font-size: 3.73vw;
        }
        .type {
            margin: 0 auto;
            width: 60vw;
            justify-content: center;
            height: 12vw;
            border: 1px dashed #999;
            font-size: 3.2vw;
            color: #999;
            span {
                margin-left: 2vw;
            }
        }
    }
    .top_1 {
        padding: 0 6vw;
        .title {
            height: 12vw;
            img {
                width: 8vw;
                height: 8vw;
                margin-left: 3vw;
            }
        }
        .wx_info {
            line-height: 6vw;
            color: #999;
            span {
                color: #333;
            }
        }
    }
    .buy_num {
        padding: 6vw 4vw 15vw;
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
    .tip {
        padding: 0 4vw;
        color: #999;
        .title {
            color: #333;
            font-size: 4.2vw;
            line-height: 8vw;
        }
        .grey {
            font-size: 3.1vw;
            line-height: 5vw;
        }
    }
    .submit {
        width: 92vw;
        margin: 26vw 4vw 3vw;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        color: #fff;
        background: #da428d;
        border-radius: 1vw;
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background:rgba(0,0,0,.3);
    }
    .changemask {
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 0 6vw;
        width: 100vw;
        background:#fff;
        border-radius: 3vw 3vw 0 0;
        .title {
            text-align: center;
            line-height: 15vw;
        }
        .item {
            height: 15vw;
            .left {
                img {
                    width: 10vw;
                    height: 10vw;
                    margin-right: 3vw;
                }
                .infos {
                    .type {
                        font-size: 4.2vw;
                    }
                    .nickname {
                        font-size: 3.2vw;
                        color: #999;
                        margin-top: 1vw;
                    }
                }
            }
            .right {
                img {
                    width: 6vw;
                    height: 6vw;
                }
            }
        }
        .add {
            height: 12vw;
            color: #ccc;
            .van-icon {
                margin: 0 4vw 0 3vw;
            }
        }
    }
}
</style>