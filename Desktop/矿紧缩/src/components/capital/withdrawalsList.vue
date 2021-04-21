<template>
    <div id="withdrawalsList">
        <van-nav-bar
        :title="$i18n.withdrawalsList['提幣記錄']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="listBox">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$i18n.withdrawalsList['没有更多了']"
            @load="onLoad"
            >
                <Item :to="`/detail/2/${item.id}`" v-for="item in list" :key="item.id">
                    <p>
                        <!-- <i class="iconfont iconchangyongtubiao-mianxing- green"></i> -->
                        <img style="height:2rem;" src="@/assets/images/icon/right.png" alt="">
                    </p>
                    <p>
                        <span>{{item.address}}</span>
                        <span>{{item.time}}</span>
                    </p>
                    <p class="green">
                        {{item.money}}USDT
                    </p>
                </Item>
            </van-list>
        </div>
    </div>
</template>

<script>
import Item from '@/components/common/item'

export default {
    name: 'withdrawalsList',
    components: {
        Item
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
        }
    },
    methods: {
        async onLoad() {
            let res = await $ajax('withdrawalsList', {
                page: this.page
            })
            this.page++
            if (!res) return false
            // console.log(res)
            this.list.push(...res) //往數組中添加數據
            this.loading = false //暫停加載
            // 如果長度爲0, 則沒有下一頁了
            if (res.length <= 0) {
                this.finished = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
#listBox {
    margin-top: calc(50px + 1rem);
}
</style>