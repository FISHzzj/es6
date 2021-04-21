<template>
    <div id="recharge">
        <van-nav-bar
        :title="$i18n.recharge['充幣']"
        left-arrow
        fixed
        :right-text="$i18n.recharge['充幣記錄']"
        @click-left="$router.back(-1)"
        @click-right="$router.push({name:'rechargeList'})"
        />
        <!-- <div id="QRBox">
            <img :src="QRImg" >
        </div> -->
        <div id="address">
            <p>{{ $i18n.recharge['充幣地址'] }}</p>
            <p>
                <a :href="addressdata">{{addressdata}}</a>
            </p>
            <p>
                <van-button type="info" :data-clipboard-text="address" class="copy">{{ $i18n.recharge['複製地址'] }}</van-button>
            </p>
            <div class="mony_box">
                <span class="mony_span">金额</span>
                <input type="text" class="mony_input" placeholder="请输入金额" v-model="mony_tex">
            </div>
            <div>
                <van-uploader
                v-model="fileList"
                :max-count="3"
                :before-read="beforeRead"
                upload-text="上传充值凭证" />
            </div>
            <div class="ti_up">
                <van-button type="info" :data-clipboard-text="address" @click.prevent="send()">提交</van-button>
            </div>
            <!-- <div class="" v-html="notice"></div> -->
        </div>
        <div id="warn" v-html="notice"></div>
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
        }
    },
    methods: {
        async getData () {
            let res = await $ajax('recharge',{})
            // console.log(res)
            Object.keys(res).forEach( key => {
                this[key] = res[key] || ''
            })
        },
        beforeRead(file) {
            let fileSize = file.size // 獲取文件 大小
            if (this.fileList.length > 2) {
                Dialog.alert({
                    message: this.$i18n.feedback['不得超過3張圖片']
                })
                return false
            }
            // 遍歷 已經存在的文件, 將 文件的 尺寸進行相加, 如果超出 10M, 則不予渲染
            this.fileList.some( item => {
                let {size} = item.file //獲取文件尺寸
                fileSize+=size
            })
            if (fileSize > 10485760) {
                Dialog.alert({
                    message: this.$i18n.feedback['圖片上傳總大小, 不可超過 10M']
                })
                return false
            }
            return true
        },
        // 發送
        async send () {
            let { feedback } = this.$i18n

           let {fileList, feedbackType, message,mony_tex} = this
            // console.log(fileList)
            // console.log(feedbackType)
            // console.log(message)
            let requests = []
            fileList.forEach( item => {
                let request = $ajax('uploader', {
                    img: item.file,
                    file: 'img'
                })
                requests.push(request)
            })
            // 並發 上傳 圖片
            let imgUrls = await Promise.all(requests)
            console.log(imgUrls)
            console.log(mony_tex)
            // 遍歷 查看 imgeUrls 是否 存在 上傳失敗的
            let hasErr = imgUrls.some( item => {
                if (!item) return true
            })
            // 如果 存在 上傳失敗的, 則 終止函數執行
            if (hasErr) return false
            let res = await $ajax('applyFeedback',{
               gold:mony_tex,
              thumb:imgUrls,
            })
            if (!res) return false
            this.sendClick = false //設置爲 false, 不可重複提交
            Dialog.alert({
                message: res.msg
            })
            this.$router.back(-1)
        },

    },
    created () {
        this.getData()
    },
    mounted () {
        //傳遞複製按鈕選擇器, 接受複製插件的 clipboard 實例
        this.clipboard = copy('.copy')
    },
    computed: {
        addressdata() {
            let add = this.address
            if(add) {
                //判断是否符合http://符合返回真不符合返回假
                let http = /^http:\/\/.*/i.test(add);
                //判断是否符合https://符合返回真不符合返回假
                let https = /^https:\/\/.*/i.test(add);
                //如果两个都为假，我们就为客户添加http://
                if (!http && !https) {
                    return 'https://' + add;
                }
            }
        }
    },
    beforeDestroy () {
        this.clipboard.destroy() //執行銷毀複製實例
    },
    // 上傳圖片

}
</script>
<style lang="less" scoped>
#recharge {
    background-color: #f9f9f9;
    box-sizing: border-box;
    div {
        background-color: #fff;
    }
    p {
        margin: 0;
    }
    * {
        box-sizing: border-box;
    }
}
#QRBox {
    height: 20vh;
    text-align: center;
    padding: 1rem 0;
    margin-top: 50px;
    img {
        height: 100%;
    }
}
#address {
    width: 100%;
    padding: 0 1rem;
    padding-bottom: 2rem;
    margin-top: 50px;
    p {
        width: 100%;
       height: 30px;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
        position: relative;
        button {
            width: 25%;
            height: 30px;
            position: absolute;
            right: 0;
        }
        span{
            width: 100%;
            height: 30px;
            line-height: 30px;
            position: absolute;
            left: 0;
            top: 0;
            // color: red;
        }
        a{
            color: #999;
        }
    }
    .ti_up{
        width: 100%;
        button{
            width:  100%;
        }
    }
    .mony_box{
        width: 100%;
        height: 2.5rem;
        font-size: .8rem;
        border-bottom: 1px solid #f2f2f2;
        margin-bottom: 1rem;
        .mony_span{
            width: 20%;
            // height: 100%;
            text-align: center;
            display: inline-block;
        }
        .mony_input{
            width: 60%;
            height: 100%;
            // padding-left: 2rem;
            border: none;
            outline: none;
        }
    }
    p:first-child {
        color: #999;
    }
    p:nth-child(2) {
        overflow-y: hidden;
        height: 1.3rem;
        > span {
            display: block;
            padding-bottom: 10px;
            overflow-x: scroll;
            width: 100%;
        }

    }
    p:not(:last-child) {
        margin-bottom: 1rem;
    }
}
#recharge #warn {
    background-color: #f9f9f9;
    padding: 0 1rem;
    font-size: 0.9rem;
    h4 {
        margin: 10px 0;
    }
    p {
        color: #e8d08c;
    }
}
</style>