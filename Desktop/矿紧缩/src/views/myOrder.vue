<template>
    <div class="myOrder">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>我的订单</p>
        </div>
        <div class="list" v-for="item in list" :key="item.id">
            <div class="item flex" @click="$router.push({name: 'orderlist', query:{id: `${item.id}`} })">
                <img src="@/assets/images/icon/4.png" alt=""  v-if="item.name == 'BTC'"/>
                <img src="@/assets/images/icon/2.png" alt=""  v-if="item.name == 'ETH'" />
                <img src="@/assets/images/icon/3.png" alt=""  v-if="item.name == 'FIL'"/>
                <div class="right">
                    <div class="name">{{item.name}}</div>
                    <div class="flex ali_center">
                        <p>持有中<span>{{item.get_total}}</span>笔</p>
                        <p>已到期<span>{{item.not_total}}</span>笔</p>
                    </div>
                </div>
            </div>
            <!-- <div class="item flex" @click="$router.push('/orderlist/2')">
                <img src="@/assets/images/icon/jyjl.png" alt="" />
                <div class="right">
                    <div class="name">IPFS存储订单</div>
                    <div class="flex ali_center">
                        <p>持有中<span>1</span>笔</p>
                        <p>已到期<span>1</span>笔</p>
                    </div>
                </div>
            </div> -->
            <!-- <div class="item flex" @click="$router.push('/orderlist/3')">
                <img src="@/assets/images/icon/jyjl.png" alt="" />
                <div class="right">
                    <div class="name">合约算力订单</div>
                    <div class="flex ali_center">
                        <p>持有中<span>1</span>笔</p>
                        <p>已到期<span>1</span>笔</p>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: "myOrder",
    data(){
        return{
            list: [],
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        async getData(){
            let res = await $ajax('goodscategory', {})
            if(!res) return false
            this.list = res.category
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.myOrder {
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
    .list {
        padding: 2vw 4vw;
        .item {
            width: 100%;
            height: 25vw;
            margin-bottom: 2.4vw;
            background: #fff;
            border-radius: 3vw;
            padding: 6vw 4vw;
            img {
                width: 8vw;
                height: 8vw;
                margin-right: 2.4vw;
            }
            .right {
                .name {
                    font-size: 4vw;
                    font-weight: 600;
                    color: #333;
                }
                .flex {
                    p {
                        margin-top: 4vw;
                        color: #999;
                        font-size: 3.2vw;
                        margin-right: 4vw;
                        span {
                            color: #333;
                            font-size: 3.47vw;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }
}
</style>