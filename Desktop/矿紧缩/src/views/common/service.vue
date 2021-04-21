<template>
    <div class="service" v-if="showService">
        <div class="mask" @click="close"></div>
        <div class="content">
            <div class="close flex ali_center">
                <van-icon name="cross" @click="close" />
            </div>
            <div class="code">
                <img :src="wechat_img" alt="" />
            </div>
            <div class="title">
                添加哈希矿场微信客服:{{wechat_name}}
            </div>
            <div class="title1">
                如有疑问,请扫描添加客服微信随时咨询，谢谢！
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "service",
    props: {
        showService: {
            type: Boolean,
            default: true,
            custMobile: "",
            wechat_name: "",
            content: "",
            wechat_img: ""
        }
    },
    mounted(){
        this.getlist()
    },
    methods: {
        async getlist(){
            let res = await $ajax('userfeedbacklook', {})
            if (!res) return false
            this.custMobile = res.custMobile
            this.wechat_name = res.wechat_name
            this.content = res.content
            this.wechat_img = res.wechat_img
            
        },
        close() {
            this.$emit("close", true);
        }
    }
}
</script>
<style lang="less" scoped>
.service {
    .mask {
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10001;
    }
    .content {
        width: 100vw;
        height: 100vh;
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 70vw;
        height: 70vw;
        border-radius: 4vw;
        margin: auto;
        z-index: 10002;
        .close {
            height: 12vw;
            padding-right: 4vw;
            justify-content: flex-end;
        }
        .code {
            width: 100%;
            text-align: center;
            img {
                background: #000;
                width: 25vw;
                height: 25vw;
            }
        }
        .title {
            color: #333;
            font-size: 4.2vw;
            font-weight: 600;
            text-align: center;
            line-height: 15vw;
        }
        .title1 {
            color: #999;
            padding: 0 8vw;
            text-align: center;
            font-size: 3.2vw;
        }
    }
}
</style>