<template>
    <div id="income">
        <van-nav-bar
        :title="$i18n.incomeList['收益記錄']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="toggle">
            <van-tabs @click="togglePage">
                <van-tab :title="$i18n.incomeList['個人收益']"></van-tab>
                <van-tab :title="$i18n.incomeList['團隊收益']"></van-tab>
            </van-tabs>
        </div>
        <div id="main">
            <div>
                <p>
                    {{total || 0}} USDT
                </p>
                <p>
                    <span @click="showPopup('start')">{{ time.start }}</span>
                    <span>{{ $i18n.incomeList['至'] }}</span>
                    <span @click="showPopup('end')">{{ time.end }}</span>
                </p>
            </div>
            <div id="listBox">
                <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="$i18n.incomeList['没有更多了']"
                @load="onLoad"
                >
                    <Item v-for="(item, index) in list" :key="index">
                        <p>
                            <!-- <i class="iconfont iconchangyongtubiao-mianxing- green"></i> -->
                            <img style="height:2rem;" src="@/assets/images/icon/left.png" alt="">
                        </p>
                        <p>
                            <span class="showAll">{{ item.orderSn }}</span>
                            <span>{{ item.time }}</span>
                        </p>
                        <p class="green">
                            +{{ item.money }}USDT
                        </p>
                    </Item>
                </van-list>
            </div>
        </div>
        
        <van-popup 
        v-model="show"
        position="bottom">
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
            />
        </van-popup>
    </div>
</template>

<script>
import Item from '@/components/common/item'

export default {
    name: 'income',
    components: {
        Item
    },
    data() {
        return {
            minDate: new Date(1970, 0, 1),
            maxDate: new Date(2050, 0, 1),
            currentDate: new Date(),
            show: false,
            // 開始 時間 和 結束 時間 的保存
            time: {
                start: this.$i18n.incomeList['選擇開始時間'],
                end: this.$i18n.incomeList['選擇結束時間']
            },
            // 要發送給後端的時間
            postTime: {
                start: '',
                end: ''
            },
            total: '',
            currentSelect: 'start', // 當前的點擊, 默認爲開始
            page: 1,
            list: [],
            loading: false,
            finished: false,
            currentPage: 0
        }
    },
    created () {
        
    },
    methods: {
        async getDataByTime () {
            if (this.currentPage === 0) return this.getPersonalData()
            this.getTeamData()
        },
        async onLoad() {
            // console.log(233)
            let {start, end} = this.postTime
            let res = await $ajax('incomeList', {
                page: this.page,
                start,
                end
            })
            this.page++
            // 加载状态结束
            this.loading = false
            if (!res) return false
            if (res.list.length === 0) {
                this.finished = true
                return false
            }
            let {total, list} = res
            if (!this.total) {
                this.total = total
            } else {
                this.total = parseFloat(this.total) + parseFloat(total)
            }
            this.list.push(...list)
        },
        async getPersonalData () {
            let {start, end} = this.postTime
            let res = await $ajax('incomeList', {
                page: 1,
                start,
                end
            })
            if (!res) return false
            let {total, list} = res
            this.total = total
            this.list = list
            this.page = 2 //重置頁面 爲 第二頁
            this.finished = false
        },
        async getTeamData () {
            let {start, end} = this.postTime
            let res = await $ajax('incomeListTeam', {
                page: 1,
                start,
                end
            })
            if (!res) return false
            let {total, list} = res
            this.total = total
            this.list = list
            this.page = 2 //重置頁面 爲 第二頁
            this.finished = false
        },
        async togglePage (index) {
            // console.log(index)
            this.currentPage = index
            if (index === 1) {
                this.getTeamData()
            } else {
                this.getPersonalData()
            }
        },
        // 展開時間選擇器
        showPopup(currentSelect) {
            this.currentSelect = currentSelect
            this.show = true
        },
        confirm (date) {
            var yy = date.getFullYear()     //年
            var mm = date.getMonth() + 1  //月
            var dd = date.getDate() //日
            // 賦值
            this.time[this.currentSelect] = `${yy}-${mm}-${dd}`
            this.postTime[this.currentSelect] = `${yy}-${mm}-${dd}`
            this.show = false
            // 時間字符串
            let {start, end} = this.postTime
            if (!start || !end) return false
            this.getDataByTime()
        },
        cancel () {
            // console.log('取消')
            this.show = false
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#toggle {
    margin-top: calc(50px + 0.5rem);
    margin-bottom: 1rem;
}
#main {
    height: calc(100% - 50px - 0.5rem);
    > div:first-child {
        height: 5rem;
        > p:first-child {
            text-align: center;
            margin: 0 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }
        > p:nth-child(2) {
            .flex;
            margin: 0 1rem;
            margin-top: 1rem;
            font-size: 0.85rem;
            justify-content: space-between;
            > span {
                box-sizing: border-box;
                height: 1rem;
                line-height: 1rem;
            }
            > span:not(:nth-child(2)) {
                width: calc(50% - 1.5rem);
            }
            > span:nth-child(2) {
                width: 3rem;
                text-align: center;
            }
            > span:first-child {
                padding-left: 3rem;
            }
            > span:last-child {
                text-align: right;
                padding-right: 3rem;
            }
        }
    }
    #listBox {
        margin-top: 1rem;
        height: calc(100% - 5rem - 1rem);
    }
}

</style>