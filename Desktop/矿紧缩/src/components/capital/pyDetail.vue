<template>
    <div id="pyDetail">
        <van-nav-bar
        :title="$i18n.pyDetail['交易詳情']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <p>{{ $i18n.pyDetail['接單傭金'] }}</p>
            <p>
                <span>{{ $i18n.pyDetail['數量'] }}</span>
                <span>1.56000 USDT</span>
            </p>
            <p>
                <span>{{ $i18n.pyDetail['創建時間'] }}</span>
                <span>2019-09-17 05:12</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pyDetail',
    data() {
        return {
            list: []
        }
    },
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#pyDetail {
    background-color: #f4f4f4;
}
#main {
    margin: 1rem;
    margin-top: calc(50px + 1rem);
    background-color: #fff;
    border-radius: 10px;
    padding: 1rem 1rem;
    > p {
        margin: 0;
        padding: 1rem 0;
    }
    > p:first-child {
        text-align: center;
        margin-bottom: 0.7rem;
        padding: 0;
        font-size: 1.1rem;
        color: #02c186;
    }
    > p:nth-child(2) {
        border-bottom: 1px solid #eee;
    }
    > p:not(:first-child) {
        .flex;
        justify-content: space-between;
        > span:first-child {
            color: #999;
        }
    }
}
</style>