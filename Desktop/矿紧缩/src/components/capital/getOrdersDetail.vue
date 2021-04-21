<template>
    <div id="getOrdersDetail">
        <van-nav-bar
        :title="$i18n.getOrdersDetail['接單詳情']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <div class="order">
                <div>
                    <p>
                        <span>{{ $i18n.getOrdersDetail['時間'] }} : </span>
                        <span>{{head.time}}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.getOrdersDetail['本次退回額度'] }} : </span>
                        <span>{{head.rebackMoney}}</span>
                    </p>
                </div>
            </div>
            <div class="order" v-for="item in list" :key="item.id">
                <div>
                    <p>
                        <span>{{ $i18n.getOrdersDetail['時間'] }} : </span>
                        <span>{{ item.time }}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.getOrdersDetail['原始額度'] }} : </span>
                        <span>{{ item.originMoney }}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.getOrdersDetail['傭金'] }}</span>
                        <span>{{ item.commission }}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.getOrdersDetail['本次返還額度'] }}</span>
                        <span>{{ item.rebackMoney }}</span>
                    </p>
                </div>
                <div>
                    <img src="@/assets/images/orderStatus/wancheng.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'getOrdersDetail',
    props: ['id'],
    data () {
        return {
            list: [],
            head: {},
        }
    },
    created () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('getOrdersDetail', { id: this.id })
            if (!res) return false
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
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
    margin-top: 50px;
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