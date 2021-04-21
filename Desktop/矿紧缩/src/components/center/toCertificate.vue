<template>
    <div id="toCertificate">
        <van-nav-bar
        :title="$i18n.toCertificate['實名認證']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div class="main">
            <van-cell-group>
                <van-field v-model="inputMsg.name"
                :label="$i18n.toCertificate['姓名']"
                :placeholder="$i18n.toCertificate['姓名']" />
                <van-field v-model="inputMsg.ID"
                :label="$i18n.toCertificate['身份證號碼']"
                :placeholder="$i18n.toCertificate['身份證號碼']" />
            </van-cell-group>
            <div>
                <van-divider :style="{ color: '#999', borderColor: '#999'}">
                    {{ $i18n.toCertificate['拍攝並上傳您的證件照片'] }}
                </van-divider>
                <div>
                    <van-uploader :after-read="upFront" :before-read="upFrontBefore">
                        <p :class="['upLoadIDCard', frontImg ? '' : 'plus']" :style="'background-image: url('+frontImg+')'">
                            <span v-if="!frontImg">{{ $i18n.toCertificate['身份證正面'] }}</span>
                        </p>
                    </van-uploader>
                    <van-uploader :after-read="upBack" :before-read="upBackBefore">
                        <p :class="['upLoadIDCard', backImg ? '' : 'plus']" :style="'background-image: url('+backImg+')'">
                            <span v-if="!backImg">{{ $i18n.toCertificate['身份證反面'] }}</span>
                        </p>
                    </van-uploader>
                </div>
            </div>
            <div>
                <van-button type="info" @click.prevent="confirm()">{{ setBtnText() }}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'toCertificate',
    props: ['status'],
    data() {
        return {
            frontImg: '',
            backImg: '',
            inputMsg: {
                name: '',
                ID: ''
            },
            images: {
                front: '',
                back: '',
            }
        }
    },
    created (){
        this.getData()
    },
    methods: {
        setBtnText () {
            let { toCertificate } = this.$i18n
            let status = parseInt(this.status)
            return  status === 2  ? toCertificate['重新提交'] :
                    status === 0 ? toCertificate['審核中'] : toCertificate['確定']
        },
        async getData () {
            if (parseInt(this.status) === -1) return false // -1 爲 未實名, 無需獲取數據
            let res = await $ajax('certificationDetail', {})
            // console.log(res)
            let { name, ID, frontImg, backImg } = res
            this.inputMsg.name = name
            this.inputMsg.ID = ID
            this.frontImg = frontImg
            this.backImg = backImg
        },
        // 上傳正面
        upFront (file) {
            // console.log(file)
            this.frontImg = file.content // 設置預覽身份證圖
            this.images.front = file.file // 暫存圖片文件
        },
        // 上傳反面
        upBack (file) {
            // console.log(file)
            this.backImg = file.content // 設置預覽身份證圖
            this.images.back = file.file // 暫存圖片文件
        },
        // 上传前校验, 正面
        upFrontBefore (file) {
            if (file.size > 5242880) {
                Toast( this.$i18n.toCertificate['上傳之圖片大小, 不得大於5M'] )
                return false
            }
            return true
        },
        // 上传前校验, 反面
        upBackBefore (file) {
            if (file.size > 5242880) {
                Toast( this.$i18n.toCertificate['上傳之圖片大小, 不得大於5M'])
                return false
            }
            return true
        },
        // 確認上傳
        async confirm () {
            let { toCertificate } = this.$i18n
            if (parseInt(this.status) === 0) return Toast( toCertificate['審核中, 請耐心等候'] )
            let {front, back} = this.images
            let {name, ID} = this.inputMsg
            if (!name || !ID) return Toast( toCertificate['請填寫您的真實姓名以及證件號碼'] )
            if (ID.length < 15) return Toast( toCertificate['請正確填寫身份證號碼'] )
            if (!front || !back) return Toast( toCertificate['請上傳您的證件照片'] )
            // 上傳 正面 圖片
            let upFront = $ajax('uploader', {
                img: front,
                file: 'img'
            })
            // 上傳 反面 圖片
            let upBack = $ajax('uploader', {
                img: back,
                file: 'img'
            })
            // 並發上傳
            let imgsUrls = await Promise.all([upFront, upBack])
            // 如果圖片上傳失敗, 則終止函數執行
            if (!imgsUrls[0] || !imgsUrls[1]) return false
            // 進行認證
            let res = await $ajax('toCertificate', {
                realname: name,
                card: ID,
                just_url: imgsUrls[0],
                back_url: imgsUrls[1]
            })
            if (!res) return false
            // 進行提示, 並跳轉個人中心
            Dialog.alert({
                message: res.msg
            })
            this.$router.push({
                name: 'center'
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
#toCertificate {
    background-color: #eee;
}
.upLoadIDCard {
    height: 7rem;
    width: 10rem;
    border: 1px solid #ccc;
    margin: 0;
    box-sizing: border-box;
    background-size: 100% 100%;
    > span {
        display: inline-block;
        width: calc(100% - 2px);
        text-align: center;
        position: absolute;
        height: 2rem;
        line-height: 2rem;
        bottom: 1px;
        background-color: #eee;
    }
}
.plus::after {
    content: '+';
    position: absolute;
    font-size: 3rem;
    height: 3rem;
    width: 3rem;
    font-weight: 100;
    text-align: center;
    line-height: 3rem;
    color: #ccc;
    left: calc(50% - 1.5rem);
    top:  calc(50% - 2rem);
}
.main {
    margin-top: 50px;
    > div:first-child {
        background-color: #eee;
        padding: 1rem;
        > div {
            margin-bottom: 10px;
        }
    }
    > div:first-child::after {
        border-width: 0;
    }
    > div:nth-child(2) {
        background-color: #fff;
        padding: 5px 0 2rem 0;
        > div:first-child {
            padding: 0 2rem;
        }
        > div:nth-child(2) {
            .flex;
            justify-content: space-around;
        }
    }
    > div:last-child {
        margin-top: 2rem;
        text-align: center;
        button {
            width: 90%;
        }
    }
}
</style>