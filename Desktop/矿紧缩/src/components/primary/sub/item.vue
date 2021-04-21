<template>
    <router-link class="item" :to="data.route" tag="p">
        <span>
            <i :class="['iconfont',data.icon]"></i>
        </span>
        <span>{{data.content}}</span>
        <span>
            {{data.status}}
            <i class="iconfont iconsanx-up1"></i>
        </span>
    </router-link>
</template>

<script>
/**
 * data, 有屬性四
 *   icon: 必填, string 圖標名稱
 *   content: 必填,string  顯示的文字內容
 *   route: 必填, string 路由地址
 *   status: 選填, string 狀態, 有些item需要顯示狀態
 */
export default {
    name: 'item',
    props: ['data'],
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
    > span:first-child {
        margin-right: 1rem;
        i {
            font-size: 2rem;
            color: #1989fa;
        }
    }
    > span:nth-child(2) {
        flex-grow: 1;
    }
    > span:last-child {
        color: #ccc;
    }
}
</style>