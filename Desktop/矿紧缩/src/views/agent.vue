<template>
    <div class="agent">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>代理中心</p>
        </div>
        <!-- 不是代理 -->
        <div v-if="levelType != 2">
            <div class="img" :style="{background: `url(${img})`}">
                <!-- 后台上传设计好的图片 -->
            </div>
            <div class="submit" :class="{on:levelType != 0}" @click="submit">{{levelhtml}}</div>
        </div>
        <!-- 是代理 -->
        <div class="" v-else>
            <div class="top">
                <div class="infos flex ali_center flex_between">
                    <div class="left flex ali_center flex_between">
                        <img class="avatar" :src="avatar" alt="">
                        <div class="">
                            <div class="nickname">矿友{{nickname}}</div>
                            <div class="num">直推人数：{{team}}人</div>
                        </div>
                    </div>
                    <div class="right">
                        <span>{{levelname}}</span>
                        <!-- <img src="" alt=""> -->
                    </div>
                </div>
                <div class="nav flex ali_center flex_between">
                    <div class="item">
                        <div class="num">{{fil}}</div>
                        <div class="type">FIL佣金</div>
                    </div>
                    <div class="item">
                        <div class="num">{{eth}}</div>
                        <div class="type">ETH佣金</div>
                    </div>
                    <div class="item">
                        <div class="num">{{btc}}</div>
                        <div class="type">BTC佣金</div>
                    </div>
                </div>
            </div>
            <div class="teaminfo">
                <div class="infos">
                    <div class="title">团队总人数</div>
                    <div class="num"><span>{{team}}</span>人</div>
                    <div class="title">团队总投资</div>
                </div>
                <div class="nav flex ali_center flex_between">
                    <div class="item">
                        <div class="type">CNY总投资</div>
                        <div class="num">{{cnyinfo}}</div>
                    </div>
                    <div class="item">
                        <div class="type">USDT总投资</div>
                        <div class="num">{{usdtinfo}}</div>
                    </div>
                    <div class="item">
                        <div class="type">BTC总投资</div>
                        <div class="num">{{btcinfo}}</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="title">佣金记录</div>
                <div class="title1 flex flex_between ali_center">
                    <div class="time">时间</div>
                    <div class="uid">用户ID</div>
                    <div class="money">佣金</div>
                </div>
                 <van-list
                    v-model="loading"
                    :finished="finished"
                    :finished-text="'我是有底线的'"
                    @load="userapplylevellogs"
                >
                    <div class="item flex flex_between ali_center" v-for="(item,index) in list" :key="index">
                        <div class="time">{{item.createtime}}</div>
                        <div class="uid">矿友{{item.mobile}}</div>
                        <div class="money">+{{item.money}}</div>
                    </div>
                </van-list>
                
                <!-- <van-pagination
                    v-model="currentPage"
                    :total-items="125"
                    :show-page-size="3"
                    force-ellipses
                /> -->
            </div>
            <div class="touchservice">联系客服</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "agenr",
    data() {
        return {
            img: require("@/assets/images/centerInfoBg.png"),
            agentstatus: 0, 
            levelhtml:"立即申请",
            levelType: "",
            levelname: "",
            btc: "",
            eth: "",
            fil: "",
            team: "",
            list: [],
            page: 1,
            limit: 10,
            finished: false,
            loading: false,
            avatar: "",
            btcinfo: "",
            usdtinfo: "",
            cnyinfo: "",
            nickname: "",
        }
    },
    mounted() {
        this.getData()
        // this.userapplylevellogs()
    },
    methods: {
        async getData(){
            // let type = this.type.toLowerCase()
            let res = await $ajax('userapplylevelinfo', {})
            if(!res) return false
            this.img = res.levellogo
            this.levelType = res.levelType
            if(this.levelType == 0){ //未申请
                this.levelhtml = "立即申请"
            }else if(this.levelType == 1){//申请中
                this.levelhtml = "审核中"
            }else if(this.levelType == 2){//申请成功
                this.levelhtml = "审核成功"
                this.userapplylevelind()
            }else if(this.levelType == -1){ //申请失败
                this.levelhtml = "审核失败"
            }
        },
        async userapplylevelind() {
            let res = await $ajax('userapplylevelind', {})
            if(!res) return false
            this.team = res.team
            this.levelname = res.levelname
            this.btc = res.btc
            this.eth = res.eth
            this.fil = res.fil
            this.avatar = res.avatar
            let {btc, usdt, cny} = res.teamInfo
            this.btcinfo = btc
            this.usdtinfo = usdt
            this.cnyinfo = cny
            this.nickname = res.nickname
        },
        async userapplylevellogs() {
            let res = await $ajax('userapplylevellogs', {page: this.page})
            if(!res) return false
            this.page++
            console.log(res)
            let list = res.list
            this.list.push(...list)
            // // 加载状态结束
            this.loading = false
            if (res.list.length === 0) {
                this.finished = true //加载完成
            } 
        },
        async submit() {
            let res = await $ajax('applylevel', {})
            if(!res) return false
            Toast(res.msg)
        }
    },
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.agent {
    background: #f7f7f7 !important;
    overflow: auto;
    .header {
        width: 100%;
        height: 12vw;
        position: relative;
        background: #fff;
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
    .submit {
        position: fixed;
        width: 92vw;
        bottom: 4vw;
        left: 4vw;
        background: #da428d;
        height: 12vw;
        text-align: center;
        color: #fff;
        line-height: 12vw;
        border-radius: 6vw;
        
    }
    .on{
            background: #999!important;
        }
    .top {
        background: #da428d;
        background-size: 100% 100%;
        padding: 0 4vw 8vw;
        .infos {
            padding: 5vw 0 6vw;
            .left {
                .avatar {
                    width: 12vw;
                    height:12vw;
                    border-radius: 50%;
                    margin-right: 2vw;
                }
                .nickname {
                    color: #fff;
                }
                .num {
                    font-size: 3.2vw;
                    color: #fff;
                    margin-top: 1vw;
                }
            }
            .right {
                background: #fff;
                color: #333;
                font-size: 3.47vw;
                font-weight: 600;
                padding: 0 1vw;
                border-radius: 1vw;
            }
        }
        .nav {
            padding: 2vw 0;
            text-align: center;
            color: #fff;
            .num {
                font-weight: 600;
                font-size: 3vw;
            }
            .type {
                font-size: 3.2vw;
            }
        }
    }
    .teaminfo {
        width: 92vw;
        margin: -6vw 4vw 4vw;
        background: #fff;
        border-radius: 2vw;
        text-align: center;
        .infos {
            .title {
                line-height: 12vw;
                color: #777;
                font-size: 3.73vw;
            }
            .num {
                color: #999;
                font-size: 3.2vw;
                span {
                    color: #333;
                    font-size: 6vw;
                    font-weight: 600;
                }
            }
        }
        .nav {
            padding: 0 4vw 6vw;
            .type {
                color: #999;
                font-size: 3.2vw;
                margin-bottom: 1.5vw;
            }
            .num {
                color: #333;
                font-size: 3.5vw;
            }
        }
    }
    .list {
        padding: 0 4vw 4vw;
        width: 92vw;
        margin: 0 4vw;
        background: #fff;
        border-radius: 2vw;
        .title {
            line-height: 12vw;
            font-size: 4.2vw;
        }
        .title1 {
            height: 12vw;
            color: #999;
            font-size: 3.2vw;
            > div {
                width: 33%;
            }
            .uid {
                text-align: center;
            }
            .money {
                text-align: right;
            }
        }
        .item {
            height: 10vw;
            color: #333;
            font-size: 3.2vw;
            > div {
                width: 33%;
            }
            .uid {
                text-align: center;
            }
            .money {
                text-align: right;
            }
        }
    }
    .touchservice {
        text-align: center;
        line-height: 20vw;
        color: #999;
        font-size: 3.2vw;
    }
}
</style>