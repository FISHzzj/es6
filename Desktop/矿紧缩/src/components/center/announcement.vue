<template>
    <div id="announcement">
        <van-nav-bar
        :title="$i18n.announcement['動態分享']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div class="main">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$i18n.announcement['没有更多了']"
            @load="onLoad"
            >
                <router-link class="list" 
                :to="`/announcementDetail/${item.id}`" tag="div"
                v-for="item in list" :key="item.id">
                    <p>{{ item.title }}</p>
                    <p>
                        {{ item.createtime }}
                        <i class="iconfont iconright"></i>
                    </p>
                </router-link>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name: 'announcement',
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
            let res = await $ajax('announcement', {
                page: this.page
            })
            if(!res) return false
            // console.log(res)
            this.list.push(...res)
            this.page++
            this.loading = false
            if (res.length === 0) {
                this.finished = true
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
.main {
    padding: 0 1rem;
    margin-top: calc(50px + 1rem);
    p {
        margin: 0;
    }
    .list {
        .flex;
        justify-content: space-between;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        > p:nth-child(2) {
            color: #999;
            font-size: 0.85rem;
        }
    }
}
</style>