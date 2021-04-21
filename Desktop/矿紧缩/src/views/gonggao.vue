<template>
    <div class="gonggao">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>公告</p>
        </div>
        <div v-html="text">

        </div>
        
    </div>
</template>
<script>
export default {
    name: "gonggao",
    data() {
        return {
            id: 0,
            custMobile: "",
            wechat_name: "",
            content: "",
            wechat_img: "",
            text: "",
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        console.log(this.id);
        this.getlist()
    },
    methods:{
         async getlist(){
            let res = await $ajax('kuangnoticeText', {id: this.id})
            if (!res) return false
            this.text = res.text
            
        },
    }
};
</script>
<style lang="less" scoped>
.gonggao {
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