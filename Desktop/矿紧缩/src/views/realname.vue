<template>
    <div class="realname">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>基础认证</p>
        </div>
        <div class="tips">为了您的资金安全，需验证您的身份才可以进行其他操作，认证信息一经确认不能修改，请如实填写。</div>
        <div class="item flex ali_center">
            <div class="label">姓名：</div>
            <input type="text" v-model="realname" placeholder="请输入您的真实姓名">
        </div>
        <div class="item flex ali_center">
            <div class="label">身份证号码：</div>
            <input type="text" v-model="card_id" placeholder="请输入您的身份证号码">
        </div>
        <div class="submit" @click="tijiao">提交</div>
    </div>
</template>
<script>
export default {
    name: "realname",
    data() {
        return {
            realname: "",
            card_id: ""
        }
    },
    mounted() {
        this.getlist()
    },
    methods: {
        async getlist() {
             let res = await $ajax('userldentitybanklist', {
                requstType: "info"
            })
            if(!res) return false
            this.realname = res.realname
            this.card_id = res.card
           

        },
        async tijiao() {
            if(!this.realname) return Toast("请输入正确姓名")
            if(!this.card_id) return Toast("请输入正确身份证号码")
            let res = await $ajax('ldentity', {
                realname: this.realname,
                card: this.card_id
            })
            if(!res) return false
            Toast(res.msg)
            // console.log(res)
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.realname {
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
    .tips {
        line-height: 6vw;
        padding: 2vw 4vw;
        color: #777;
        font-size: 4.5vw;
    }
    .item {
        padding: 0 4vw;
        height: 12vw;
        background: #fff;
        .label {
            width: 30vw;
        }
    }
    .submit {
        width: 92vw;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        color: #fff;
        margin: 15vw 4vw 0;
        background: #da428d;
        border-radius: 1vw;
    }
}
</style>