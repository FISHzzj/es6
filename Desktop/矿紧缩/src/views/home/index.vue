<template>
    <div class="index">
        <!-- 首页轮播 -->
        <swiper ref="mySwiper" class="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in banner" :key="index">
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 公告 -->
        <div class="notice flex ali_center">
            <img src="@/assets/images/home/laba1.jpg" alt="">
            <swiper ref="notice" class="swiper" :options="noticeSwiper">
                <swiper-slide v-for="(item, index) in bannerTxt" :key="index" >
                    <div style="color:#da428d;">
                        <p class="line" @click="$router.push('/gonggao/'+ item.id )">{{item.title}}</p>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="more"></div>
        </div>
        <!-- 数据 -->
        <section class="wrapper">
            <div class="title flex ali_center">
                <img src="@/assets/images/home/laba2.jpg" alt="">
                <p>矿池运营数据</p>
            </div>
            <div class="item" >
                <div class="title_1 flex ali_center">
                    <p>BTC矿池</p>
                    <van-icon name="warning-o" color="#999" />
                </div>
                <div class="somenum flex ali_center">
                    <div class="item_1">
                        <div class="type">平台总台数</div>
                        <div class="num">{{btc.platformTotal}}</div>
                    </div>
                    <div class="item_1">
                        <div class="type">今日新增</div>
                        <div class="num">{{btc.todayNum}}</div>
                    </div>
                    <div class="item_1">
                        <div class="type">官方算力(T/天)</div>
                        <div class="num">{{btcguangfan}}</div>
                    </div>
                     <div class="item_1">
                        <div class="type">总算力</div>
                        <div class="num">{{btc.tNum}}</div>
                    </div>
                     <div class="item_1">
                        <div class="type">每日产币</div>
                        <div class="num">{{btc.todayCoinage}}</div>
                    </div>
                     <a :href="btc_url" target="_blank" class="item_1">
                        <div class="type">官网</div>
                        <div class="num">btc.com/</div>
                    </a>
                </div>
            </div>
             <div class="item" >
                <div class="title_1 flex ali_center">
                    <p>ETH矿池</p>
                    <van-icon name="warning-o" color="#999" />
                </div>
                <div class="somenum flex ali_center">
                    <div class="item_1">
                        <div class="type">平台总台数</div>
                        <div class="num">{{eth.platformTotal}}</div>
                    </div>
                    <div class="item_1">
                        <div class="type">今日新增</div>
                        <div class="num">{{eth.todayNum}}</div>
                    </div>
                    <div class="item_1">
                        <div class="type">官方算力(M/天)</div>
                        <div class="num">{{ethguangfan}}</div>
                    </div>
                     <div class="item_1">
                        <div class="type">总算力</div>
                        <div class="num">{{eth.tNum}}</div>
                    </div>
                     <div class="item_1">
                        <div class="type">每日产币</div>
                        <div class="num">{{eth.todayCoinage}}</div>
                    </div>
                    <a :href="eth_url" target="_blank" class="item_1">
                        <div class="type">官网</div>
                        <div class="num">eth.tokenview.com/</div>
                    </a>
                </div>
            </div>
             <div class="item" >
                <div class="title_1 flex ali_center">
                    <p>FIL矿池</p>
                    <van-icon name="warning-o" color="#999" />
                </div>
                <div class="somenum flex ali_center">
                    <div class="item_1">
                        <div class="type">平台总算力</div>
                        <div class="num">{{eth.platformTotal}}</div>
                    </div>
                    <div class="item_1">
                        <div class="type">今日新增</div>
                        <div class="num">{{eth.todayNum}}</div>
                    </div>
                    <div class="item_1">
                        <div class="type">全网平均产出(T/天)</div>
                        <div class="num">{{blockRewardIn24h}}</div>
                    </div>
                     <div class="item_1">
                        <div class="type">封存质押</div>
                        <div class="num">{{currentPledgeCollateral*32}}</div>
                    </div>
                     <div class="item_1">
                        <div class="type">新增GAS消耗</div>
                        <!-- <div class="num">{{blockRewardIn24h}}</div> -->
                        <!-- <div class="num">{{currentPledgeCollateral}}</div> -->
                        <div class="num">{{gasIn32GB}} 32GB</div>
                        <div class="num">{{gasIn64GB}} 64GB</div>
                    </div>
                    <a :href="fil_url" target="_blank" class="item_1">
                        <div class="type">官网</div>
                        <div class="num">filfox.info/zh</div>
                    </a>
                </div>
            </div>
        </section>
        <!-- 底部轮播 -->
        <div class="activeCenter">
            <div>活动中心</div>
            <a v-for="(item, index) in footer" :key="index" @click="$router.push('/footerText/'+ item.id )" href="javascript:;"><img :src="item.thumb" alt="" class="img1"></a>
            <!-- <a href="#"><img src="http://193.112.106.104/attachment/images/1/2021/04/XRuPHp92YhC9Q4P9VcEcczPEQh0jtQ.png" alt="" class="img2"></a> -->
            
        </div>
        <div class="bgbottom flex ali_center">
            <img src="@/assets/images/home/laba_bai.png" alt="">
            <div>专业的矿机租赁 算力交易平台</div>
        </div>
        <bottom-nav></bottom-nav>
    </div>
</template>
<script>
import bottomNav from "../common/footernav";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
    name: "index",
    components: {
        bottomNav,
        swiper,
        swiperSlide,
    },
    data() {
        return {
            banner:[],
            bannerTxt: [],
            btc: "",
            eth: "",
            fil: "",
            noticeSwiper: {
                direction: "vertical",
                loop: true,
                speed: 500,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
            },
            swiperOptions: {
                loop: true,
                speed: 2000,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                // 显示分页
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true, //允许分页点击跳转
                },
            },
            btcguangfan: "",
            ethguangfan: "",
            timer: null,
            blockRewardIn24h: "",
            currentPledgeCollateral: "",
            gasIn32GB: "",
            gasIn64GB: "",
            footer: [],
            btc_url: "",
            eth_url: "",
            fil_url: "",
        };
    },
    mounted(){
        this.getlist()
        // console.log(22222)
          this.usercurrenbtchandle()
            this.usercurrenfil()
        this.timer = setInterval(()=>{
            this.usercurrenbtchandle()
            this.usercurrenfil()
        },60000)
        
    },
    methods: {
        async getlist(){
            let res = await $ajax('kuang', {})
            if (!res) return false
            this.banner = res.banner
            this.bannerTxt = res.bannerTxt
            this.btc = res.btc
            this.eth = res.eth
            this.fil = res.fil
            this.footer = res.footer
            this.btc_url = res.btc_url
            this.eth_url = res.eth_url
            this.fil_url = res.fil_url
            
        },
        async usercurrenbtchandle(){
            let res = await $ajax('usercurrenbtc', {})
            if (!res) return false
            // console.log(res)
            this.btcguangfan = res.btc
            this.ethguangfan = res.eth
        },
        async usercurrenfil(){
            let res = await $ajax('usercurrenfil', {})
            if (!res) return false
            this.blockRewardIn24h = res.blockRewardIn24h.toFixed(4)
            this.currentPledgeCollateral = res.currentPledgeCollateral.toFixed(4)
            this.gasIn32GB = res.gasIn32GB.toFixed(4)
            this.gasIn64GB = res.gasIn64GB.toFixed(4)
        }

    },
    destroyed(){
        clearInterval(this.timer)
    }
}
</script>
<style lang="less" scope>
.index {
    .mySwiper {
        .swiper-container {
            background: #ccc;
        }
        .pagination-bullet-active {
            color: #da428d!important;
        }
        .swiper-slide {
            height: 50vw;
            img {
                width:100vw;
                height: 50vw;
            }
        }
    }
    .notice {
        padding: 0 4vw;
        img {
            width: 5.33vw;
            height: 5.33vw;
        }
        .swiper {
            width: 76vw;
            height: 12vw;
            line-height: 12vw;
            font-size: 3.2vw;
            p {
                width: 76vw;
            }
        }
        .more {
            color: #999;
            font-size: 3.2vw;
        }
    }
    .wrapper {
        padding: 0 4vw;
        .title {
            height: 12vw;
            img {
                width: 5.33vw;
                height: 5.33vw;
                margin-right: 2.4vw;
                background: #000;
            }
            p {
                font-size: 4.2vw;
                font-weight: 600;
            }
        }
        .item {
            box-shadow: 2px 2px 2px 1px #e4e0e0;
             border-radius: 5px;
             margin-bottom: 15px;
            .title_1 {
                height: 10vw;
                p {
                    position: relative;
                    text-indent: 2vw;
                    margin-right: 2vw;
                    &::before {
                        position: absolute;
                        content: "";
                        width: 1vw;
                        height: 4vw;
                        top: 0;
                        left: 0;
                        background: #da428d;
                        bottom: 0;
                        margin: auto 0;
                    }
                }
            }
            .somenum {
                height: 28vw;
                flex-wrap: wrap;
                .item_1 {
                    width: 32%;
                    text-align: center;
                    margin-bottom: 10px;
                    .type {
                        color: #666;
                        font-size: 2.47vw;
                    }
                    .num {
                        color: #333;
                        font-size: 2.5vw;
                        font-weight: 600;
                    }
                }
            }
        }
    }
    .activeCenter{
        
        div{
            color: #000;
            // padding: 10px ;
            height: 12vw;
            padding-left: 15px;
            font-size: 20px;
            font-weight: 600;
        }
        a{
            img{
                width: 100vw;
                height: 25vw;
                border-radius: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
            }
        }
    }
    .bgbottom{
        flex-direction: column;
        background: #eee;
        img{
            width: 50px;
            height: 50px;
        }
        div{
            padding: 10px 10px;
            font-size: 12px;
            color: #484646;
        }
    }
}
</style>