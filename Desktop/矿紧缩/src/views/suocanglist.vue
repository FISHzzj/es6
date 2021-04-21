<template>
    <div class="orderSubmit">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" color="#000" size="20" />
            <p>FIL释放记录</p>
        </div>
         <div style="height:12vw;"></div>
       <!-- <div class="top ">
  
            <div class="bottom flex flex_between ali_center">
                <div class="left">
                    <div class="type">{{type}}总资产</div>
                    <div class="num">{{money}}</div>
                </div>
                <div class="right" v-if="type == 'FIL'">
                    <div class="type">{{type}}锁仓资金</div>
                    <div class="num">{{fil_frozen}}</div>
                </div>
            </div>
            <div class="bottom flex flex_between ali_center">
                <div class="left">
                    <div class="type">可用</div>
                    <div class="num">{{money}}</div>
                </div>
                <div class="right" v-if="type != 'CNY'">
                    <div class="type">折合(CNY)</div>
                    <div class="num">{{tocny}}</div>
                </div>
            </div>
        </div> -->
        <div class="list">
            <!-- <div class="title">FIL释放记录</div> -->
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="'我是有底线的'"
                @load="getData"
                >
                <div
                class="item flex ali_center flex_between" 
                v-for="item in list" :key="item.id"
                >
                    <div class="left">
                        <div class="type">{{item.rechargeType}}</div>
                        <div class="time">{{item.createtime}}</div>
                    </div>
                    <div class="right">{{item.money}}</div>
                </div>

            </van-list>
            
        </div>
        <!-- <div class="footer flex ali_center flex_between">
            <div v-if="type != 'USDT' && type != 'CNY'" class="exchange flex ali_center"  @click="duihuan">
                <van-icon name="exchange" color="blue" />
                <span>兑换</span>
            </div>
            <div class="cash" :class="{on:type == 'USDT' || type == 'CNY'}" @click="$router.push('/cash')">提现</div>
            <div class="recharge" :class="{on:type == 'USDT' || type == 'CNY'}" @click="gorecharge">充值</div>
        </div> -->
    </div>
</template>
<script>
export default {
    name: "orderSubmit",
    data() {
        return {
            iconeyeclose: true,
            showmask: false,
            type: "CNY", 
            money: "",
            list: [],
            page: 1,
            limit: 10,
            finished: false,
            loading: false,
            accountType: '',
            tocny: '',
            fil_frozen: "",
        };
    },
    created() {
        this.type = this.$route.params.type;
        this.money = this.$route.params.num;
        this.currenhulv(this.type,'CNY')
        this.getsoucang()
    },
    mounted() {
        // this.getData()
    },
    methods: {
        async getsoucang(){
            let res = await $ajax('userInfowallet', {requstType: "wallet"})
            if(!res) return false
            console.log(res)
            Object.keys(res).forEach((key)=>{
                this[key] = res[key]
                
            })
           
        },
        async getData(){
            
            let res = await $ajax('userlogfil', {
                // type:this.accountType,
                page:this.page
            }) 
            if(!res) return false
            this.page++
            console.log(res.list)
            this.list.push(...res.list)
            // // // 加载状态结束
            this.loading = false
            if (res.list.length == 0) {
                this.finished = true //加载完成
            } 
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
            if(current == 'USDT'){
               this.tocny = this.money * this.rates  
            }else if(current == 'BTC'){
                this.tocny =  this.money * this.rates 
            }else if(current == 'ETH'){
                this.tocny =  this.money * this.rates
            }else if(current == 'FIL'){
                this.tocny =  this.money * this.rates 
            }
        },
        goexchange() {

        },
        gocash() {
            // if (this.type == 'CNY') {
            //     this.$router.push('/recharge');
            // } else {
            //     this.$router.push('/exchange/' + this.type);
            // }
        },
        duihuan(){
            this.$router.push('/changeType/' + this.type + '/' + this.money)
        },
        gorecharge() {
            if (this.type == 'CNY') {
                this.$router.push('/recharge/' + this.type);
            } else {
                this.$router.push('/recharge/' + this.type);
            }
        },
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.orderSubmit {
    .header {
        width: 100%;
        height: 12vw;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 100;
        color: #000;
        background: #f7f7f7;
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
    .top {
        width: 100%;
        padding: 0 4vw;
        background: #f7f7f7;
        .title {
            .type {
                color: #444;
                font-size: 3.2vw;
            }
            .num {
                color: #333;
                font-size: 7vw;
                font-weight: 600;
            }
        }
        .bottom {
            padding: 4vw 0 3vw;
            .left {
                .type {
                    color: #999;
                    font-size: 3.2vw;
                    margin-bottom: 2vw;
                }
                .num {
                    color: #333;
                    font-size: 4.2vw;
                }
            }
            .right {
                text-align: right;
                .type {
                    color: #999;
                    font-size: 3.2vw;
                    margin-bottom: 2vw;
                }
                .num {
                    color: #999;
                    font-size: 4.2vw;
                }
            }
        }
    }
    .list {
        padding: 0 4vw;
        .title {
            line-height: 15vw;
            font-size: 4.5vw;
            font-weight: 600;
            text-align: center;
        }
        .item {
            padding: 2vw 0;
            border-bottom: 1px solid #f7f7f7;
            .left {
                .type {
                    font-size: 3.73vw;
                    color: #333;
                }
                .time {
                    margin-top: 1.5vw;
                    color: #999;
                    font-size: 3.2vw;
                }
            }
            .right {
                color: #999;
            }
        }
    }
    .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 20vw;
        padding: 0 4vw;
        flex-wrap: nowrap;
        background: #fff;
        div {
            width: 29vw;
            text-align: center;
            height: 12vw;
            border-radius: 2vw;
        }
        .exchange {
            height: 20vw;
            flex-direction: column;
            justify-content: center;
        }
        .cash {
            color: #fff;
            line-height: 12vw;
            background: #ef63a8;
            &.on {
                width: 44vw;
            }
        }
        .recharge {
            color: #fff;
            line-height: 12vw;
            background: #da428d;
            &.on {
                width: 44vw;
            }
        }
    }
}
</style>