<template>
    <div class="xujiaodianfei">
        <div class="header">
            <van-icon @click="leave" name="arrow-left" color="#fff" size="20" />
            <p>订单详情</p>
            <span @click="cancle">取消订单</span>
        </div>
        <div class="top_1"></div>
        <div class="top">
            <div class="order_status flex ali_center">
                <img src="@/assets/images/vip0.png" alt="" />
                <div class="">
                    <div class="status">等待用户付款</div>
                    <div class="time">创建时间: <span>{{createtime}}</span></div>
                </div>
            </div>
            <div class="order_id flex ali_center flex_between">
                <div class="">订单号：<span>{{ordersn}}</span></div>
                 <span class="copy" :data-clipboard-text="ordersn">复制</span>
               
            </div>
            <div class="order_id" v-if="wallet">
                <div class="">钱包地址：<span>{{wallet}}</span></div>
            </div>
            
           
        </div>
        <div class="window">
            <div class="title">续缴电费 待缴天数3510天</div>
            <div class="freeing flex">
                <div href="javascript:;" @click="changenav(item.id, item.value)" v-for="(item, index) in shopdays" :key="index">
                    <div class="item" :class="{on: item.id == status}" >
                        <p class="days">{{item.id}}预缴{{item.title}}天</p>
                        <p class="money">{{item.value}}USDT/台</p>
                        <!-- <div class="discount">8折</div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="orderInfo">
            <div class="title">续缴记录</div>
            <div class="item num flex ali_center flex_between" v-for="item in list" :key="item.id" >
                <div class=" flex ali_center  flex_between" style="font-weight:600; width:100%; color: #000;">
                    <div>{{item.price}}{{item.paytype}}</div>
                    <div>{{item.today}}天周期</div>
                </div>
                <div class=" flex  flex_between" style="width:100%;color: #999;">
                    <div>到期日期：{{item.endtime}}</div>
                    <div>状态：{{item.statusText}}</div>
                </div>
            </div>
            
        </div>
        <!-- <div class="tips">确定支付后不支持退款,请仔细确定订单信息</div> -->
        <!-- <div class="pay_ways">
            <div class="title">支付方式</div>
            <div class="item flex ali_center flex_between" @click="change('usdt')" >
                <div class="flex ali_center">
                    <img src="" class="icon" alt="" />
                    <span>USDT支付</span>
                    <p>9.8折优惠</p>
                </div>
                <img v-if="paytype == 'usdt'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div>
            <div class="item flex ali_center flex_between" @click="change('btc')" v-if="paystatus == 1">
                <div class="flex ali_center">
                    <img src="" class="icon" alt="" />
                    <span>BTC支付</span>
                </div>
                <img v-if="paytype == 'btc'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div>
            <div class="item flex ali_center flex_between" @click="change('cny')" >
                <div class="flex ali_center">
                    <img src="" class="icon" alt="" />
                    <span>CNY支付</span>
                </div>
                <img v-if="paytype == 'cny'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div>
            <div class="item flex ali_center flex_between" @click="change('fil')" v-if="paystatus == 3">
                <div class="flex ali_center">
                    <img src="" class="icon" alt="" />
                    <span>FIL支付</span>
                </div>
                <img v-if="paytype == 'fil'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div>
            <div class="item flex ali_center flex_between" @click="change('eth')" v-if="paystatus == 2">
                <div class="flex ali_center">
                    <img src="" class="icon" alt="" />
                    <span>ETH支付</span>
                </div>
                <img v-if="paytype == 'eht'" src="@/assets/images/dui.png" alt="" />
                <img v-else src="@/assets/images/yuan.png" alt="" />
            </div>
        </div> -->
        <!-- <div class="safe_tips flex ali_center">
            <img src="@/assets/images/dui.png" alt="" />同意
            <router-link to="/content/1">服务协议及风险提示</router-link>
        </div> -->
        <div class="tips1">投资有风险,入市需谨慎</div>
        <div style="height:15vw"></div>
        <div class="footer flex flex_between ali_center">
            <div class="left">总价 <span>{{zongjia}}</span>{{paytype}}</div>
            <div class="right" @click="openPwd">确定支付</div>
        </div>
        <pay-pwd
            :show="showPwd"
            @close="closePwd"
            @noticehandle="noticePwd"
        ></pay-pwd>
    </div>
</template>
<script>
import {copy} from '../func/copy'
import payPwd from "./common/paypwd";
export default {
    name: "xujiaodianfei",
    components: {
        payPwd
    },
    data() {
        return {
            paytype: "usdt",
            showPwd: false,
            price:"",
            wallet: "",
            fees: "",
            shopday: "",
            realprice: "",
            total: "",
            pid: "",
            goodsName: "",
            goodsid: "",
            t_num: "",
            createtime: "",
            uniacid: "",
            ordersn: "",
            paystatus: "", //判断支付
            rates: "",
            endtime: '',
            status: "",
            title: "",
            thumb: "",
            shopdays: [],
            statusres: '',
            list: [],
            totalnum: '',
            zongjia: '',
            

        };
    },
    
    mounted() {
        this.clipboard = copy('.copy');
        this.totalnum = this.$route.params.total
        // this.getData()
        // this.change('usdt')
        this.gettotal()
        this.getData()
    },
    methods: {
        async gettotal( ) {
            let id = this.$route.params.id
            
            // if(!this.num || this.num == "" || this.num < 0) return Toast("购买数量不能低于1台!")
             let res = await $ajax('kuangorderfeesOrder', {
                 orderid: id
            })
            if (!res) return false
            this.createtime = res.createtime
            this.endtime = res.endtime
            this.ordersn = res.ordersn
            this.statusres = res.status
            this.goodsid = res.goodsid
            this.title = res.title
            this.thumb = res.thumb
            this.shopdays = res.shopdays
           
        },
        changenav(status, val) {
            console.log(status)
            this.status = status;
            this.gettotal()
             this.zongjia = this.totalnum * val
             this.price = val
             
        },
        async getData() {
            let id = this.$route.params.id
            let res = await $ajax('kuangordercontiendLog', {
                orderid: id
            })
            if (!res) return false
            this.list = res.list
         
            
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
        async noticePwd(e) {
            // let {id, num, price, pid} = this.$route.query
            // if(!this.paytype) return Toast("请选择支付方式")
            // let status = e.status
            // if(status != 1) return false
            let id = this.$route.params.id
            let num = this.totalnum
            let res = await $ajax('kuangordercontiendPay', {
                orderid: id,
                // total: num,
                // price: this.price, // 矿机单价
                // realprice: this.zongjia, //总价
                pid: this.status, //周期id
                fees:this.zongjia,
                // payType: this.paytype,
                // ordersn: this.ordersn

            })
            if (!res) return false
            Toast(res.msg)
            this.$router.push({
                name: "products"
            })

        },
        closePwd(e) {
            this.showPwd = false;
        },
        openPwd(e) {
            // if(!this.paytype) return Toast("请选择支付方式")
            this.showPwd = true;
            
        },
        change(type) {
            console.log(type)
            this.paytype = type;
            let price = this.price
            let fees = this.fees
            let realprice = this.realprice
            let typeval = type.toUpperCase()
            this.currenhulv(typeval, 'CNY')

            // if(this.paytype == 'usdt'){
                
            // }else if(this.paytype == 'btc'){

            // }else if(this.paytype == 'cny'){

            // }else if(this.paytype == 'fil'){

            // }else if(this.paytype == 'eth'){

            // }

        },
        //取消
        async kuangorderdontPay() {
            let {id} = this.$route.params
            let res = await $ajax('kuangorderdontPay', {
                orderid:  id,
            })
            if (!res) return false
            Toast(res.msg)
            
        },
        cancle() {
            let that = this
            function beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                    that.kuangorderdontPay()
                    that.$router.go(-1)
                    
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
                title: '确定离开订单？',
                message: '是否离开支付订单,超时待支付订单系统将自动取消,如需重新支付请到"我的订单"查看!',
                confirmButtonText: "确定离开",
                confirmButtonColor: "#3177f0",
                cancelButtonText: "继续支付",
                beforeClose,
            });
        }
    }
};
</script>
<style lang="less" scoped>
.xujiaodianfei {
    padding: 0 4vw;
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        top: 0;
        left: 0;
        position: fixed;
        background: #da428d;
        z-index: 100;
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
        position: absolute;
        top: 12vw;
        left: 0;
        width:100%;
        height: 20vw;
        background-image: linear-gradient(180deg, #da428d, #fff);
    }
    .top {
        position: relative;
        margin-top: 12vw;
        margin-bottom: 4vw;
        width: 84vw;
        background: #fff;
        padding: 0 4vw;
        border-radius: 3vw;
        .order_status {
            height: 20vw;
            img {
                width: 15vw;
                height: 15vw;
                margin-right: 4vw;
            }
            > div {
                .status {
                    margin-bottom: 2vw;
                    font-size: 4.2vw;
                    font-weight: 600;
                }
                .time {
                    color: #666;
                    font-size: 3.2vw;
                    span {
                        color: #333;
                    }
                }
            }
        }
        .order_id {
            padding: 5vw 0 3vw;
            div {
                border-radius: 4vw;
                text-indent: 4vw;
                width: 65vw;
                line-height: 8vw;
                background: #f7f7f9;
                font-size: 3.2vw;
                color: #999;
                span {
                    font-size: 3.47vw;
                    color: #333;
                }
            }
            .copy {
                color: #fff;
                background: #da428d;
                line-height: 8vw;
                border-radius: 4vw;
                padding: 0 3vw;
                font-size: 3.47vw;
            }
        }
    }

    .orderInfo {
        width: 84vw;
        padding: 2vw 4vw;
        background: #fff;
        border-radius: 2.5vw;
        .title {
            line-height: 12vw;
            border-bottom: 0.5px solid #eee;
            font-size: 4.2vw;
        }
        .item {
            border-bottom: 0.5px solid #999;
            // height: 12vw;
            font-size: 3.47vw;
            flex-wrap: wrap;
            >div{
                // margin-bottom:10px;
                padding: 5px 0px;
                box-sizing: border-box;
            }
            // p {
            //     color: #999;
            // }
            // span {
            //     color: #666;
            // }
        }
        .money {
            text-align: right;
            color: #333;
            font-size: 3.2vw;
            line-height: 12vw;
            span {
                font-size: 5.5vw;
                font-weight: 600;
            }
        }
    }
    .tips {
        text-align: right;
        line-height: 12vw;
        color: #999;
        font-size: 3.2vw;
    }
    .pay_ways {
        width: 84vw;
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
                    color: #fff;
                    font-size: 2.5vw;
                    background: #f8825a;
                    line-height: 4vw;
                    margin-left: 1vw;
                    padding: 0 1.5vw;
                    border-radius: 1vw;
                }
                img {
                    width: 4vw;
                    height: 4vw;
                    margin-right: 2vw;
                }
            }
        }
    }
    .safe_tips {
        font-size: 3.2vw;
        color: #666;
        justify-content: center;
        a {
            color:#7e8aa2;
            margin-left: 1vw;
        }
        img {
            margin-right: 2vw;
            width: 3vw;
            height: 3vw;
        }
    }
    .tips1 {
        text-align: center;
        line-height: 10vw;
        color: #999;
        font-size: 3vw;
    }
    .window{
        .title{
            padding: 10px 10px;
            font-size: 14px;
        }
   
        .freeing {
            overflow: auto;
            .item {
                width: 35vw;
                text-align: center;
                height: 11vw;
                background: #f7f7f7;
                margin-right: 4vw;
                padding: 2vw 0;
                border-radius: 2vw;
                position: relative;
                .days {
                    color: #666;
                    font-size: 3.73vw;
                    margin-bottom: 1.5vw;
                }
                .money {
                    font-size: 3.2vw;
                    color: #999;
                }
                .discount {
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #fff;
                    background: #fe7f56;
                    border-radius: 1vw;
                    font-size: 2vw;
                    line-height: 3.5vw;
                    padding: 0 1.5vw;
                }
                &.on {
                    background: #da428d;
                    .money,
                    .days {
                        color: #fff;
                    }
                }
            }
        }
     }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 92vw;
        padding: 0 4vw;
        height: 15vw;
        background: #fff;
        .left {
            font-size: 3.2vw;
            span {
                font-size: 5vw;
                font-weight: 600;
            }
        }
        .right {
            color: #fff;
            line-height: 12vw;
            width: 30vw;
            text-align: center;
            background: #da428d;
            border-radius: 1vw;
        }
    }

}
.on {
    background: #da428d;
    .money,
    .days {
        color: #fff;
    }
}
</style>