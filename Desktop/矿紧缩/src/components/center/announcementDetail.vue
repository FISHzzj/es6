<template>
    <div id="detai">
        <van-nav-bar
        :title="$i18n.announcementDetail['動態詳情']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main" v-html="content"></div>
    </div>
</template>

<script>
export default {
    name: 'detai',
    props: ['id'],
    data() {
        return {
            content: ''
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('announcementDetail', {
                id: this.id
            })
            if (!res) return false
            this.content = res.content
        }
    }
}
</script>
<style lang="less" scoped>
#main {
    margin-top: 50px;
}
</style>