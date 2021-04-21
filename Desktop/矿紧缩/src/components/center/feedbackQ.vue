<template>
    <div id="recharge">
        <van-nav-bar
        title="联系我们"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        @click-right="$router.push({name:'rechargeList'})"
        />
        
        <div class="qq_box">
            <div class="qq_div">
                <p class="qq_hao">QQ：{{qq_gir}}</p>
                <button :data-clipboard-text="qq_gir" class="copy">复制</button>
            </div>
        </div>
        <!-- <div id="warn" v-html="notice"></div> -->
    </div>
</template>

<script>
 // 複製模塊
import {copy} from '../../func/copy'

export default {
    name: 'recharge',
    data() {
        return {
            QRImg: '',
            address: '',
            notice: '',
            fileList: [],
            mony_tex:"",
            qq_gir:""
        }
    },
    methods: {
        async getData () {
            let res = await $ajax('get_qq',{})
            console.log(res)
            this.qq_gir = res.msg
        },
       
        
        
    },
    created () {
        this.getData()
    },
    mounted () {
        //傳遞複製按鈕選擇器, 接受複製插件的 clipboard 實例
        this.clipboard = copy('.copy')
    },
    beforeDestroy () {
        this.clipboard.destroy() //執行銷毀複製實例
    },
    // 上傳圖片
    
}
</script>
<style lang="less" scoped>

.qq_box{
    width: 100%;
    height: 500px;
    margin-top: 46px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    .qq_div{
        text-align: center;
        button{
         width: 100px;
         height: 44px;
         background: #1989fa;
         border:none;
         outline: none;
         color: #fff;
         font-size: 14px;
         border-radius: 5px;
        }
    }
    .qq_hao{
        text-align: center
    }
}
</style>