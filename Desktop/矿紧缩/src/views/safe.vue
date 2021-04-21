<template>
    <div class="safe">
        <div class="header">
            <van-icon @click="$router.go(-1)" color="#fff" name="arrow-left" size="20" />
            <p>账户设置</p>
        </div>
        <div class="top">
            <div class="num"><span>2</span>个可优化项</div>
            <div class="type">时刻保护您的安全</div>
        </div>
        <div class="content">
            <div @click="renzheng" class="item flex flex_between ali_center">
                <div class="left">身份认证</div>
                <div class="right flex ali_center">
                    <span class="success" >{{sf_type == 1 ? '认证成功' : '未认证'}}</span>
                </div>
            </div>
            <div @click="resetpwd(1)" class="item flex flex_between ali_center" >
                <div class="left">重置登录密码</div>
                <div class="right flex ali_center">
                    <span>重置</span>
                    <van-icon color="#999" name="arrow"></van-icon>
                </div>
            </div>
            <div @click="resetpwd(2)" class="item flex flex_between ali_center">
                <div class="left">重置交易密码</div>
                <div class="right flex ali_center">
                    <span>重置</span>
                    <van-icon color="#999" name="arrow"></van-icon>
                </div>
            </div>
            <!-- <div class="item flex flex_between ali_center">
                <div class="left">合格投资者认证</div>
                <div class="right flex ali_center">
                    <span>去设置</span>
                    <van-icon color="#999" name="arrow"></van-icon>
                </div>
            </div> -->
        </div>
        <div class="mask" v-show="showmask" @click="showmask = false"></div>
        <div class="mask_1" v-show="showmask">
            <div class="top1 flex ali_center">
                <van-icon @click="showmask = false" name="arrow-down" />
            </div>
            <div class="title">交易密码</div>
            <div class="flex input ali_center flex_between">
                <input v-model="code" type="text" placeholder="输入短信验证码" />
                <span @click="senVerifyCode()">{{timeAndTextOfSendcode}}</span>
                <div class="btn" @click="submit">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "safe",
    data() {
        return {
            showmask: false,
            code: "",
            sf_type: '',
            avatar: '',
            nickname: '',
            mobile: '',
            timeAndTextOfSendcode: "发送验证码",
        }
    },
    mounted() {
        this.mobile = localStorage.getItem("mobile")
        this.getData()
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
        async renzheng() {
            if(this.sf_type == 1){
                this.$router.push("/base")
            }else {
                this.$router.push("/user/realname")
            }
        },
        resetpwd(setType){
            this.showmask = true;
            this.setType = setType
        },
        submit() {
            if(!this.code) return Toast('请先输入验证码')
             this.$router.push({
                 name: 'changepwd',
                 query:{
                     code: this.code,
                     setType: this.setType
                 }
             })
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.safe {
    .header {
        width: 100%;
        height: 12vw;
        position: relative;
        background: #da428d;
        .van-icon {
            position: absolute;
            top: 0;
            left: 3vw;
            bottom: 0;
            height: 4vw;
            margin: auto 0;
        }
        p {
            color: #fff;
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .top {
        background: #da428d;
        color: #fff;
        width: 100%;
        font-size: 3.47vw;
        padding: 5vw 6vw 5vw;
        span {
            font-weight: 600;
            font-size: 8vw;
        }
        .type {
            margin-top: 2vw;
        }
    }
    .content {
        background: #fff;
        border-radius: 2vw 2vw 0 0;
        padding: 0 4vw;
        margin-top: -2vw;
        .item {
            height: 20vw;
            .right {
                color: #999;
                .success {
                    color: #da428d;
                }
            }
        }
    }
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1002;
        background: rgba(0,0,0,0.3);
    }
    .mask_1 {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        padding: 2vw 4vw;
        z-index: 1002;
        background: #fff;
        border-radius: 3vw 3vw 0 0;
        .top1 {
            height: 8vw;
        }
        .title {
            color: #333;
            font-size: 4vw;
            font-weight: 600;
        }
        .input {
            height: 15vw;
            input {
                width: 40vw;
                height: 10vw;
                line-height: 10vw;
                border-bottom: 1px solid #eee;
                ::-webkit-input-placeholder{
                    color: #999;
                }
            }
            span {
                color: #da428d;
                font-size: 3.47vw;
            }
            .btn {
                width: 20vw;
                height: 8vw;
                line-height: 8vw;
                color: #fff;
                border-radius: 4vw;
                text-align: center;
                background: #da428d;
            }
        }
    }
}
</style>