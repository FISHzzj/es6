<template>
    <div class="record">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>缴费记录</p>
        </div>
        <div class="list">
            <div class="item">
                <div class="top flex ali_center flex_between">
                    <div class="left">0.00USDT</div>
                    <div class="right">60天周期</div>
                </div>
                <div class="bottom top flex ali_center flex_between">
                    <div class="left">到期日：2020-202-20</div>
                    <div class="right">状态<span>已结束</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "feeRecord",
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.record {
    .header {
        width: 100%;
        height: 12vw;
        background: #fff;
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
        padding: 4vw;
        .item {
            border-bottom: 1px solid #f7f7f7;
            .top {
                height: 12vw;
            }
            .bottom {
                height: 8vw;
                font-size: 3.2vw;
                color: #999;
                .right {
                    span {
                        color: blue;
                    }
                }
            }
        }
    }
}
</style>