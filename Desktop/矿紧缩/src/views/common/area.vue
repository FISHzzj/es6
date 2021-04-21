<template>
    <div class="area1" v-if="showArea">
        <div class="header">
            <van-icon @click="showArea = false" name="arrow-left" size="20" />
            <p>选择地区</p>
        </div>
        <div class="list">
            <div @click="change(item)" v-for="(item, index) in list" :key="index" class="flex item flex_between ali_center">
                <span class="name">{{item.name}}</span>
                <span class="num">{{item.num}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        showArea: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            list: [
                {name: '中国', num: '+86'},
                {name: '中国香港', num: '+852'},
                {name: '中国台湾', num: '+886'},
                {name: '中国澳门', num: '+853'},
                {name: '美国', num: '+1'},
                {name: '俄罗斯', num: '+7'},
                {name: '新加坡', num: '+65'},
                {name: '泰国', num: '+66'},
                {name: '马来西亚', num: '+60'},
                {name: '韩国', num: '+82'},
                {name: '日本', num: '+81'},
                {name: '英国', num: '+44'},
                {name: '德国', num: '+49'},
                {name: '加拿大', num: '+1'}
            ]
        };
    },
    methods: {
        change(e) {
            this.$emit('change', e);
        }
    }
}
</script>
<style lang="less" scope>
.area1 {
    background: #fff;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
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
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .list {
        .item {
            height: 10vw;
            padding: 0 4vw;
        }
    }
}
</style>