<template>
    <div class="orderDetail">
        <div class="header flex flex_between ali_center">
            <van-icon @click="$router.go(-1)" name="arrow-left" color="#fff" size="20" />
            <p>订单详情</p>
            <van-icon @click="showService = true" name="service-o" size="20" />
        </div>
        <div class="top_1"></div>
        <div class="top">
            <div class="name">这里是商品</div>
            <div class="order_status flex ali_center">
                <img src="" alt="" />
                <div class="">
                    <div class="status">订单生效中</div>
                    <div class="time">创建时间: <span>2021-02-02 14:00:00</span></div>
                    <div class="time">到期时间: <span>2021-02-02 14:00:00</span></div>
                </div>
            </div>
            <div class="order_id flex ali_center flex_between">
                <div class="">订单号：<span>00000000</span></div>
                <span class="copy" data-clipboard-text="00000000">复制</span>
            </div>
        </div>
        <div class="goods_info flex ali_center">
            <img src="" alt="" />
            <div class="infos">
                <div class="name">总扩容空间</div>
                <div class="name1"></div>
                <div class="des">订单算力</div>
            </div>
        </div>
        <div class="add_info">
            <div class="title flex ali_center flex_between">
                <div class="left">
                    已扩容<span>0</span>T
                </div>
                <div @click="$router.push('/addrecord/1')" class="right flex ali_center">
                    <span>查看记录</span>
                    <van-icon name="arrow"></van-icon>
                </div>
            </div>
            <div class="canshu flex ali_center flex_between">
                <div class="item">
                    <div class="num">000</div>
                    <div class="type">有效在存(TiB)</div>
                </div>
                <div class="item">
                    <div class="num">000</div>
                    <div class="type">锁仓收益(FIL)</div>
                </div>
                <div class="item">
                    <div class="num">000</div>
                    <div class="type">抵押币(FIL)</div>
                </div>
            </div>
        </div>
        <div class="order_info">
            <div class="item flex ali_center flex_between">
                <div class="left">购买台数</div>
                <div class="right">X1</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">矿机总价</div>
                <div class="right">X1</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">产品周期</div>
                <div class="right">X1</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">订单号</div>
                <div class="right">X1</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">支付时间</div>
                <div class="right">X1</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">支付方式</div>
                <div class="right">X1</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">CNY支付汇率</div>
                <div class="right">X1</div>
            </div>
            <div class="item money flex ali_center flex_between">
                <div class="left"></div>
                <div class="right">实付<span>0.00</span>CNY</div>
            </div>
        </div>
        <div style="height:15vw"></div>
        <div class="footer flex flex_between ali_center">
            <div class="item">产品扩容</div>
            <div class="item item1">续期产品</div>
        </div>
        <service
            :showService="showService"
            @close="closeservice"
        ></service>
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
            showService: false,
        };
    },
    mounted() {
        this.clipboard = copy('.copy');
    },
    methods: {
        closeservice(e) {
            this.showService = false;
        }
    }
};
</script>
<style lang="less" scoped>
.orderDetail {
    padding: 0 4vw;
    background: #f7f7f7 !important;
    overflow: auto;
    .header {
        width: 92vw;
        padding: 0 4vw;
        height: 12vw;
        top: 0;
        left: 0;
        position: fixed;
        background: #da428d;
        z-index: 100;
        color: #fff;
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
        width: 92vw;
        background: #fff;
        border-radius: 3vw;
        .name {
            padding: 0 4vw;
            line-height: 12vw;
            font-size: 3.47vw;
            color: #333;
            background:#da428d;
        }
        .order_status {
            padding: 0 4vw;
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
            padding: 5vw 4vw 3vw;
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
    .goods_info {
        width: 84vw;
        padding: 0 4vw;
        background: #fff;
        img {
            width: 15vw;
            height: 15vw;
            margin-right: 3vw;
        }
        .infos {
            .name {
                font-weight: 600;
                line-height: 10vw;
            }
            .name1 {
                width: 60vw;
                height: 4vw;
                background: #da428d;
            }
            .des {
                color: #666;
                font-size: 3.2vw;
                line-height: 8vw;
            }
        }
    }
    .add_info {
        width: 92vw;
        margin: 2vw 0;
        background: #fff;
        border-radius: 3vw;
        .title {
            height: 12vw;
            background: #fff8f3;
            color: #333;
            font-size: 3.2vw;
            padding: 0 4vw;
            .left {
                span {
                    margin: 0 1vw;
                    font-weight: 600;
                    font-size: 3.47vw;
                    color: #da428d;
                }
            }
        }
        .canshu {
            padding: 3vw 0;
            text-align: center;
            color: #333;
            font-size: 3.2vw;
            .item {
                width: 33%;
            }
            .num {
                margin-bottom: 1vw;
            }
        }
    }
    .order_info {
        .item {
            height: 12vw;
            font-size: 3.47vw;
            .left {
                color: #999;
            }
            .right {
                color: #777;
            }
        }
        .money {
            color: #333;
            span {
                font-weight: 600;
                font-size: 6vw;
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
        text-align: center;
        color: #ccc;
        .item {
            width: 43vw;
            height: 10vw;
            line-height: 10vw;
            border-radius: 2vw;
            background: #f7f4ff;
        }
        .item1 {
            background: #f5f5f5;

        }
    }
}
</style>