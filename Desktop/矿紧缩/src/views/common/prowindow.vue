<template>
    <div class="prowindow" v-if="showWindow">
        <div class="mask" @click="close"></div>
        <div class="window">
            <div class="w_title flex ali_center flex_between">
                <span>{{productInfo.title}}</span>
                <van-icon name="cross" @click="close" />
            </div>
            <div class="type flex ali_center">
                <div class="flex ali_center">有效算力<p>{{productInfo.suanli}} <span>TH/台</span></p></div>
                <div class="flex ali_center">租赁期限<p>{{productInfo.zupin}}</p></div>
            </div>
            <div class="pro_num flex ali_center flex_between">
                <div class="left">购买台数</div>
                <div class="num flex ali_center">
                    <div class="jian" @click="jian">-</div>
                    <input type="number" @input="input" v-model="num" />
                    <div @click="add" class="add">+</div>
                </div>
            </div>
        
            <div class="freeing flex">
                <a href="javascript:;" @click="changenav(item.id)" v-for="(item, index) in productInfo.shopdays" :key="index">
                    <div class="item" :class="{on: item.id == status}">
                        <p class="days">预缴{{item.title}}天</p>
                        <p class="money">{{item.value}}CNY/台</p>
                        <!-- <div class="discount">8折</div> -->
                    </div>
                </a>
            </div>
            <div class="filzhiya flex ali_center flex_between" v-if="productInfo.catetype == 'FIL'"> 
                <div class="flex ali_center flex_between"><span>FIL质押</span><span>{{productInfo.deposit}}FIL</span></div>
                <div class="flex ali_center flex_between"><span>GAS手续费</span><span>{{productInfo.productprice}}FIL</span></div>
            </div>
            <div class="sub_btn flex ali_center flex_between">
                <div class="left">总价<span>{{all_money}}</span>CNY</div>
                <div class="right" :class="{on: status}" @click="submit">提交订单</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "prowindow",
    props: {
        productInfo: {
            type: Object,
            default: () => {}
        },
        showWindow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            status: "",
            num: 1,
            all_money: "0.00"
        };
    },
    created(){
        // this.gettotal()
    },
    methods: {
        async gettotal( ) {
            let id = this.$route.query.id
            if(!this.status) return Toast('请先选择规格')
            if(!this.num || this.num == "" || this.num < 0) return Toast("购买数量不能低于1台!")
             let res = await $ajax('goodstotals', {
                totalNum: this.num,
                goodsid: id,
                pid: this.status
            })
            if (!res) return false
            this.all_money = res.money
        },
        changenav(status) {
            console.log(status)
            this.status = status;
            this.gettotal()
        },
        input() {
            if (this.num < 1 || !this.num) {
                this.num = 1
                return Toast('购买数量不能低于1台');
            }
            if (this.num > 1000) {
                this.num = 1000;
                return Toast('购买数量不能超过剩余库存1000台');
            }
            this.gettotal()
        },
        jian() {
            if (this.num == 1) {
                return Toast('购买数量不能低于1台');
            } else {
                this.num--
            }
            this.gettotal()
        },
        add() {
            if (this.num == 1000) {
                return Toast('购买数量不能超过剩余库存1000台');
            } else {
                this.num++
            }
            this.gettotal()
        },
        submit() {
            let id = this.$route.query.id
            let num = this.num
            let price = this.all_money
            let pid = this.status
            if(!pid) return Toast('请先选择规格')
            this.$router.push({name: 'orderSubmit', query: {
                id,
                num,
                price,
                pid
             }})
            // this.$router.push({
            //     path: `"/order/submit/${id}/${num}/${price}/${pid}"`
            // })
        },
        close() {
            this.$emit("close", true);
        }
    }
};
</script>
<style lang="less" scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: rgba(0,0,0,.3);
    z-index: 1000;
    height: 100vh;
}
.window {
    position: fixed;
    bottom: 0;
    width: 92vw;
    background: #fff;
    border-radius: 3vw 3vw 0 0;
    left: 0;
    z-index: 1001;
    padding: 0 4vw;
    .w_title {
        height: 12vw;
    }
    .type {
        >div {
            font-size: 3.2vw;
            margin-right: 6vw;
            p {
                padding: 0 2vw;
                font-size: 4vw;
                color: #da428d;
                font-weight: 600;
                span {
                    font-weight: 400;
                    font-size: 3.2vw;
                }
            }
        }
    }
    .pro_num {
        height: 20vw;
        .num {
            .jian,
            .add {
                background: #f3f3f3;
                width: 6vw;
                height: 6vw;
                text-align: center;
                line-height: 6vw;
                font-size: 5vw;
            }
            input {
                border-left: 1px solid #fff;
                border-right: 1px solid #fff;
                width: 8vw;
                height: 6vw;
                line-height: 6vw;
                text-align: center;
                background: #f3f3f3;
            }
        }
    }
    .filzhiya{
        padding: 10px 10px;
        box-sizing: border-box;
        flex-direction: column;
        background: #f7f7f7;
        margin-top: 10px;
        border-radius: 10px;
        >div{
            width: 100%;
            padding: 10px 10px;
            // border-bottom: 1px solid #333;
        }
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
    .sub_btn {
        margin-top: 10vw;
        height: 15vw;
        .left {
            color: #333;
            font-size: 3.2vw;
            span {
                font-size: 5vw;
                font-weight: 600;
                margin: 0 1vw;
            }
        }
        .right {
            width: 30vw;
            line-height: 12vw;
            height: 12vw;
            color: #fff;
            background: #da428d;
            border-radius: 6vw;
            text-align: center;
            &.on {
                background: #da428d;
            }
        }
    }
}
</style>