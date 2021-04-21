<template>
    <div id="feedback">
        <van-nav-bar
        :title="$i18n.feedback['問題反饋']"
        left-arrow
        fixed
        :right-text="$i18n.feedback['反饋歷史']"
        @click-left="$router.back(-1)"
        @click-right="$router.push({name:'feedbackList'})"
        />
        <div class="main">
            <div>{{ $i18n.feedback['反饋類型'] }}</div>
            <div @click="showSheet = true">
                {{ feedbackType || $i18n.feedback['請選擇提交類型'] }}
                <i class="iconfont iconsanx-up"></i>
            </div>
            <div>{{ $i18n.feedback['問題和建議'] }}</div>
            <div class="vant">
                <van-field
                    v-model="message"
                    type="textarea"
                    :placeholder="$i18n.feedback['請詳細描述你的問題或意見'] + '.......'"
                    rows="5"
                    autosize
                />
            </div>
            <div>{{ $i18n.feedback['圖片(提供問題截圖, 總大小 10M 以下)'] }}</div>
            <div>
                <van-uploader
                v-model="fileList"
                :max-count="3"
                :before-read="beforeRead" />
            </div>
            <!-- <div>
                facebook/wechat/QQ/郵箱
            </div>
            <div class="vant">
                <van-field v-model="contact" placeholder="请输入聯繫方式" />
            </div> -->
            <div>
                <van-button type="info" @click.prevent="send()">{{ $i18n.feedback['發送'] }}</van-button>
            </div>
        </div>
        <!-- 選項卡 -->
        <van-action-sheet
        v-model="showSheet"
        :actions="actions"
        @select="onSelect"
        />
    </div>
</template>

<script>
export default {
    name: 'feedback',
    data() {
        return {
            showSheet: false, //選顯卡控制器
            // contact: '', //聯繫方式
            message: '', //問題描述
            fileList: [],
            actions: [], //反饋類型, 數據後端那
            feedbackType: '', // 顯示選擇的反饋類型
            sendClick: true, // 用於控制只能提交一次
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('feedback', {})
            if (!res) return false
            this.actions = res
        },
        // 選項卡, 選中
        onSelect(item) {
            this.feedbackType = item.name // 顯示用戶選擇的 反饋 類型
            // 点击选项时默认不会关闭菜单，可以手动关闭
            this.showSheet = false;
        },
        // 上傳圖片
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
            if (!this.sendClick) {
                Dialog.alert({
                    message: feedback['已反饋意見, 請勿重複提交']
                })
                return false
            }
            let {fileList, feedbackType, message} = this
            if (!feedbackType) return Toast( feedback['請選擇反饋的類型'] )
            if (!message) return Toast( feedback['請詳細填寫你的問題或意見'] + '...')
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
            // 遍歷 查看 imgeUrls 是否 存在 上傳失敗的
            let hasErr = imgUrls.some( item => {
                if (!item) return true
            })
            // 如果 存在 上傳失敗的, 則 終止函數執行
            if (hasErr) return false
            let res = await $ajax('sendFeedback',{
                title: feedbackType,
                content: message,
                thumb: imgUrls
            })
            if (!res) return false
            this.sendClick = false //設置爲 false, 不可重複提交
            Dialog.alert({
                message: res.msg
            })
            this.$router.back(-1)
        },
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#feedback {
    background-color: #f0eff5;
}
.main {
    margin-top: 50px;
    > div {
        min-height: 2.5rem;
    }
    > div:not(.vant) {
        padding: 0 1rem;
    }
    > div:nth-of-type(even) {
        background-color: #fff;
    }
    > div:nth-of-type(odd) {
        font-size: 0.9rem;
        color: #999;
        line-height: 2.5rem;
    }
    > div:nth-child(2) {
        height: 2.5rem;
        .flex;
        justify-content: space-between;
        align-items: center;
    }
    > div:nth-child(6) {
        padding: 1rem;
    }
    > div:last-child {
        margin-top: 2rem;
        button {
            width: 100%;
        }
    }
}
</style>