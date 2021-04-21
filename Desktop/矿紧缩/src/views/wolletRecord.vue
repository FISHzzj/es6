<template>
    <div class="record">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>钱包记录</p>
        </div>
        <div class="nav flex ali_center">
            <div class="item" @click="changenav(index)" :class="{on:index == status}" v-for="(item, index) in navlist" :key="index">
                {{item}}
            </div>
        </div>
        <div class="list">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="'我是有底线的'"
            @load="logs"
            >
                <router-link  class="item" :to="{path: '/recordDetail/1'}" v-for="(item,index) in list" :key="index" tag="div">
                    <div class="top flex ali_center flex_between">
                        <div class="time">{{item.createtime}}</div>
                        <div class="status">{{item.statusText || item.title}} </div>
                    </div>
                    <div class="bottom flex ali_center">
                        <div class="left">
                            <div class="type">{{item.rechargeText || item.remark}}</div>
                        </div>
                        <div class="right">
                                <div class="num">￥{{item.money}}</div>

                            <!-- <div class="flex item1 flex_between ali_center">
                                <span>用户</span>
                                <p>{{item.realname}}</p>
                            </div>
                            <div class="flex flex_between ali_center">
                                <span>数量</span>
                                <p>{{item.money}}</p>
                            </div> -->
                        </div>
                    </div>
                </router-link >
            </van-list>
            
        </div>
    </div>
</template>
<script>
export default {
    name: "wolletRecord",
    data() {
        return {
            title: '',
            status: 0,
            navlist: ['转入','转出','兑换'],
            typenum: '1',
            accountType: '2',
            list: [],
            page: 1,
            limit: 10,
            finished: false,
            loading: false,

        };
    },
    mounted() {
        
    },
    methods: {
        changenav(index) {
            this.status = index;
            if(index == 0){
                this.typenum = 1
                this.page = 1
                this.list = []
                this.logs()
            }else if(index == 1) {
                this.typenum = 2
                this.page = 1
                this.list = []
                this.logs()
            }else if(index == 2){
                this.typenum = 3
                this.page = 1
                this.list = []
                this.logs()
            }
        },
        async logs() {
            
            let res = await $ajax('userrechargelogs', {getType: this.typenum, page: this.page, accountType: this.accountType})  //充值
            if(!res) return false
            console.log(res)
            // this.money = res.money
           
            this.page++
            console.log(res.list)
            this.list.push(...res.list)
            // // 加载状态结束
            this.loading = false
            if (res.list.length === 0) {
                this.finished = true //加载完成
            } 
        },
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.record {
    background: #f7f7f7 !important;
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
    .nav {
        flex-wrap: nowrap;
        height: 12vw;
        background: #fff;
        .item {
            width: 50%;
            text-align: center;
            color: #666;
            font-size: 4vw;
            &.on {
                position: relative;
                color: #000;
                font-size: 4.2vw;
                &::after {
                    position: absolute;
                    content: "";
                    left: 0;
                    right: 0;
                    bottom: -2vw;
                    margin: 0 auto;
                    width: 8vw;
                    height: 0.75vw;
                    background: #da428d;
                }
            }
        }
    }
    .list {
        padding: 4vw;
        .item {
            background: #fff;
            border-radius: 2vw;
            padding: 0 2vw;
            margin-bottom: 2.4vw;
            .top {
                height: 12vw;
                border-bottom: 1px solid #f7f7f7;
                .time {
                    color: #999;
                    font-size: 3.2vw;
                }
                .status {
                    color: #fc4142;
                    font-size: 3.47vw;
                }
            }
            .bottom {
                padding: 6vw 0;
                .left {
                    width: 60%;
                    .type {
                        font-size: 3.2vw;
                    }
                    .num {
                        font-size: 6vw;
                        font-weight: 600;
                    }
                }
                .right {
                    width: 40%;
                    font-size: 3.2vw;
                    .item1 {
                        margin-bottom: 2vw;
                    }
                    span {
                        color: #666;
                    }
                    p {
                        color: #333;
                    }
                    .num{
                        text-align: end;

                    }
                }
            }
        }
    }
}
</style>