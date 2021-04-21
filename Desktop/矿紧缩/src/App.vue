<template>
    <div id="app">

        <transition :name="names">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Test from './components/test.vue'
export default {
    name: 'App',
    watch: {
        $route (to, from){
            // 小于 则为 返回原页面， 大于 则为 进入新页面
            if (to.meta.index < from.meta.index) {
                this.names="right" //返回原页面
            } else if (from.meta.index === undefined || to.meta.index === from.meta.index) {
                this.names="" //什么都没有发生, 默认
            } else {
                this.names="left" // 进入新页面
            }
        }
    },
    data(){
        return{
            names:'left',
            active: 0,
        }
    },
    components : {
        Test
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.line {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.line2 {
     text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
#app > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    height: 100vh;
    background-color: #fff;
}
/* 过度动画 */
/* 进入 新页面 */
.left-enter {
    transform:translateX(100%);
}
.left-enter-to {
    transform:translateX(0);
}
.left-enter-active {
    transition: 0.4s;
}
.left-leave-to {
    transform:translateX(-100%);
}
.left-leave-active {
    transition: 0.4s;
}

/* 进入原页面*/
.right-enter {
    transform:translateX(-100%);
}
.right-enter-to {
    transform:translateX(0);
}
.right-enter-active{
    transition: 0.4s;
}
/* 开始便是此处， 可去除 */
/* .right-leave {
    transform:translateX(0);
} */
.right-leave-to {
    transform:translateX(100%);
}
.right-leave-active {
    transition: 0.4s;
}
.flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
}
.flex_between {
    justify-content: space-between;
    -webkit-justify-content: space-between;
}
.flex_around {
    justify-content: space-around;
    -webkit-justify-content: space-around;
}
.ali_center {
    align-items: center;
    -webkit-align-items: center;
}
input {
    outline: none;
    background: transparent;
    border: none;
}
</style>
