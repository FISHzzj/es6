<template>
    <div class="login">
        <div class="header flex ali_center">
            <van-icon @click="goback" name="cross" size="20" />
        </div>
        <div class="title">
            <div class="first">注册</div>
            <div class="second flex ali_center">
                <van-icon name="warning-o" color="#999" size="16" />
                <span>国家和地区注册后不可更改</span>
            </div>
        </div>
        <div class="content">
            <div class="phone">
                <section class="flex ali_center">
                    <div @click="showArea = true" class="area flex ali_center">
                        <span>{{area}}</span>
                        <van-icon size="8" name="arrow-down" />  
                    </div>
                    <input type="number" v-model="mobile" placeholder="请输入手机号">
                </section>
                <van-icon v-if="mobile" @click="mobile = ''" name="cross" color="#fff" size="10" />
            </div>
            <div class="next" @click="next" :class="{on: mobile}">下一步</div>
        </div>
        <div class="footer">
            <div class="tips flex ali_center">
                <p>继续登录即代表同意</p>
                <span @click="news_detail">《哈希矿场用户协议》</span>
            </div>
        </div>
        <Area :showArea="showArea" @change="change"></Area>
    </div>
</template>
<script>
import Area from "./common/area";
export default {
    name: "Login",
    components: {
        Area
    },
    data() {
        return {
            flag: false,
            mobile: '',
            showArea: false,
            area: '+86',
            inviteCode: "",
        };
    },
    created(){
        sessionStorage.setItem('noApp', true) // 標記爲非APP進入

    },
    mounted() {
        this.inviteCode = this.$route.params.inviteCode
        console.log(this.inviteCode)
    },
    methods: {
        next() {
            if (this.mobile.length < 11) return Toast( '请输入正确的手机号')
            this.$router.push({
                name: "settingPwd",
                query: {
                    mobile: this.mobile,
                    inviteCode: this.inviteCode
                }
            });
        },
        news_detail() {
            this.$router.push({
                path: "/forget"
            });
        },
        goback() {
            this.$router.go(-1);
        },
        change(e) {
            this.area = e.num;
            this.showArea = false;
            console.log(e);
        }
    }
}
</script>
<style lang="less" scope>
.login {
    padding: 0 4vw;
    font-size: 4vw;
    .header {
        height: 10vw;
    }
    .title {
        .first {
            font-weight: 600;
            font-size: 5vw;
            line-height: 10vw;

        }
        .second {
            font-size: 4vw;
            color: #999;
        }
    }
    .content {
        margin-top: 10vw;
        .phone {
            width: 100%;
            background: #f7f6fc;
            border-radius: 6vw;
            position: relative;
            height: 12vw;
            section {
                .area {
                    width: 15vw;
                    justify-content: center;
                    span {
                        font-size: 4vw;
                    }
                    // .van-icon {

                    // }
                }
            }
            input {
                width: 100%;
                height: 12vw;
                border: 0;
                text-indent: 3vw;
            }
            > .van-icon {
                top: 0;
                bottom: 0;
                margin: auto 0;
                right: 4vw;
                height: 2.5vw;
                position: absolute;
                border-radius: 50%;
                padding: 1vw;
                background: rgba(0,0,0,.3);
            }
        }
        .next {
            width: 52vw;
            text-align: center;
            height: 12vw;
            background: #f7f6fc;
            line-height: 12vw;
            color: #fff;
            border-radius: 6vw;
            margin: 20vw auto 0;
            &.on {
                background: #da428d!important;
            }
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        .tips {
            justify-content: center;
            font-size: 3.2vw;
            span {
                color: #da428d;
            }
        }
    }
}
</style>