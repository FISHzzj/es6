<template>
    <div class="login">
        <div class="header flex ali_center">
            <!-- <van-icon @click="goback" name="cross" size="20" /> -->
        </div>
        <div class="title">
            <div class="first">嗨!矿友们好</div>
            <div class="second">欢迎使用哈希矿场</div>
        </div>
        <div class="content">
            <div class="phone">
                <input type="number" v-model="inputMsg.mobile" placeholder="请输入手机号">
                <van-icon v-if="inputMsg.mobile" @click="inputMsg.mobile = ''" name="cross" color="#fff" size="10" />
            </div>
            <div class="pwd">
                <input v-if="iconeyeclose" type="text" v-model="inputMsg.pwd" placeholder="请输入密码">
                <input v-else type="password" v-model="inputMsg.pwd" placeholder="请输入密码">
                <i @click="iconeyeclose = !iconeyeclose" v-if="iconeyeclose" class="iconfont iconeyeopen"></i>
                <i @click="iconeyeclose = !iconeyeclose" v-else class="iconfont iconeyeclose"></i>
                <van-icon v-if="inputMsg.pwd" @click="inputMsg.mobile = ''" name="cross" color="#fff" size="10" />
            </div>
        </div>
        <div class="btn submit" @click="login">
            <!-- <section @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
                <van-icon :style="{left: posiX + 'px'}" name="arrow" color="#fff" size="30" />
            </section> -->
            <div>{{logintext}}</div>
        </div>
        <div class="footer">
            <div class="top flex ali_center">
                <span @click="forget">忘记密码</span>
                <p></p>
                <span @click="register">用户注册</span>
            </div>
            <div class="tips flex ali_center">
                <p>继续登录即代表同意</p>
                <span @click="news_detail">《哈希矿场用户协议》</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            iconeyeclose: false,
            logintext: "点击登录",
            flag: false,
            posiX: 13,
            startX: '',
            inputMsg: {
				mobile: '',
				pwd: '',
			},
        };
    },
    methods: {
        touchstart(e) {
            // console.log(e);
            this.startX = e.touches[0].screenX;
        },
        touchmove(e) {
            let posiX = e.touches[0].screenX;
            if (e.touches[0].screenX < 186) {
                this.flag = false;
                this.posiX = 13;
            } else if (e.touches[0].screenX < document.body.clientWidth * 0.7 + 60){
                this.posiX = posiX - this.startX + 13;
                this.flag = false;
            } else {
                this.posiX = document.body.clientWidth * 0.4
                this.flag = true;
            }
        },
        async login(e) {
            // console.log(e);
            // if (this.flag) { //登录接口
                // let { login } = this.$i18n
                let {mobile, pwd} = this.inputMsg
                if (!mobile || !pwd) {
                    this.posiX = 13;
                    return Toast({
                        message: '请输入账号和密码',
                        duration: 1000,
                    })
                    
                }
                if (mobile.length < 11) {
                    this.posiX = 13;
                    return Toast({
                        message: '请输入正确的手机号',
                        duration: 1000,
                    })
                }
                // 進行登錄 提示
                const toast = Toast.loading({
                    message: '登入中...',
                    forbidClick: true, // 禁用背景点击
                    loadingType: 'spinner',
                    position: 'bottom',
                    duration: 0
                })
                // 發送 ajax
                let res = await $ajax('login',{
                    mobile,
                    pwd
                }, () => {
                    toast.clear()
                })
                // 如果返回爲 false ,則中斷函數
                if (!res) return false
                
                // 保存 openid 以及 ip 到本地
                localStorage.setItem('openid', res.openid)
                // localStorage.setItem('ip', res.ip)
                localStorage.setItem('mobile', mobile)
                this.$router.push({
                    name: 'index'
                })
            // } else {
            //     this.posiX = 13;
            // }
        },
        forget() {
            this.$router.push({
                path: "/forget"
            });
        },
        register() {
            this.$router.push({
                path: "/register"
            });
        },
        news_detail() {
            this.$router.push({
                path: "/content"
            });
        },
        goback() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
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
            font-size: 5vw;
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
            input {
                width: 100%;
                height: 12vw;
                border: 0;
                text-indent: 3vw;
            }
            .van-icon {
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
        .pwd {
            margin-top: 2.4vw;
            position: relative;
            width: 100%;
            height: 12vw;
            border-radius: 6vw;
            background: #f7f6fc;
            .iconfont {
                top: 0;
                bottom: 0;
                margin: auto 0;
                right: 4vw;
                height: 4vw;
                position: absolute;
                border-radius: 50%;
            }
            .van-icon {
                top: 0;
                bottom: 0;
                margin: auto 0;
                right: 12vw;
                height: 2.5vw;
                position: absolute;
                border-radius: 50%;
                padding: 1vw;
                background: rgba(0,0,0,.3);
            }
            input {
                text-indent: 3vw;
                height: 12vw;
                font-size: 4vw;
            }
        }
    }
    .submit {
        width: 50vw;
        height: 12vw;
        margin: 10vw auto;
        border: 1px solid #da428d;
        border-radius: 6vw;
        position: relative;
        .van-icon {
            position: absolute;
            width: 8vw;
            height: 8vw;
            border-radius: 50%;
            background: #da428d;
            margin: auto 0;
            color: #da428d;
            top: 0;
            bottom: 0;
            left: 13px;
        }
        div {
            width: 100%;
            text-align: center;
            color: #da428d;
            line-height: 12vw;
        }
        &.on {
            border: 1px solid #da428d;
            .van-icon {
                background: #da428d;
            }
            div {
                color: #da428d;
            }
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        .top {
            width: 100%;
            color: #da428d;
            height: 12vw;
            font-size: 3.2vw;
            justify-content: center;
            p {
                border-right: 1px solid #da428d;
                height: 4vw;
                margin: 0 4vw;
            }
        }
        .tips {
            justify-content: center;
            font-size: 3.2vw;
            padding-bottom: 3vw;
            span {
                color: #da428d;
            }
        }
    }
}
</style>