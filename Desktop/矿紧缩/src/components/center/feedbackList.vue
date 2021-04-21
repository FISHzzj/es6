<template>
    <div id="feedbackList">
        <van-nav-bar
        :title="$i18n.feedbackList['反饋列表']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$i18n.feedbackList['没有更多了']"
            @load="onLoad"
            >
                <div class="item" v-for="(item, index) in list" :key="index">
                    <p>
                        <span>{{ $i18n.feedbackList['類型'] }} :</span>
                        <span>{{ item.type }}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.feedbackList['時間'] }} :</span>
                        <span>{{ item.time }}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.feedbackList['反饋內容'] }} :</span>
                        <span>{{ item.content }}</span>
                    </p>
                    <p>
                        <img :src="ele"  v-for="(ele, index) in item.images" :key="index">
                    </p>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name: 'feedbackList',
    data() {
        return {
            page: 1,
            list: [],
            loading: false,
            finished: false
        }
    },
    methods: {
        async onLoad () {
            let res = await $ajax('feedbackList', {
                page: this.page
            })
            if (!res) return false
            this.page++
            this.loading = false
            // console.log(res)
            this.list.push(...res)
            // 如果長度 小於0, 則不再加載
            if ( res.length <= 0 ) {
                this.finished = true
            }
        },
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#main {
    margin-top: 50px;
    padding: 0 1rem;
}
.item {
    border-bottom: 1px solid #f1f1f1;
    > p {
        span:nth-child(2) {
            color: #999;
            font-size: 0.85rem;
        }
    }
    > p:nth-child(3) {
        .flex;
        flex-direction: column;
        > span:nth-child(2) {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            line-height: 1.5rem;
        }
    }
    > p:last-child {
        img {
            margin-right: 2%;
        }
    }
    img {
        width: 30%;
    }
}
</style>