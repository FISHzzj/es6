<template>
    <div class="orderlist">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>{{typeName}}订单</p>
        </div>
        <div class="top" v-if="type ==1">
            <div class="num">{{listtotal}}</div>
            <div class="type">持有矿机数(台)</div>
        </div>
        <div class="top" v-if="type ==2">
            <div class="num">0.00</div>
            <div class="type">持有总算力(T)</div>
        </div>
        <div class="top" v-if="type ==3">
            <div class="num">0.00</div>
            <div class="type">持有生效订单(笔)</div>
        </div>
        <div class="nav flex ali_center flex_around">
            <div class="item" :class="{on:status == 0}" @click="changenav(0)">待支付</div>
            <div class="item" :class="{on:status == 2}" @click="changenav(2)">生效中</div>
            <div class="item" :class="{on:status == 3}" @click="changenav(3)">已终止</div>
        </div>
        <div class="list">
             <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="'我是有底线的'"
                @load="getData"
                >
                <router-link 
                    class="item" 
                    v-for="(item,index) in list" :key="index"
                    :to="{name: 'orderDetail', query:{id:`${item.id}`}}"  tag="div">
                       
                        <div class="flex ali_center flex_between id_status" v-if="item.status == 2 || item.status == 3">
                            <span class="order_sn">订单号： {{item.ordersn}}</span>
                            <span class="status" v-if="item.status == 0">待支付</span>
                            <span class="status" v-if="item.status == 2">生效中</span>
                            <span class="status" v-if="item.status == 3">已终止</span>
                        </div>
                        <div v-if="item.status == 2 || item.status == 3">
                            <div class="infos flex flex_between ali_center" >
                                <div class="name">{{item.goodsName}}</div>
                                <div class="num">X{{item.total}}</div>
                            </div>
                            <div class="buy_time">购买日：{{item.createtime}}</div>
                            <div class="buy_time">电费到期日：{{item.endtime}}</div>
                            <div class="bottom flex ali_center flex_between">
                                <div class="left">总价<span>{{item.realprice}}</span>{{item.paytype}}</div>
                                <div class="right flex ali_center">
                                    <span v-if="item.status == 2" style="border:1px solid #da428d;color:#da428d;">续缴电费</span>
                                    <span v-else>终止产品</span>

                                </div>
                            </div>
                        </div>
                    </router-link>
                    <router-link 
                    class="item" 
                    v-for="item in list" :key="item.id"
                    :to="{name: 'orderSubmit', query:{id:`${item.goodsid}`, num: `${item.total}`, price: `${item.realprice}`, pid: `${item.pid}`}}" tag="div"
                    >
                        <div class="flex ali_center flex_between id_status" v-if="item.status == 0">
                            <span class="order_sn">订单号： {{item.ordersn}}</span>
                            <span class="status" v-if="item.status == 0">待支付</span>
                            <span class="status" v-if="item.status == 2">生效中</span>
                            <span class="status" v-if="item.status == 3">已终止</span>
                        </div>
                        <div v-if="item.status == 0">
                            <div class="daipay flex ali_center">
                                <div class="daipayimg"><img :src="item.thumb" alt=""></div>
                                <div class="righttitle flex">
                                    <div>   
                                        <p>{{item.goodsName}}</p>
                                        <p>X{{item.total}}</p>
                                    </div>
                                    <div >下单日：{{item.createtime}}</div>
                                </div>
                            </div>
                            <div class="bottom flex ali_center " style="justify-content:flex-end;">
                                <!-- <div class="left">总价<span>0.000</span>CNY</div> -->
                                <div class="right flex ali_center" style="margin-right:10px">
                                    <span>取消订单</span>
                                </div>
                                <div class="right flex ali_center" >
                                    <span style="border:1px solid #da428d;color:#da428d;">确认支付</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
            </van-list>
            
        </div>
    </div>
</template>
<script>
export default {
    name: "orderlist",
    data() {
        return {
            status: 2,
            typeName: "",
            type: 1,
            list: [],
            page: 1,
            limit: 10,
            finished: false,
            loading: false,
            listtotal: "",
        };
    },
    mounted() {
        // this.type = this.$route.params.type;
        // if (this.type ==1) {
        //     this.typeName = "联合挖矿";
        // } else if (this.type ==2) {
        //     this.typeName = "IPFS存储";
        // } else if (this.type ==3) {
        //     this.typeName = "合约算力";
        // }
        // this.getData()
    },
    methods: {
        async getData() {
            console.log(this.$route.query.id)
            let id = this.$route.query.id
            // console.log(typeof id)
            // let cateid = Number(this.$route.query.id)
            // console.log(cateid)
            let res = await $ajax('kuangorderorders',{
                page: this.page,
                cateid: Number(id),
                status: this.status
            })
            if (!res) return false
            this.page++
            console.log(res.lists)
            this.listtotal = res.listtotal
            this.list.push(...res.lists)
            // // 加载状态结束
            this.loading = false
            if (res.lists.length === 0) {
                this.finished = true //加载完成
            } 
        },
        changenav(index) {
            this.status = index;
            this.list = []
            this.page = 1
            this.getData()
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.orderlist {
    background: #f7f7f7 !important;
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
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .top {
        text-align: center;
        background: #fff;
        padding: 6vw 0;
        .num {
            font-size: 7vw;
            font-weight: 600;
            
        }
        .type {
            color: #666;
            font-size: 3.2vw;
        }
    }
    .nav {
        height: 12vw;
        text-align: center;
        background: #fff;
        .item {
            width: 30vw;
            color: #ccc;
            font-weight: 600;
            &.on {
                color: #333;
                position: relative;
                &::after {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    bottom: -2vw;
                    width: 8vw;
                    content: "";
                    height: 0.75vw;
                    background: #da428d;
                }
            }
        }
    }
    .list {
        width: 100vw;
        padding: 3vw 4vw;
        .item {
            background: #fff;
            padding: 0 3vw;
            border-radius: 3vw;
            margin-bottom: 4vw;
            .id_status {
                width: 100%;
                height: 10vw;
                border-bottom: 1px solid #f7f7f7;
                font-size: 3.2vw;
                .order_sn {
                    color: #333;
                }
                .status {
                    color: #da428d;
                }
            }
            // .two{
            //     width: 100%;
                .infos {
                    height: 14vw;
                    .name {
                        max-width: 60vw;
                        color: #333;
                        font-weight: 600;
                        font-size: 4.2vw;
                    }
                    .num {
                        color: #999;
                        font-size: 3.2vw;
                    }
                }
                .buy_time {
                    color: #999;
                    font-size: 3vw;
                    line-height: 5vw;
                }
                .bottom {
                    height: 13vw;
                    border-top: 1px solid #f7f7f7;
                    .left {
                        color: #333;
                        font-size: 3.47vw;
                        span {
                            font-weight: 600;
                            font-size: 6vw;
                        }
                    }
                    .right {
                        span {
                            width: 19vw;
                            color: #ccc;
                            line-height: 8vw;
                            height: 8vw;
                            font-size: 3.47vw;
                            border-radius: 3vw;
                            border: 1px solid #ccc;
                            text-align: center;
                        }
                    }
                }
            // }
                .daipay{
                    height: 30vw;
                    justify-content: flex-start;
                    .daipayimg{
                        height: 25vw;
                        width: 25vw;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .righttitle{
                        flex-direction: column;
                        justify-content: space-between;
                        // justify-content: space-between;
                        height: 20vw;
                        font-size: 15px;
                    }
                }
      
        }
    }
}
</style>