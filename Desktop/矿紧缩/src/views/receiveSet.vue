<template>
    <div class="orderDetail">
        <div class="header flex flex_between ali_center">
            <van-icon @click="$router.go(-1)" name="arrow-left" color="#000" size="20" />
            <p>收/付款设置</p>
            <van-icon name="plus" @click="showList = true" color="blue" />
        </div>
        <div style="height:15vw"></div>
        <div class="list" v-for="item in list" :key="item.id">
            <div class="item" @click="goedit(item.paytext, item.id)" >
                <!-- 每个类型背景图不同 -->
                <!-- <img src="" alt=""> -->
                <div class="wrapper flex" v-if="item.paytext == '银行卡'" :style="{'background-image': 'url('+bankimg+')'}" >
                    <div class="left"></div>
                    <div class="right">
                        <div class="name">{{item.realname}}</div>
                        <div class="num">{{item.bankcard}}</div>
                        <div class="num">{{item.opencard}}</div>
                        <div class="num">{{item.openbranch}}</div>
                        
                    </div>
                </div>
                <div class="wrapper flex" v-if="item.paytext == 'USDT'" :style="{'background-image': 'url('+usdtimg+')'}">
                    <div class="left"></div>
                    <div class="right">
                        <div class="name">{{item.wallet}}</div>
                        <div class="num">{{item.usdttext}}</div>
                        <div class="num">{{item.text}}</div>
                    </div>
                </div>
                <div class="wrapper flex" v-if="item.paytext == 'BTC'" :style="{'background-image': 'url('+btcimg+')'}">
                    <div class="left"></div>
                    <div class="right">
                        <div class="name">{{item.wallet}}</div>
                        <div class="num">{{item.text}}</div>
                    </div>
                </div>
                <div class="wrapper flex" v-if="item.paytext == 'ETH'" :style="{'background-image': 'url('+ethimg+')'}">
                    <div class="left"></div>
                    <div class="right">
                        <div class="name">{{item.wallet}}</div>
                        <div class="num">{{item.text}}</div>
                    </div>
                </div>
                <div class="wrapper flex" v-if="item.paytext == 'FIL'" :style="{'background-image': 'url('+filimg+')'}">
                    <div class="left"></div>
                    <div class="right">
                        <div class="name">{{item.wallet}}</div>
                        <div class="num">{{item.text}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="showList" @click="showList = false"></div>
        <div class="change_mask" v-if="showList">
            <div class="title flex ali_center flex_between">
                <span>添加收款方式</span>
                <van-icon name="cross" @click="showList = false"></van-icon>
            </div>
            <div class="item" @click="goedit('bank')">银行卡</div>
            <!-- <div class="item" @click="goedit('weixin')">微信</div> -->
            <!-- <div class="item" @click="goedit('ali')">支付宝</div> -->
            <div class="item" @click="goedit('USDT')">USDT地址</div>
            <div class="item" @click="goedit('BTC')">BTC地址</div>
            <div class="item" @click="goedit('ETH')">ETH地址</div>
            <div class="item" @click="goedit('FIL')">FIL地址</div>
        </div>
    </div>
</template>
<script>
import service from "./common/service";
import {copy} from '../func/copy'
export default {
    name: "orderDetail",
    components: {
        service,
    },
    data() {
        return {
            showList: false,
            showService: false,
            list: [],
            bankimg: require('@/assets/images/bank.png'),
            usdtimg: require('@/assets/images/usdt.png'),
            ethimg: require('@/assets/images/eth.png'),
            btcimg: require('@/assets/images/btc.png'),
            filimg: require('@/assets/images/fil.png'),
        };
    },
    mounted() {
        this.clipboard = copy('.copy');
        this.getData();
    },
    methods: {
        async getData(){
            let res = await $ajax('userpaymentpaylist', {})
            if(!res) return false
            this.list = res.list
        },
        closeservice(e) {
            this.showService = false;
        },
        goedit(type, id) {
            var typeback = ""
            if(type == '银行卡'){
                typeback = 'bank' 
             }else{
                 typeback = type
             }
            if (id) { //编辑
                this.$router.push({
                    name: "binding",
                    query: {
                        type:typeback,
                        id
                    }
                })
            } else { //添加
                this.$router.push({
                        name: "binding",
                        query: {
                            type:typeback,
                        
                        }
                    })
                // this.$router.push('/binding/' + type);
            }
            
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.orderDetail {
    padding: 0 4vw;
    background: #f7f7f7 !important;
    overflow: auto;
    .header {
        width: 100vw;
        padding: 0 4vw;
        height: 12vw;
        top: 0;
        left: 0;
        position: fixed;
        background: #fff;
        z-index: 100;
        color: #000;
    }
    .list {
        .item {
            margin-bottom: 2.4vw;
            width: 100%;
            height: 25vw;
            // background: #da428d;
            border-radius: 2vw;
            position: relative;
            // padding-top: 4vw;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .wrapper {
                width: 100%;
                // height: 2vw;
                height: 25vw;
                padding-top: 4vw;
                .left {
                    width: 15vw;
                    padding: 0 2vw;
                    height: 5vw;
                    line-height: 5vw;
                    border-radius: 1vw;
                    color: #fff;
                    font-size: 3.2vw;
                    margin: 0 3vw;
                    background: rgba(255,255,255,0.3);
                }
                .right {
                    color: #fff;
                    font-size: 3.47vw;
                    .name {
                        margin-bottom: 1vw;
                    }
                }
            }
        }
    }
    .mask {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.3);
        z-index: 101;
    }
    .change_mask {
        width: 100vw;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        z-index: 102;
        border-radius: 3vw 3vw 0 0;
        padding: 0 4vw;
        .title {
            height: 12vw;
            span {
                font-size: 5vw;
                font-weight: 600;
            }
        }
        .item {
            line-height: 15vw;
            border-bottom: 1px solid #f7f7f7;
        }
    }
}
</style>