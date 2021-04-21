<template>
    <div class="changename">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>充值状态</p>
            <span @click="$router.go(-1)">完成</span>
        </div>
        <div class="top flex ali_center">
            <img src="@/assets/images/icon/jyjl.png" alt="" />
            <div class="status success">{{log.statusText}}</div>
            <!-- <div class="status fail">充值失败</div> -->
            <div class="tips">充值失败，请核实充值信息后再次提交充值，如有疑问请联系哈希矿场客服</div>
            <div class="tips">资金预估在1小时内到达帐户，非工作时间，到账时间可能会有延迟，如有疑问请联系哈希矿场平台客服</div>
        </div>
        <div class="content">
            <div class="item flex ali_center flex_between">
                <div class="left">充值流水号</div>
                <div class="right">{{log.ordersn}}</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">充值金额(CNY)</div>
                <div class="right num">464165561312</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">实付金额(元)</div>
                <div class="right num">464165561312</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">付款方式</div>
                <div class="right">{{}}</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">付款方信息</div>
                <div class="right">{{sysWallet.realname}}</div>
            </div>
            <div class="item flex ali_center flex_between">
                <div class="left">创建时间</div>
                <div class="right">{{log.createtime}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "recordDetail",
    data() {
        return {
            nickname_1: "",
            id: "",
            log: null,
            sysWallet: null,
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getData()
    },
    methods: {
        async getData() {
            let res = await $ajax('rechargegetCre', {lid: this.id})  //充值
            if(!res) return false
            // this.money = res.money
            this.log = res.log
            this.sysWallet = res.sysWallet
        },
    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.changename {
    background: #f7f7f7 !important;
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
        span {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 4vw;
            font-size: 3.47vw;
            margin: auto 0;
            color: #da428d;
            line-height: 12vw;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .top {
        flex-direction: column;
        padding: 0 7vw;
        text-align: center;
        img {
            width: 20vw;
            height: 20vw;
        }
        .success {
            color: #da428d;
            font-size: 4.5vw;
            line-height: 8vw;
            font-weight: 600;
        }
        .fail {
            font-size: 4.5vw;
            line-height: 8vw;
            font-weight: 600;
            color: #fc4142;
        }
        .tips {
            color: #999;
            font-size: 3.2vw;
        }
    }
    .content {
        padding: 4vw;
        border-top: 1px solid #f7f7f7;
        .item {
            height: 12vw;
            .left {
                color: #777;
                font-size: 3.73vw;
            }
            .right {
                color: #000;
                font-weight: 600;
                font-size: 3.47vw;
                &.num {
                    color: #da428d;
                }
            }
        }
    }
}
</style>