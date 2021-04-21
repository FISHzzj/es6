<template>
    <div class="feedback">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>意见反馈</p>
        </div>
        <div class="title flex ali_center flex_between">
            <div class="left">反馈建议</div>
            <div class="right">{{num}}/200</div>
        </div>
        <div class="uploader img">
            <textarea maxlength="200" v-model="content" name="" id="content" cols="30" rows="10" placeholder="请填写10字以上的问题描述，以便我们更好的帮助您解决问题"></textarea>
            <van-uploader :after-read="afterRead" v-if="!baseimg"  />
            <img :src="baseimg" alt="" v-if="baseimg" >

        </div>
        <div class="touch">
            <div class="title1">联系方式(选填)</div>
            <input type="text" placeholder="请填写您的手机号或邮箱，便于我们与您联系" v-model="touch">
        </div>
        <div class="submit" @click="sumbit">提交</div>
    </div>
</template>
<script>
export default {
    name: "feedback",
    data() {
        return {
            num: 0,
            touch: "",
            content: "",
            baseimg: "",
        };
    },
    watch: {
        content(e) {
            this.num = e.length;
        }
    },
    mounted() {
        
    },
    methods: {
        async afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            this.baseimg = file.content
            let res = await $ajax('userrechargeimages', {image: file.content})
            if(!res) return false
            this.baseimg = res.img
            
        },
        async sumbit() {
            if(!this.baseimg) Toast('请上传图片')
            if(!this.content) Toast('请输入内容')
            let res = await $ajax('userfeedback', {
                 image: this.baseimg,
                 content: this.content,
                 mobile: this.touch
            })
            if(!res) return false
            Toast(res.msg)
            this.$router.go(-1)
        }
    },
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.feedback {
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        position: relative;
        background: #fff;
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
    .title {
        background: #fff;
        padding: 0 4vw;
        height: 12vw;
    }
    #content {
        width: 92vw;
        height: 55vw;
        border: 0;
        outline: none;
    }
    .uploader {
        width: 100vw;
        background: #fff;
        padding: 2vw 4vw;
    }
    .img{
        position: relative;
        img{
            width: 80px;
            height: 80px;
        }
    }
    .touch {
        width: 100%;
        padding: 0 4vw 2vw;
        background: #fff;
        margin: 3vw 0 8vw;
        .title1 {
            color: #333;
            font-size: 4vw;
            font-weight: 600;
            line-height: 12vw;
        }
        input {
            width: 100%;
            line-height: 12vw;
        }
    }
    .submit {
        background: #da428d;
        color: #fff;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        border-radius: 6vw;
        width: 92vw;
        margin: 0 4vw;
    }
}
</style>