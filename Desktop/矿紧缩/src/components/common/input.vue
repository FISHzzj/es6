// 公共组件, 自定義 input 输入组件, 
<template>
    <label id="input" :style="setStyle || ''">
        <slot>
            <p style="color:red;margin:0;">插槽需要傳遞一個 input 標籤!</p>
        </slot>
    </label>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['setStyle']
}
</script>
<style lang="less" scoped>
input {
	outline: none;
	border: 0;
}
#input{
    display: flex;
	display: -webkit-flex;
    width: 100%;
    // height: 2rem;
    // border-bottom: 1px solid #eeeeee;
    // margin-bottom: 2rem;
    height: 3rem;
    border: 1px solid #eeeeee;
    margin-bottom: 2rem;
    border-radius: 30px;
    /* text-align: center; */
    padding: 10px 10px;
    box-sizing: border-box;
    background: #eeeeee;
    input {
        flex-grow: 1;
        text-align: center;
        background: #eeeeee;
    }
    input::-webkit-input-placeholder {
        color: #cbd4e4;
    }   
}
</style>