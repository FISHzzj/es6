<template>
    <div class="login">
        <div class="header flex ali_center">
            <van-icon @click="goback" name="cross" size="20" />
        </div>
        <div class="title">
            <div class="first">设置密码</div>
            <div class="second flex ali_center">
                <van-icon name="warning-o" color="#999" size="16" />
                <span>密码由8-16位数字、字母任意组合</span>
            </div>
        </div>
        <div class="content">
            <div class="title1">1.设置登录密码</div>
            <div class="pwd">
                <input v-if="iconeyeclose" type="text" v-model="pwd" placeholder="请设置登录密码">
                <input v-else type="password" v-model="pwd" placeholder="请设置登录密码">
                <i @click="iconeyeclose = !iconeyeclose" v-if="iconeyeclose" class="iconfont iconeyeopen"></i>
                <i @click="iconeyeclose = !iconeyeclose" v-else class="iconfont iconeyeclose"></i>
                <van-icon v-if="pwd" @click="pwd = ''" name="cross" color="#fff" size="10" />
            </div>
            <div class="title1">2.设置交易密码</div>
            <div class="pwd">
                <input v-if="iconeyeclose1" type="text" v-model="pwd1" placeholder="请设置交易密码">
                <input v-else type="password" v-model="pwd1" placeholder="请设置交易密码">
                <i @click="iconeyeclose1 = !iconeyeclose1" v-if="iconeyeclose1" class="iconfont iconeyeopen"></i>
                <i @click="iconeyeclose1 = !iconeyeclose1" v-else class="iconfont iconeyeclose"></i>
                <van-icon v-if="pwd1" @click="pwd1 = ''" name="cross" color="#fff" size="10" />
            </div>
            <div class="title1">3.短信验证码</div>
            <div class="code flex ali_center flex_between">
                <input v-model="code" type="text" placeholder="请输入短信验证码">
                <span @click="senVerifyCode()">{{timeAndTextOfSendcode}}</span>
            </div>
            <div class="title1">邀请码(选填)</div>
            <div class="spread">
                <input type="text" v-model="spread" placeholder="请输入邀请码" />
            </div>
            <div class="next" @click="next" :class="{on: pwd && pwd1 && code }">完成</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            flag: false,
            iconeyeclose: false,
            timeAndTextOfSendcode: "发送验证码",
            iconeyeclose1: false,
            pwd: "",
            pwd1: "",
            code: "",
            spread: "",
            mobile: '',
            showArea: false,
            area: '+86',
            
        };
    },
    created() {
        this.mobile = this.$route.query.mobile;
        this.spread = this.$route.query.inviteCode || ""
        console.log(this.mobile);
    },
    methods: {
        timing () {
            this.timer = setInterval( () => {
                this.timeAndTextOfSendcode--
                if (this.timeAndTextOfSendcode <= 0) {
                    clearInterval(this.timer)
                    this.timeAndTextOfSendcode = '发送验证码'
                }
            }, 1000)
        },
        // 发送验证码
        async senVerifyCode () {
            // let { register } = this.$i18n
            if ( this.timeAndTextOfSendcode !== '发送验证码') return false
            if (!this.mobile) return Toast( '请输入手机号')
            let res = await $ajax('accountverifycode',{
                mobile: this.mobile,
                // temp: 'sms_reg'
            })
            if (!res) return false
            Toast(res.msg)
            this.timeAndTextOfSendcode = 60
            this.timing() //執行倒計時
        },
        async next() {
            if (!this.mobile) return;
            let pwdRex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/g //驗證密碼的正則
            if (!pwdRex.test(this.pwd)) return Toast( '登录密碼(8至12位數字和字母組合)')
            console.log(this.pwd1)
            // if (!pwdRex.test(this.pwd1)) return Toast( '交易密碼(8至12位數字和字母組合)')
            if (!this.code) return Toast( '请输入短信验证码')
            // if (!this.spread) return Toast( '请输入邀请码')

             let res = await $ajax('register', {
                mobile: this.mobile,
                pwd:this.pwd,
                pwd2: this.pwd1,
                code: this.code,
                yqCode: this.spread //邀请码
            })
            if (!res) return false
            // 如果爲 非 app 進入, 則跳轉下載頁面, 並終止函數
            if ( sessionStorage.getItem('noApp') ) {
                // alert(222)
                window.location.href = 'https://downloadpkg.app3c.cn/app/download?path=https://A6163977333456.qiniucdn.apicloud-system.com/31caecf2c21c7b3f9bba5698824a8dc0_d&ver=0.0.6&size=3.08M'
                return false
            }
            // 進行登錄 提示
			const toast = Toast.loading({
				message: '登入中...',
				forbidClick: true, // 禁用背景点击
				loadingType: 'spinner',
				position: 'bottom',
				duration: 0
            })
            // 註冊成功 直接登錄, 跳轉登錄頁面
			let loginRes = await $ajax('login',{
				mobile:this.mobile,
				pwd:this.pwd
            }, () => {
				toast.clear()
			})
            
            sessionStorage.removeItem('info') //移除 sessionStorage
            localStorage.setItem('openid', loginRes.token)
			localStorage.setItem('ip', loginRes.ip)
			localStorage.setItem('mobile', this.mobile)
            
			this.$router.push({
				path: '/login'
			}).catch((err)=>{
                console.log(err)
            });//把error 抛出来
            //  this.$router.replace({
            //         path: this.$route.path,
            //         query
            // })
            // .catch(()=>{});//把error 抛出来
            
            


            // this.$router.push({
            //     path: "/settingPwd",
            //     query: {
            //         mobile: this.mobile
            //     }
            // });

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
        .title1 {
            color: #999;
            font-size: 3.2vw;
            line-height: 12vw;
        }
        .pwd {
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
        .code {
            width: 100%;
            height: 12vw;
            border-radius: 6vw;
            background: #f7f6fc;
            input {
                text-indent: 3vw;
                height: 12vw;
                font-size: 4vw;
            }
            span {
                padding-right: 3vw;
                color: rgb(112,121,164);
            }
        }
        .spread {
            width: 100%;
            height: 12vw;
            background: rgb(235,245,254);
            border-radius: 6vw;
            input {
                width: 100%;
                height: 12vw;
                text-align: center;
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
                background: #da428d;
            }
        }
    }
}
</style>