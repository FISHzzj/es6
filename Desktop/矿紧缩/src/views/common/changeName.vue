<template>
    <div class="changename" v-if="showNickname">
        <div class="header">
            <van-icon @click="close" name="arrow-left" size="20" />
            <p>设置名字</p>
            <span @click="save">保存</span>
        </div>
        <div class="nickname">
            <input type="text" v-model="nickname_1" placeholder="">
            <van-icon v-if="nickname" @click="clear" name="cross" color="#fff" size="10" />
        </div>
        <div class="tips">最多12个字母数字或8个汉字</div>
    </div>
</template>
<script>
export default {
    name: "changename",
    props: {
        nickname: {
            type: String,
            default: ""
        },
        showNickname: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            nickname_1: "",
        }
    },
    mounted() {
        this.nickname_1 = this.nickname;
    },
    methods: {
        close() {
            this.$emit("clear", this.nickname);
            this.$emit("close", true);
        },
        clear() {
            this.$emit("clear", '');
        },
        save() {
            if (!this.nickname)
                return Toast("请输入您的昵称");
            this.$emit("clear", this.nickname_1);
            this.$emit("close", true);
        }
    }
}
</script>
<style lang="less" scoped>
.changename {
    background: #f7f7f7 !important;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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
        span {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 4vw;
            font-size: 3.47vw;
            margin: auto 0;
            color: #2e7df4;
            line-height: 12vw;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .nickname {
        width: 100%;
        background: #fff;
        position: relative;
        margin-top: 3vw;
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
    .tips {
        line-height: 12vw;
        padding-left: 4vw;
        color: #999;
        font-size: 3.73vw;
    }
}
</style>