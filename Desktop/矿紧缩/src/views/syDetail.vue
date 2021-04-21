<template>
    <div class="record">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>收益明细</p>
        </div>
        <div class="top flex ali_center">
            <div class="left">
                <div class="type">{{yue}}月份总收益(元)</div>
                <div class="num">≈{{yueMoney}}</div>
            </div>
            <div class="right">
                <div class="type">订单总收益(元)</div>
                <div class="num">≈{{sysmoney}}</div>
            </div>
        </div>
       <van-cell title="选择日期" :value="dateval" @click="show = true" />
        <!-- <van-tabs >
            <van-tab  > -->
        <div class="list">
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="'我是有底线的'"
                @load="getlist"
                >
                <div class="item" v-for="(item, index) in list" :key="index">
                    <div class="top flex ali_center flex_between">
                        <div class="left">预计净收益</div>
                        <div class="right">≈{{item.money}}{{item.unit}}</div>
                    </div>
                    <div class="bottom top flex ali_center flex_between">
                        <div class="left">{{item.createtime}}</div>
                        <div class="right">≈{{item.cny}}CNY</div>
                    </div>
                </div>
            </van-list>
        </div>
            <!-- </van-tab>
        </van-tabs> -->
         
        <van-datetime-picker
            class="vantan"
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :formatter="formatter"
            v-if="show"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="handlecomfirm"
            @cancel="quxiao"
        />
    </div>
</template>
<script>
export default {
    name: "syDetail",
    data() {
        return {
            currentDate: new Date(),
            show: false,
            active: 0,
            nav: [
                {title: "一月份"},
                {title: "二月份"},
                {title: "三月份"},
                {title: "四月份"},
                {title: "五月份"},
                {title: "六月份"},
                {title: "七月份"},
                {title: "八月份"},
            ],
            list: [],
            page: 1,
            limit: 10,
            finished: false,
            loading: false,
            nian: '2021',
            yue: '4',
            dateval:"",
            minDate: new Date(1977, 0, 1),
            maxDate: new Date(2088, 10, 1),
            rates: '',
            yueMoney: '',
            sysmoney: '',
            
        };
    },
    mounted() {
        // this.getlist()
        this.currenhulv('ETH', 'CNY')
        this.dateval = this.nian + '/' + this.yue;
    },
    methods: {
        async currenhulv(current, value){
            let res = await $ajax('usercurrenhulv', {
               current,
               value
            })
            if (!res) return false
            console.log(res)
            this.rates = res.result
            console.log(this.rates)
        },
        formatter(type, val) {
            // console.log(type)
            // console.log(val)
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        quxiao(){
            this.show = false;
        },
        handlecomfirm(date) {
            console.log(date)

            this.nian = date.getFullYear()
            this.yue = date.getMonth() + 1
            this.show = false;
            console.log(this.nian)
            console.log(this.yue)
            this.dateval = this.nian + '/' + this.yue;
            // console.log(this.date)
            this.list = []
            this.page = 1
            this.getlist()

        },
        async getlist(){
            let {id} = this.$route.query
            if(!this.nian || !this.yue) return Toast('请选择时间')
            let res = await $ajax('kuangorderbiOrder', {
                orderid: id,
                nian: this.nian,
                yue: this.yue,
                page:this.page
            })
            if (!res) return false
            // this.list = res.list
            this.yueMoney = res.yueMoney
            this.sysmoney = res.sysmoney
            this.page++
            console.log(res.list)
            this.list.push(...res.list)
            // // 加载状态结束
            this.loading = false
            if (res.list.length === 0) {
                this.finished = true //加载完成
            } 
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.vantan{
    position: absolute;
    bottom: 0;
    width: 100%;
}
.record {
    .header {
        width: 100%;
        height: 12vw;
        background: #fff;
        position: relative;
        .van-icon {
            position: absolute;
            top: 0;
            left: 3vw;
            bottom: 0;
            height: 4vw;
            margin: auto 0;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    > .top {
        width: 92vw;
        margin: 0 4vw;
        background: rgba(0,0,255,0.05);
        padding: 3vw 0;
        border-radius: 3vw;
        .left,
        .right {
            width: 50%;
            padding: 0 0 0 4vw;
            .type {
                color: #999;
                font-size: 3.2vw;
                margin-bottom: 2vw;
            }
            .num {
                font-weight: 600;
                font-size: 3vw;
            }
        }
    }
    .list {
        padding: 4vw;
        .item {
            border-bottom: 1px solid #f7f7f7;
            .top {
                height: 8vw;
                .left {
                    font-weight: 600;
                }
                .right {
                    color: #000;
                }
            }
            .bottom {
                height: 8vw;
                font-size: 3.2vw;
                .left,
                .right {
                    color: #999;
                }
            }
        }
    }
}
</style>