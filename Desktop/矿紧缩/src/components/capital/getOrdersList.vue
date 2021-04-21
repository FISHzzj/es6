<template>
    <div id="getOrders">
        <van-nav-bar
        :title="$i18n.getOrdersList['接單記錄']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$i18n.getOrdersList['没有更多了']"
            @load="onLoad"
            >
                <router-link 
                class="order" 
                :to="`/getOrdersDetail/${item.id}`" tag="div"
                v-for="item in list" :key="item.id">
                    <div>
                        <p>
                            <span>{{ $i18n.getOrdersList['編號'] }} : </span>
                            <span>{{item.orderSn}}</span>
                        </p>
                        <p>
                            <span>{{ $i18n.getOrdersList['收款總額'] }} : </span>
                            <span>{{item.incomeTotal}}</span>
                        </p>
                        <p>
                            <span>{{ $i18n.getOrdersList['流水匯總'] }}</span>
                            <span>{{item.streamTotal}}</span>
                        </p>
                        <p>
                            <span>{{ $i18n.getOrdersList['原始額度'] }}</span>
                            <span>{{item.originMoney}}</span>
                        </p>
                        <p>
                            <span>{{ $i18n.getOrdersList['返還額度'] }}</span>
                            <span>{{item.rebackMoney}}</span>
                        </p>
                    </div>
                    <div>
                        <img src="@/assets/images/orderStatus/wancheng.png">
                    </div>
                </router-link>
            </van-list>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'getOrders',
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1
        }
    },
    methods: {
        async onLoad() {
            let res = await $ajax('getOrdersList',{
                page: this.page
            })
            this.page++
            // console.log(res)
            this.list.push(...res)
            // 加载状态结束
            this.loading = false
            if (res.length === 0) {
                this.finished = true //加载完成
            } 
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#main {
    padding: 1rem;
    padding-top: calc(50px + 1rem);
    box-sizing: border-box;
    p {
        margin: 0;
    }
    .order {
        .flex;
        justify-content: space-between;
        align-items: center;
        background-image: url(../../assets/images/ordersBg.png);
        background-size: 100% 100%;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        box-sizing: border-box;
        margin-bottom: 1rem;
        img {
            height: 4rem;
            width: 4rem;
        }
        > div:first-child {
            > p:first-child > span:nth-child(2) {
                font-size: 0.85rem;
            }
        }
    }
}
</style>