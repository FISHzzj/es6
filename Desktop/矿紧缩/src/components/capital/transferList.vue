<template>
    <div id="transferList">
        <van-nav-bar
        :title="$i18n.transferList['轉賬記錄']"
        left-arrow
        :border="false"
        fixed
        @click-left="$router.back(-1)"
        />
        <van-tabs 
        id="main"
        v-model="active"
        title-active-color="#f00900"
        color="#f00900"
        line-width="50%"
        line-height="1px"
        @change="togglePage()">
            <van-tab :title="$i18n.transferList['USDT轉出']">
                <Table
                    :thead="tableOut.thead" 
                    :tbody="tableOut.tbody"
                    thWidth='calc(1/3*100%)'
                >
                </Table>
            </van-tab>
            <van-tab :title="$i18n.transferList['USDT轉入']">
                <Table
                    :thead="tableIn.thead" 
                    :tbody="tableIn.tbody"
                    thWidth='calc(1/3*100%)'
                >
                </Table>
            </van-tab>
        </van-tabs>
        <div id="page">
            <van-button 
            type="primary" size="small" 
            loading-type="spinner"
            @click="prev()" :loading="prevLoad">
                {{ $i18n.transferList['上一頁'] }}
            </van-button>
            <van-button 
            type="info" size="small" 
            loading-type="spinner"
            @click="next()" :loading="nextLoad">
                {{ $i18n.transferList['下一頁'] }}
            </van-button>
        </div>
    </div>
</template>

<script>
import Table from '@/components/common/table.vue'

export default {
    name: 'transferList',
    components: {
        Table
    },
    data() {
        return {
            active: 0,
            nextLoad: false,
            prevLoad: false,
            page: 1,
            selectCurrent: 'Out', //當前選擇, 默認爲 轉出 的數據
            tableOut: {
                thead: [
                    this.$i18n.transferList['日期'],
                    this.$i18n.transferList['接收用戶'],
                    this.$i18n.transferList['轉出數量'],
                ],
                tbody: []
            },
            tableIn: {
                thead: [
                    this.$i18n.transferList['日期'],
                    this.$i18n.transferList['轉賬用戶'],
                    this.$i18n.transferList['實到數量'],
                ],
                tbody: [
                    [],
                ]
            },
        }
    },
    mounted (data) {
        this.getData()
    },
    methods: {
        // 獲取 數據
        async getData (callback) {
            let res = await $ajax(`transfer${this.selectCurrent}`,{
                page: this.page
            })
            callback && callback() // 如果存在回調, 則執行
            if (!res) return false
            // console.log(res)
            if (res.length === 0) {
                this.page !== 1 && this.page-- //頁面不是首頁, 如果返回數據爲 0, page 重置爲上一頁
                Toast({
                    message: this.$i18n.transferList['沒有更多數據'],
                    duration: 300
                })
                return false
            }
            this[`table${this.selectCurrent}`].tbody.push(...res) // 將新數據添加進去
        },
        togglePage () {
            this[`table${this.selectCurrent}`].tbody.length = 0 // 清空上一個 table 的數據
            this.active === 1 ? this.selectCurrent = 'In' : this.selectCurrent = 'Out'
            this.page = 1
            this.getData()
        },
        prev () {
            // console.log('上一頁')
            if (this.page === 1) {
                Toast({message: this.$i18n.transferList['已經是第一頁了'], duration:500})
                this.prevLoad = false
                return false
            }
            return false
            this.prevLoad = true
            this.page--
            this.getData(() => {
                this.prevLoad = false //獲取數據後, 將加載中的效果去掉
            })
        },
        next () {
            // console.log('下一頁')
            this.nextLoad = true
            this.page++
            this.getData(() => {
                this.nextLoad = false //獲取數據後, 將加載中的效果去掉
            })
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: -webkit-flex;
    display: flex;
}
#main {
    margin-top: calc(50px);
}
#page {
    .flex;
    margin-top: 1rem;
    justify-content: space-around;
}
</style>