<template>
    <div class="item" @click="jump()">
        <slot>
            <p style="color:red;margin:0;">插槽</p>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'item',
    props: ['to'],
    methods: {
        jump () {
            if (!this.to) return false //如果 to 为 false, 则终止函数, 否則, 執行路由跳轉
            this.$router.push({
                path: this.to
            })
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
.item {
    .flex;
    align-items: center;
    margin: 0 1rem;
    margin-bottom: 0.5rem;
    padding: 12px 0.5rem;
    background-color: rgba(160, 212, 255, 0.1);
    border-radius: 10px;
    box-sizing: border-box;
    i.iconfont {
        font-size: 2rem;
    }
    > p {
        .flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 0;
        box-sizing: border-box;
        > span:not(.showAll) {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    > p:first-child {
        margin-right: 0.5rem;
    }
    > p:nth-child(2) {
        flex-grow: 1;
        > span:first-child {
            max-width: 10rem;
            overflow: hidden;
        }
        > span.showAll {
            overflow-x: scroll;
            padding: 0 5px;
        }
        > span:nth-child(2) {
            font-weight: 100;
            font-size: 0.9rem;
            color: #999;
        }
    }
    > p:last-child {
        font-weight: bold;
    }
}
</style>