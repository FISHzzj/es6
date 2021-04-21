<template>
    <div class="content">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>服务协议</p>
        </div>
        <div v-html="content">

        </div>
        
    </div>
</template>
<script>
export default {
    name: "content",
    data() {
        return {
            id: 0,
            custMobile: "",
            wechat_name: "",
            content: "",
            wechat_img: ""
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        console.log(this.id);
        this.getlist()
    },
    methods:{
         async getlist(){
            let res = await $ajax('userfeedbacklook', {})
            if (!res) return false
            this.custMobile = res.custMobile
            this.wechat_name = res.wechat_name
            this.content = res.content
            this.wechat_img = res.wechat_img
            
        },
    }
};
</script>
<style lang="less" scoped>
.content {
    .header {
        width: 100%;
        height: 12vw;
        position: relative;
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
}
</style>