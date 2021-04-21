<template>
    <div id="rechargeList">
        <van-nav-bar
        :title="$i18n.rechargeList['充幣記錄']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="listBox">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$i18n.rechargeList['没有更多了']"
            @load="onLoad"
            >
            <!--  -->
                <Item v-for="item in list" :key="item.id">
                    <p>
                        <!-- <i class="iconfont iconchangyongtubiao-mianxing-1 blue"></i> -->
                        <img style="height:2rem;" src="@/assets/images/icon/right.png" alt="">
                    </p>
                    <p>
                        <span>{{item.address}}</span>
                        <span>{{item.time}}</span>
                    </p>
                    <p class="blue" v-if="item.status==1">
                        {{item.money}}USDT
                    </p>
                    <p class="blue" v-else>充值失败</p>
                </Item>
            </van-list>
            
        </div>
    </div>
</template>

<script>
import Item from '@/components/common/item'

export default {
    name: 'rechargeList',
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
            let res = await $ajax('rechargeList', {
                page: this.page
            })
            this.page++
            if (!res) return false
            console.log(res)
            this.list.push(...res) //往數組中添加數據
            this.loading = false //暫停加載
            // 如果長度爲0, 則沒有下一頁了
            if (res.length <= 0) {
                this.finished = true
            }
        },
        // 跳转 页面
        jumpPage (id) {
            console.log(id)
        }
    }
}
</script>
<style lang="less" scoped>
#listBox {
    margin-top: calc(50px + 1rem);
}
</style>