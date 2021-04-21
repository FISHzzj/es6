<template>
    <div id="team">
        <van-nav-bar
        :title="$i18n.team['我的團隊']"
        left-arrow
        fixed
        :border="false"
        @click-left="$router.back(-1)"
        />
        <div id="main">
            <div>
                <p>
                    <span>{{ $i18n.team['等級'] }}: </span>
                    <span>{{ level }}</span>
                </p>
                <p>
                    <span>{{ $i18n.team['個人收益'] }}: </span>
                    <span>{{ personalIncome }}</span>
                </p>
                <p>
                    <span>{{ $i18n.team['團隊收益'] }}: </span>
                    <span>{{ teamIncome }}</span>
                </p>
                <p>
                    <span>{{ $i18n.team['直推人數'] }}: </span>
                    <span>{{ direct }}</span>
                </p>
                <p>
                    <span>{{ $i18n.team['有效直推人數'] }}: </span>
                    <span>{{ efficaciousDirect }}</span>
                </p>
                <p>
                    <span>{{ $i18n.team['團隊人數'] }}: </span>
                    <span>{{ teamPersons }}</span>
                </p>
                <p>
                    <span>{{ $i18n.team['有效團隊人數'] }}: </span>
                    <span>{{ efficaciousTeam }}</span>
                </p>
            </div>
            <div>
                <Table
                    :thead="tableDirect.thead" 
                    :tbody="tableDirect.tbody"
                >
                </Table>
                <div id="page">
                    <van-button 
                    type="primary" size="small" 
                    loading-type="spinner"
                    @click="prev()" :loading="prevLoad">
                        {{ $i18n.team['上一頁'] }}
                    </van-button>
                    <van-button 
                    type="info" size="small" 
                    loading-type="spinner"
                    @click="next()" :loading="nextLoad">
                        {{ $i18n.team['下一頁'] }}
                    </van-button>
                </div>
            </div>
        </div>
        <!-- <van-tabs 
        id="main"
        v-model="active"
        title-active-color="#f00900"
        color="#f00900"
        line-width="50%"
        line-height="1px">
            <van-tab title="團隊信息">
                <Table
                    :thead="tableTeam.thead" 
                    :tbody="tableTeam.tbody"
                >
                </Table>
            </van-tab>
            <van-tab title="直推列表">
                <Table
                    :thead="tableDirect.thead" 
                    :tbody="tableDirect.tbody"
                >
                </Table>
            </van-tab>
        </van-tabs> -->
    </div>
</template>

<script>
import Table from '@/components/common/table.vue'

export default {
    name: 'team',
    components: {
        Table
    },
    data() {
        return {
            active: 0,
            prevLoad: false,
            nextLoad: false,
            // 信息
            level: '',
            personalIncome: '',
            teamIncome: '',
            direct: '',
            efficaciousDirect: '',
            teamPersons: '',
            efficaciousTeam: '',
            // 直推
            directPage: 1,
            tableDirect: {
                thead: [
                    this.$i18n.team['真實姓名'],
                    this.$i18n.team['手機號碼'],
                    this.$i18n.team['級別'],
                    this.$i18n.team['會員狀態'],
                ],
                tbody: []
            },
        }
    },
    created () {
        this.getData()
        this.getDirectList()
    },
    methods: {
        async getData () {
            let res = await $ajax('team', {
                op: 'team'
            })
            if (!res) return false
            // console.log(res)
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
        },
        // 獲取 直推列表
        async getDirectList () {
            let res = await $ajax('teamDirect', {
                page: this.directPage
            })
            if (!res) return false
            if (res.length === 0) {
                this.directPage--
                Toast( this.$i18n.team['沒有更多了'] )
            }
            // console.log(res)
            this.tableDirect.tbody = res
        },
        // 上一頁
        prev () {
            // console.log('上一頁')
            if(this.directPage > 1 ){
                this.directPage--
            }
            
            // console.log(this.directPage)
            if (this.directPage <= 1) {
                // console.log(this.directPage)
                Toast( this.$i18n.team['已在首頁'] )
                this.getDirectList()
                return false
            }
            this.getDirectList()
        },
        next () {
            
            // console.log('下一頁')
            this.directPage++
            // console.log(this.directPage)
            this.getDirectList()
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#main {
    margin-top: 50px;
    > div:first-child {
        padding: 0 1rem;
        > p {
            .flex;
            align-items: flex-end;
            justify-content: space-between;
            margin: 0;
            padding: 5px 10px;
            > span:last-child {
                color: #999;
                font-size: 0.9rem;
                width: 50%;
            }
        }
        > p:nth-of-type(odd) {
            background-color: #f1f1f1;;
        }
    }
}
#page {
    .flex;
    margin-top: 1rem;
    padding-bottom: 2rem;
    justify-content: space-around;
}
</style>