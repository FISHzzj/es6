<template>
    <div class="about">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>关于我们</p>
        </div>
        <div class="logo_version">
            <img src="@/assets/images/home/laba.jpg" alt="" />
            <div class="version">V4.3.0</div>
        </div>
        <div class="list">
            <a href="tel:110" class="item flex flex_between ali_center">
                <div class="left">客服电话</div>
                <div class="right flex ali_center">
                    <span>{{custMobile}}</span>
                    <van-icon name="arrow" color="#999" />
                </div>
            </a>
            <!-- <div class="copy item flex flex_between ali_center" data-clipboard-text="0000000">
                <div class="left">微信公众号</div>
                <div class="right flex ali_center">
                    <span>110</span>
                    <van-icon name="arrow" color="#999" />
                </div>
            </div> -->
            <div @click="showService = true" class="item flex flex_between ali_center">
                <div class="left">添加客服微信号</div>
                <van-icon name="arrow" color="#999" />
            </div>
            <div class="item flex flex_between ali_center" @click="$router.push('/content')">
                <div class="left">服务协议</div>
                <van-icon name="arrow" color="#999" />
            </div>
        </div>
        <service
            :showService="showService"
            @close="closeservice"
        ></service>
    </div>
</template>
<script>
import service from "./common/service";
import {copy} from '../func/copy';
export default {
    name: "about",
    components: {
        service,
    },
    data() {
        return {
            showService: false,
            custMobile: "",
            wechat_name: "",
            content: "",
            wechat_img: ""


        };
    },
    mounted() {
        this.clipboard = copy('.copy');
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
        closeservice(e) {
            this.showService = false;
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.about {
    .logo_version {
        text-align: center;
        padding: 8vw 0 15vw;
        img {
            width: 25vw;
            height: 25vw;
        }
    }
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
    .list {
        .item {
            padding: 0 4vw;
            height: 15vw;
            border-bottom: 1px solid #eee;
            .left {
                color: #333;
                font-size: 3.47vw;
                font-weight: 600;
            }
            span {
                color: #999;
                font-size: 3.2vw;
            }
        }
    }
}
</style>