<template>
    <div class="paypwd" v-if="show">
        <div class="mask" @click="close"></div>
        <div class="content">
            <div class="top flex ali_center">
                <van-icon @click="close" name="arrow-down" />
            </div>
            <div class="title">交易密码</div>
            <div class="flex input ali_center flex_between">
                <input v-model="pwd" type="text" placeholder="输入资金密码" />
                <div class="btn" @click="submit">确定</div>
            </div>
            <div class="forget">忘记密码?</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "paypwd",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            pwd: "",
            // status: "",
        };
    },
    methods: {
        async submit() {
            if (!this.pwd) return Toast("请输入交易密码");
             let res = await $ajax('useruserInfopwd2', {
                 pwd: this.pwd
            })
            if (!res) return false
            Toast(res.msg)
            // this.status = res.status
            if(res.status == 1){
                this.$emit("noticehandle", {status: 1 })
            }
            
        },
   
        close() {
            this.$emit("close", true);
        },
    }
};
</script>
<style lang="less" scoped>
.paypwd {
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1002;
        background: rgba(0,0,0,0.3);
    }
    .content {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 92vw;
        padding: 2vw 4vw;
        z-index: 1002;
        background: #fff;
        border-radius: 3vw 3vw 0 0;
        .top {
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
                width: 60vw;
                height: 10vw;
                line-height: 10vw;
                border-bottom: 1px solid #eee;
                ::-webkit-input-placeholder{
                    color: #999;
                }
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
        .forget {
            color: #da428d;
            font-size: 3.47vw;
            line-height: 12vw;
        }
    }
}
</style>