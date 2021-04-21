<template>
    <div id="pyList">
        <van-nav-bar
        :title="$i18n.pyList['交易記錄']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="listBox">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$i18n.pyList['没有更多了']"
            @load="onLoad"
            >
                <Item v-for="(item, index) in list" :key="index">
                    <p>
                        <!-- <i :class="['iconfont', `${item.money > 0 ? 'blue' : 'green'}`, 
                        `${item.money > 0 ? 'iconchangyongtubiao-mianxing-1' : 'iconchangyongtubiao-mianxing-'}`]"></i> -->
                        <img v-if="item.money > 0" style="height:2rem;" src="@/assets/images/icon/right.png" alt="">
                        <img v-if="item.money <= 0" style="height:2rem;" src="@/assets/images/icon/left.png" alt="">
                    </p>
                    <p>
                        <span>{{ item.typeName }}</span>
                        <span>{{ item.time }}</span>
                    </p>
                    <p class="blue">
                        {{ item.money > 0 ? `+${item.money} USDT` : `${item.money} USDT` }}
                    </p>
                </Item>
            </van-list>
        </div>
    </div>
</template>

<script>
import Item from '@/components/common/item'

export default {
    name: 'pyList',
    components: {
        Item
    },
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
            let res = await $ajax('pyList', {
                page: this.page
            })
            if (!res) return false
            this.page++
            this.list.push(...res)
            this.loading = false
            if (res.length === 0) {
                this.finished = true
            }
        },
    }
}
</script>
<style lang="less" scoped>
#listBox {
    margin-top: calc(50px + 1rem);
}
</style>